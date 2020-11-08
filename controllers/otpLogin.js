const userFuncs = require("../functions/userFunctions");
let otpGenerator = require("../utils/otp-generator");
let SMS = require("../utils/send-sms");
const { UserFacingError } = require("../modules/errorHandler");

function SendOTP(req, res, next) {
  const { mobile } = req.body;
  let otp = otpGenerator();
  userFuncs
    .InsertOTP({ mobile, otp })
    .then(() => {
      SMS.sms_otp({ mobile, otp })
        .then(() => {
          res.send({ status: true });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
}

function VerifyOTPandCreateToken(req, res, next) {
  const { mobile, otp } = req.body;
  userFuncs
    .CheckOTP({ mobile, otp })
    .then(() => {
      userFuncs
        .SetToken(mobile)
        .then((token) => {
          res.send({ token });
        })
        .catch((err) => {
          next(err);
        });
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { SendOTP, VerifyOTPandCreateToken };
