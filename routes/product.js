var express = require("express");
var router = express.Router();
const productController = require("../controllers/productController");

router.post("/add", function (req, res, next) {
  //console.log(req.body);
  productController.addProduct(req, res, next);
});

router.get("/getbycatid", function (req, res, next) {
  //console.log(req.body);
  productController.getProductsByCatID(req, res, next);
});

module.exports = router;
