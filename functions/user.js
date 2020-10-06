let UserModel = require("../models/users");
let jwtGenerator = require("../modules/jwtGenerator");

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
function CreateJWT(mobile) {
  return new Promise((resolve, reject) => {
    UserFindByMobile(mobile)
      .then((user) => {
        const userBody = { _id: user._id, mail: user.mail };
        let token = jwtGenerator.createJWT(userBody);
        resolve(token);
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
  CreateJWT,
};
