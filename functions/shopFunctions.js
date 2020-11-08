const products = require("../models/products");
const redisModule = require("../modules/redis");

function addtoCard(userID, productID) {
  return new Promise((resolve, reject) => {
    redisModule
      .getHash(userID)
      .then((productList) => {
        if (productList) {
          let tempArray = JSON.parse(productList.products);
          if (tempArray.some((product) => product["productID"] === productID)) {
            tempArray[
              tempArray.findIndex(
                (product) => product["productID"] === productID
              )
            ].count++;
            redisModule.setHash(userID, "products", tempArray);
            resolve();
          } else {
            let newProduct = { productID: productID, count: 1 };
            tempArray.push(newProduct);
            redisModule.setHash(userID, "products", tempArray);
            resolve();
          }
        } else {
          let tempArray = [];
          let newProduct = { productID: productID, count: 1 };
          tempArray.push(newProduct);
          redisModule.setHash(userID, "products", tempArray);
          resolve();
        }
      })
      .catch((err) => {
        console.log("here");
        reject(err);
      });
  });
}

function removeFromCard(userID, productID) {
  return new Promise((resolve, reject) => {
    redisModule
      .getHash(userID)
      .then((productList) => {
        let tempArray = JSON.parse(productList.products);
        let index = tempArray.findIndex(
          (product) => product["productID"] === productID
        );
        if (index > -1) {
          if (tempArray[index].count > 1) {
            tempArray[index].count--;
            redisModule.setHash(userID, "products", tempArray);
            resolve();
          } else {
            tempArray.splice(index, 1);
            redisModule.setHash(userID, "products", tempArray);
            resolve();
          }
        } else {
          console.log("wrong index");
        }
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function getCard(userID) {
  return new Promise((resolve, reject) => {
    redisModule
      .getHash(userID)
      .then((object) => {
        resolve(JSON.parse(object.products));
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = { addtoCard, removeFromCard, getCard };
