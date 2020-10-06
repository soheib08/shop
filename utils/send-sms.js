var Kavenegar = require("kavenegar");
var api = Kavenegar.KavenegarApi({
  apikey:
    "4E7831427556745A3133366A75594E4F6E4F61315A71525853304A614B737657587343417935677A6644733D",
});

function sms_otp({ mobile, otp }) {
  return new Promise((resolve, reject) => {
    api.VerifyLookup(
      {
        token: otp,
        template: "otp",
        receptor: mobile,
      },
      function (response, status) {
        console.log(response);
        console.log(status);
        if (status == 200) {
          resolve();
        } else {
          reject(status);
        }
      }
    );
  });
}

module.exports = { sms_otp };
