let categoryModel = require("../models/categorys");
let { UserFacingError, DataBaseError } = require("../modules/errorHandler");

function findAllCategorys() {
  return new Promise((resolve, reject) => {
    categoryModel
      .find()
      .then((allcategorys) => {
        resolve(allcategorys);
      })
      .catch(() => {
        reject(new DataBaseError("no category found"));
      });
  });
}

function findCategoryById(catId) {
  return new Promise((resolve, reject) => {
    categoryModel
      .findOne({ _id: catId })
      .then((category) => {
        resolve(category);
      })
      .catch(() => {
        reject(new DataBaseError("wrong cat ID"));
      });
  });
}

function findParents() {
  return new Promise((resolve, reject) => {
    categoryModel
      .find({ parent: null })
      .then((parentCategorys) => {
        resolve(parentCategorys);
      })
      .catch(() => {
        reject(new DataBaseError("no parent finded"));
      });
  });
}

function findChildsByID(parentID) {
  return new Promise((resolve, reject) => {
    categoryModel
      .find({ parent: parentID })
      .then((childs) => {
        resolve(childs);
      })
      .catch(() => {
        reject(new DataBaseError("no child finded"));
      });
  });
}

//create categorys
function CreateCategory({ name, parentID = "" }) {
  return new Promise((resolve, reject) => {
    if (parentID != "") {
      findCategoryById(parentID)
        .then((parent) => {
          categoryModel({ name, parent: parent._id })
            .save()
            .then(() => {
              resolve();
            })
            .catch(() => {
              reject(new DataBaseError("child category not created"));
            });
        })
        .catch(() => {
          reject(new DataBaseError("parent not found"));
        });
    } else {
      categoryModel({ name })
        .save()
        .then(() => {
          resolve();
        })
        .catch(() => {
          reject(new DataBaseError("wrong entry"));
        });
    }
  });
}

module.exports = {
  findAllCategorys,
  findCategoryById,
  CreateCategory,
  findParents,
  findChildsByID,
};
