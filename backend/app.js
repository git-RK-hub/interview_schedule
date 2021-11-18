const path = require('path');
const express = require('express');
const morgan = require('morgan');
const cors = require('cors');

// eslint-disable-next-line no-unused-vars
const dotenv = require('dotenv').config();

const AppError = require('./utils/appError');
const globalErrorHandler = require('./controllers/errorController');
const userRouter = require('./routes/user');
const scheduleRouter = require('./routes/schedule');

// eslint-disable-next-line no-unused-vars
const db = require('./dbconnect');

// Start express app
const app = express();

// Implement CORS
app.use(cors());

// Development logging
if (process.env.NODE_ENV === 'development') {
  app.use(morgan('dev'));
}

// Body parser, reading data from body into req.body
app.use(express.json({ limit: '10kb' }));
app.use(express.urlencoded({ extended: true, limit: '10kb' }));

app.use('/api/users', userRouter);
app.use('/api/schedules', scheduleRouter);

app.get('/api', (req, res) => {
  res.status(200).json({ message: 'Api working' });
});

const port = process.env.PORT || 3000;

app.all('*', (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server!`, 404));
});

app.use(globalErrorHandler);

app.listen(port, () => {
  console.log(`Listening on port: ${port}`);
});
