const shopFuncs = require("../functions/shopFunctions");
const factorFuns = require("../functions/factorFunctions");

function addProductToCard(req, res, next) {
  let user = req.user._id;
  let { productID } = req.body;
  shopFuncs
    .addtoCard(user, productID)
    .then(() => res.send({ status: true, msg: "product added" }))
    .catch((err) => {
      next(err);
    });
}

function getCard(req, res, next) {
  let user = req.user._id;
  shopFuncs
    .getCard(user)
    .then((data) => {
      res.send(data);
    })
    .catch((err) => {
      next(err);
    });
}
function removeProductFromCard(req, res, next) {
  let user = req.user._id;
  let { productID } = req.body;
  shopFuncs
    .removeFromCard(user, productID)
    .then(() => {
      res.send({ status: true, msg: "item deleted" });
    })
    .catch((err) => {
      next(err);
    });
}

function createFactor(req, res, next) {
  let user = req.user._id;
  let { products, address } = req.body;
  factorFuns
    .createFactor(user, products, address)
    .then(() => {
      res.send({ status: true, msg: "factor created", factorStatus: 0 });
    })
    .catch((err) => {
      console.log(err);
      next(err);
    });
}

module.exports = {
  addProductToCard,
  getCard,
  removeProductFromCard,
  createFactor,
};
