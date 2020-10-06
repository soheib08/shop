var express = require("express");
var router = express.Router();

//define routes
let userRouter = require("./users");
let authRouter = require("./auth");
let passport = require("passport");
let jwtStrategy = require("../modules/passportJWT");

//using routes
router.use("/auth", authRouter);
router.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  userRouter
);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "shop" });
});

module.exports = router;
