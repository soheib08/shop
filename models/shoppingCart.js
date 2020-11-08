let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//define model schema
let ShoppingCartSchema = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
      {
        productID: { type: Schema.Types.ObjectId, ref: "Product" },
        count: { type: Number },
      },
    ],
  },
  { timestamps: true }
);

//Export model
module.exports = mongoose.model("ShoppingCart", ShoppingCartSchema);
