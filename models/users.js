let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//define model schema
let UserSchema = new Schema(
  {
    name: { type: String },
    family: { type: String },
    mail: { type: String },
    otp: { type: Number },
    phoneNumber: { type: String, required: true },
    addresses: [
      {
        description: String,
        plaque: String,
        postalCode: String,
      },
    ],
    wishList: [
      {
        productId: { type: Schema.Types.ObjectId, ref: "Product" },
      },
    ],
  },
  { timestamps: true }
);

// UserSchema.virtual("url").get(function () {
//   return "/user/" + this._id;
// });

//Export model
module.exports = mongoose.model("User", UserSchema);
