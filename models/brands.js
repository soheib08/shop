let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//define model schema
let BrandSchema = new Schema(
  {
    name: { type: String, required: true },
    products: [{ type: Schema.Types.ObjectId, ref: "Product" }],
    description: { type: String },
    address: { type: String },
  },
  { timestamps: true }
);

//Export model
module.exports = mongoose.model("Brand", BrandSchema);
