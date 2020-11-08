const profileFuncs = require("../functions/profileFunctions");

function updateUserProfile(req, res, next) {
  let { name, family, mail, address } = req.body;
  profileFuncs
    .updateProfie(name, family, mail, address)
    .then(() => res.send({ status: true, msg: "profile is updated" }))
    .catch((err) => {
      next(err);
    });
}

module.exports = { updateUserProfile };
