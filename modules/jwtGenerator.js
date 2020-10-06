const JWT = require("jsonwebtoken");
const jwtSecretKey = "top_secret";

function createJWT(userBody) {
  let token = JWT.sign({ user: userBody }, jwtSecretKey);
  return token;
}

module.exports = {
  createJWT,
};
