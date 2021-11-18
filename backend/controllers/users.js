const User = require('../models/user');
const catchAsync = require('./../utils/catchAsync');
const AppError = require('./../utils/appError');

exports.deleteOne = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.params.id, { active: false });

  res.status(204).json({
    status: 'success',
    data: null
  });
});

exports.createOne = catchAsync(async (req, res, next) => {
  const { name, email, role } = req.body;
  const user = await User.create({
    name,
    email,
    role
  });
  res.status(201).json({
    status: 'success',
    user
  });
});

exports.getOne = catchAsync(async (req, res, next) => {
  let user = User.findById(req.params.id);
  // if (popOptions) query = query.populate(popOptions);
  user = await user;

  if (!user) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    user
  });
});

exports.getAll = catchAsync(async (req, res, next) => {
  const users = await User.find({});

  if (!users) {
    return next(new AppError('Failed to find the results', 404));
  }

  res.status(200).json({
    status: 'success',
    results: users.length,
    users
  });
});

exports.updateOne = catchAsync(async (req, res, next) => {
  const { name, email, role } = req.body;
  const user = await User.findByIdAndUpdate(
    req.params.id,
    { name, email, role },
    {
      new: true,
      runValidators: true
    }
  );

  if (!user) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    user
  });
});
