var createError = require("http-errors");
var express = require("express");
var path = require("path");
var cookieParser = require("cookie-parser");
var logger = require("morgan");
const mongoose = require("mongoose");
const handleErrors = require("./modules/errorHandler").handleErrors;
var app = express();

//redis setup
const redis = require("redis");
const client = redis.createClient();
client.on("connect", function () {
  console.log("redis is now connected");
});

//hard code test

mongoose
  .connect("mongodb://localhost:27017/shop", {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .catch((err) => console.log(err));

// view engine setup
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "jade");

app.use(logger("dev"));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));

//routes
let routes = require("./routes");
app.use("/", routes);

//passport define
let passport = require("passport");
let JWTStrategy = require("./modules/passportJWT").jwtStrategy;
passport.use(JWTStrategy);

// catch 404 and forward to error handler
// app.use(function (req, res, next) {
//   next(createError(404));
// });

app.use(handleErrors);

module.exports = app;
