let passport = require("passport");
const JWTstrategy = require("passport-jwt").Strategy;
const ExtractJWT = require("passport-jwt").ExtractJwt;
const jwtSecretKey = "top_secret";

//JWTstrategy

let jwtStrategy = new JWTstrategy(
  {
    //secret we used to sign our JWT
    secretOrKey: jwtSecretKey,
    //we expect the user to send the token as a query parameter with the name 'secret_token'
    jwtFromRequest: ExtractJWT.fromHeader("authorization"),
  },
  (token, done) => {
    try {
      //Pass the user details to the next middleware
      return done(null, token.user);
    } catch (error) {
      done(error);
    }
  }
);

module.exports = {
  jwtStrategy,
};
