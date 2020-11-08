const productFuncs = require("../functions/productFunctions");

function addProduct(req, res, next) {
  let { name, catID, features, price, description, quantity } = req.body;
  productFuncs
    .createProduct(name, catID, features, price, description, quantity)
    .then(() => {
      res.send({ status: true });
    })
    .catch((err) => {
      next(err);
    });
}

function getProductsByCatID(req, res, next) {
  let { catID } = req.body;
  productFuncs
    .getProductbyCatID(catID)
    .then((products) => {
      res.send(products);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = { addProduct, getProductsByCatID };
