var express = require("express");
var router = express.Router();
const userController = require("../controllers/userController");

router.post("/update", function (req, res, next) {
  //console.log(req.body);
  userController.updateUserProfile(req, res, next);
});

module.exports = router;
