var express = require("express");
var router = express.Router();
const OTPcontroller = require("../controllers/otpLogin");

router.post("/send-otp", function (req, res, next) {
  OTPcontroller.SendOTP(req, res, next);
});

router.post("/verify-otp", function (req, res, next) {
  OTPcontroller.VerifyOTPandCreateToken(req, res, next);
});

module.exports = router;
