const factorModel = require("../models/factor");

function createFactor(user, products, address) {
  return new Promise((resolve, reject) => {
    console.log(products);
    factorModel({ user, products, address })
      .save()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = { createFactor };
