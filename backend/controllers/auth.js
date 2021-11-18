const AppError = require('./../utils/appError');

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes('admin')) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }
    next();
  };
};
