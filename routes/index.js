var express = require("express");
var router = express.Router();
const { UserFacingError } = require("../modules/errorHandler");

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

router.post("/post", async (req, res, next) => {
  const { title, author } = req.body;

  try {
    if (!title || !author) {
      throw new UserFacingError("Missing required fields: title or author");
    }
  } catch (err) {
    console.log(err);
    next(err);
  }
});

module.exports = router;
