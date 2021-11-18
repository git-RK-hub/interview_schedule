const Schedule = require('../models/schedule');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.checkAvailabilty = catchAsync(async (req, res, next) => {
  const { start, end, interviewer, interviewee } = req.body;

  // check for valid dates
  if (new Date(start) < Date.now())
    return res.status(200).json({
      status: 'fail',
      message: "Start Time can't be less than current time"
    });

  if (new Date(end) < Date.now())
    return res.status(200).json({
      status: 'fail',
      message: "End Time can't be less than current time"
    });

  if (new Date(end) <= new Date(start))
    return res.status(200).json({
      status: 'fail',
      message: "End Time can't be less than or equal to start time"
    });

  // find booked schedule of interviewer

  const interviewerSchedules = await Schedule.find({
    interviewer: interviewer,
    endAt: { $gte: start },
    startAt: { $lte: end }
  });

  // find booked schedule of interviewee
  const intervieweeSchedules = await Schedule.find({
    interviewee: interviewee,
    endAt: { $gte: start },
    startAt: { $lte: end }
  });

  // if updating
  const schedules = await Schedule.find({
    interviewee: interviewee,
    interviewer: interviewer,
    endAt: { $gte: start },
    startAt: { $lte: end }
  });

  if (interviewerSchedules.length - schedules.length > 0) {
    return res.status(200).json({
      status: 'fail',
      message: 'Looks like interviewer is busy at that time, find another slot'
    });
  }

  if (intervieweeSchedules.length - schedules.length > 0) {
    return res.status(200).json({
      status: 'fail',
      message:
        'Interviewee is already have a interview scheduled at that time, find another slot'
    });
  }

  next();
});

exports.getAll = catchAsync(async (req, res, next) => {
  const schedules = await Schedule.find({
    startAt: { $gte: Date.now() }
  }).sort({ startAt: -1 });
  if (!schedules) return next(new AppError('Failed to find the results', 400));
  res.status(200).json({
    status: 'success',
    results: schedules.length,
    schedules
  });
});

exports.createOne = catchAsync(async (req, res, next) => {
  const { start, end, interviewer, interviewee } = req.body;

  const schedule = await Schedule.create({
    interviewer: interviewer,
    interviewee: interviewee,
    startAt: start,
    endAt: end
  });

  if (!schedule)
    return next(new AppError('Failed to create interview schedule', 400));

  res.status(201).json({
    status: 'success',
    schedule
  });
});

exports.deleteOne = catchAsync(async (req, res, next) => {
  await Schedule.findByIdAndDelete(req.params.id);

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  const schedule = await Schedule.findById(req.params.id).populate({
    path: 'interviewer interviewee',
    select: 'name email role'
  });

  if (!schedule) {
    return next(new AppError('No document found with that ID', 400));
  }

  res.status(200).json({
    status: 'success',
    schedule
  });
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const { start, end, interviewer, interviewee } = req.body;
  const schedule = await Schedule.findByIdAndUpdate(
    req.params.id,
    {
      startAt: start,
      endAt: end,
      interviewer: interviewer,
      interviewee: interviewee
    },
    {
      new: true,
      runValidators: true
    }
  );

  if (!schedule) {
    return next(new AppError('No document found with that ID', 400));
  }

  res.status(200).json({
    status: 'success',
    schedule
  });
});
