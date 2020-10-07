let UserModel = require("../models/users");
let TokenModel = require("../models/tokens");
let jwtGenerator = require("../modules/jwtGenerator");

//user functions
function UserFindByMobile(userPhoneNumber) {
  let promise = new Promise((resolve, reject) => {
    UserModel.findOne({ phoneNumber: userPhoneNumber })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
}
function CreateUser({ userPhoneNumber, otp }) {
  let promise = new Promise((resolve, reject) => {
    UserModel({ phoneNumber: userPhoneNumber, otp })
      .save()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
  return promise;
}

//otp token functions
function InsertOTP({ mobile, otp }) {
  return new Promise((resolve, reject) => {
    UserFindByMobile(mobile).then((user) => {
      if (user) {
        user.otp = otp;
        user
          .save()
          .then(() => {
            resolve();
            // console.log("otp inserted");
          })
          .catch((err) => {
            reject("has error");

            // console.log(err);
          });
      } else {
        CreateUser({ userPhoneNumber: mobile, otp })
          .then(() => {
            resolve();
            // console.log("user crated and otp inserted");
          })
          .catch((err) => {
            reject("has error");
            // console.log(err);
          });
      }
    });
  });
}
function CheckOTP({ mobile, otp }) {
  return new Promise((resolve, reject) => {
    UserFindByMobile(mobile)
      .then((user) => {
        if (user.otp == otp) {
          resolve();
        } else {
          reject("otp is not valid");
        }
      })
      .catch((err) => {
        reject("user not found");
      });
  });
}

//jwt token functions
function AddToken(token, userId) {
  return new Promise((resolve, reject) => {
    TokenModel({ user: userId, token: token })
      .save()
      .then(() => {
        resolve();
      })
      .catch((err) => {
        reject(err);
      });
  });
}

function SetToken(mobile) {
  return new Promise((resolve, reject) => {
    UserFindByMobile(mobile)
      .then((user) => {
        const userBody = { id: user._id, phoneNumber: mobile };
        let token = jwtGenerator.createJWT(userBody);
        AddToken(token, user._id)
          .then(() => {
            resolve(token);
          })
          .catch((err) => {
            reject("error with add token to token table");
          });
      })
      .catch((err) => {
        reject("error with finding user ");
      });
  });
}

module.exports = {
  UserFindByMobile,
  CreateUser,
  InsertOTP,
  CheckOTP,
  SetToken,
};
