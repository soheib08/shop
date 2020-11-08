const userModel = require("../models/users");

function updateProfie(userID, name, family, mail, address) {
  return new Promise((resolve, reject) => {
    userModel
      .findOne(userID)
      .then((user) => {
        user.name = name;
        user.family = family;
        user.mail = mail;
        user.address = address;
        user
          .save()
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject(err);
          });
      })
      .catch((err) => {
        reject(err);
      });
  });
}

module.exports = { updateProfie };
