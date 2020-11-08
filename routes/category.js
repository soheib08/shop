var express = require("express");
var router = express.Router();
const categoryController = require("../controllers/categoryController");

router.get("/", function (req, res, next) {
  categoryController.getAllCategorys(req, res, next);
});

router.post("/add", function (req, res, next) {
  categoryController.addCategory(req, res, next);
});

router.get("/get-parents", function (req, res, next) {
  categoryController.getParentCategorys(req, res, next);
});

router.post("/get-sub", function (req, res, next) {
  categoryController.getChildsOfParentCategory(req, res, next);
});

module.exports = router;
