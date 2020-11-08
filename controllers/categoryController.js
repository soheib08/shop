const categoryFunctions = require("../functions/categoryFunctions");
let categoryFuncs = require("../functions/categoryFunctions");

function addCategory(req, res, next) {
  let { name, parentID } = req.body;
  categoryFuncs
    .CreateCategory({ name, parentID })
    .then(() => {
      res.send({ status: true });
    })
    .catch((err) => {
      next(err);
    });
}

function getAllCategorys(req, res, next) {
  categoryFuncs
    .findAllCategorys()
    .then((all) => {
      res.send(all);
    })
    .catch((err) => {
      next(err);
    });
}

function getParentCategorys(req, res, next) {
  categoryFunctions
    .findParents()
    .then((parents) => {
      res.send(parents);
    })
    .catch((err) => {
      next(err);
    });
}

function getChildsOfParentCategory(req, res, next) {
  let { parentID } = req.body;
  categoryFuncs
    .findChildsByID(parentID)
    .then((childs) => {
      res.send(childs);
    })
    .catch((err) => {
      next(err);
    });
}

module.exports = {
  getAllCategorys,
  addCategory,
  getParentCategorys,
  getChildsOfParentCategory,
};
