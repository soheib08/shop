var express = require("express");
var router = express.Router();
const shopController = require("../controllers/shopController");

router.post("/add", function (req, res, next) {
  shopController.addProductToCard(req, res, next);
});

router.get("/get", function (req, res, next) {
  shopController.getCard(req, res, next);
});

router.post("/delete", function (req, res, next) {
  shopController.removeProductFromCard(req, res, next);
});

router.post("/factor", function (req, res, next) {
  shopController.createFactor(req, res, next);
});

module.exports = router;
