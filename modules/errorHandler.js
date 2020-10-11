class GeneralError extends Error {
  constructor(message) {
    super();
    this.message = message;
  }
  getCode() {
    if (this instanceof UserFacingError) {
      return 400;
    }
    if (this instanceof NotFound) {
      return 404;
    }
    if (this instanceof OTPError) {
      return 401;
    }
    return 500;
  }
}
class UserFacingError extends GeneralError {}
class NotFound extends GeneralError {}
class DataBaseError extends GeneralError {}
class OTPError extends GeneralError {}

const handleErrors = (err, req, res, next) => {
  if (err instanceof GeneralError) {
    return res.status(err.getCode()).json({
      status: "error",
      message: err.message,
    });
  }

  return res.status(500).json({
    status: "error",
    message: err.message,
  });
};
module.exports = {
  GeneralError,
  UserFacingError,
  NotFound,
  DataBaseError,
  OTPError,
  handleErrors,
};
