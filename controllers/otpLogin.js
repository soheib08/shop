const userFuncs = require("../functions/user");
let otpGenerator = require("../utils/otp-generator");
let SMS = require("../utils/send-sms");

function SendOTP(req, res) {
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
          res.send({ status: false });
        });
    })
    .catch((err) => {
      res.send({ status: false });
    });
}

function VerifyOTPandCreateToken(req, res) {
  const { mobile, otp } = req.body;
  userFuncs
    .CheckOTP({ mobile, otp })
    .then(() => {
      userFuncs
        .CreateJWT(mobile)
        .then((token) => {
          res.send({ token: token });
        })
        .catch((err) => {
          res.send({ msg: err });
        });
    })
    .catch((err) => {
      res.send({ msg: err });
    });
}

module.exports = { SendOTP, VerifyOTPandCreateToken };
