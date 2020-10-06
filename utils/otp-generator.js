var rn = require("random-number");

function generate() {
  let otp;
  var options = {
    min: 14236,
    max: 99999,
    integer: true,
  };
  otp = rn(options); // example outputs → -187, 636
  return otp;
}

module.exports = generate;
