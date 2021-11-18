const mongoose = require('mongoose');

const scheduleSchema = new mongoose.Schema({
  interviewer: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Schedule must belong to a interviewer!']
  },
  interviewee: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
    required: [true, 'Schedule must belong to a interviewee!']
  },
  startAt: {
    type: Date,
    required: [true, 'Please specify the interview starting time']
  },
  endAt: {
    type: Date,
    required: [true, 'Please specify the interview ending time']
  }
});

const Schedule = mongoose.model('Schedule', scheduleSchema);

module.exports = Schedule;
