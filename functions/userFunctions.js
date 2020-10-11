let UserModel = require("../models/users");
let TokenModel = require("../models/tokens");
let jwtGenerator = require("../modules/jwtGenerator");
let { UserFacingError, DataBaseError } = require("../modules/errorHandler");

//user functions
function UserFindByMobile(userPhoneNumber) {
  let promise = new Promise((resolve, reject) => {
    UserModel.findOne({ phoneNumber: userPhoneNumber })
      .then((user) => {
        resolve(user);
      })
      .catch((err) => {
        reject(new UserFacingError("user not found"));
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
        reject(new UserFacingError("user not create"));
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
          })
          .catch((err) => {
            reject(new UserFacingError("can not save otp"));
          });
      } else {
        CreateUser({ userPhoneNumber: mobile, otp })
          .then(() => {
            resolve();
          })
          .catch((err) => {
            reject(new UserFacingError("user not created"));
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
          reject(new UserFacingError("otp is not valid"));
        }
      })
      .catch((err) => {
        reject(new UserFacingError("phone number is not correct"));
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
        reject(new UserFacingError("token not saved in db"));
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
            reject(new UserFacingError("token not saved in db"));
          });
      })
      .catch((err) => {
        reject(new UserFacingError("user not found"));
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
