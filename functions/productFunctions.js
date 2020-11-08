let productModel = require("../models/products");
let { UserFacingError, DataBaseError } = require("../modules/errorHandler");

function createProduct(name, catID, features, price, description, quantity) {
  return new Promise((resolve, reject) => {
    productModel({
      name,
      category: catID,
      features,
      price,
      description,
      quantity,
    })
      .save()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}
function getProductbyCatID(catID) {
  return new Promise((resolve, reject) => {
    productModel
      .find({ category: catID })
      .then((products) => {
        resolve(products);
      })
      .catch(() => {
        reject(new DataBaseError("no product finded"));
      });
  });
}
module.exports = {
  createProduct,
  getProductbyCatID,
};
