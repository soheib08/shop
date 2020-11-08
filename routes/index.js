var express = require("express");
var router = express.Router();
let passport = require("passport");
let jwtStrategy = require("../modules/passportJWT");

//define routes
let userRouter = require("./users");
let authRouter = require("./auth");
let categoryRouter = require("./category");
let productRouter = require("./product");
let shopRouter = require("./shop");
//using routes
router.use("/auth", authRouter);
router.use("/category", categoryRouter);
router.use(
  "/user",
  passport.authenticate("jwt", { session: false }),
  userRouter
);
router.use("/product", productRouter);
router.use(
  "/shop",
  passport.authenticate("jwt", { session: false }),
  shopRouter
);

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "shop" });
});

module.exports = router;
