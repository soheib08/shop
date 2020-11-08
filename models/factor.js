let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//define model schema
let FactorSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        productID: { type: Schema.Types.ObjectId, ref: "Product" },
        count: { type: Number },
      },
    ],
    address: {
      description: String,
      plaque: String,
      postalCode: String,
    },

    status: { type: Number, default: 0 }, // type of status = 0- dar hale pardazesh 1- sodor factor 2- ersal
    IssuedDate: { type: Date, default: Date.now() },
  },
  { timestamps: true }
);

//Export model
module.exports = mongoose.model("Factor", FactorSchema);
