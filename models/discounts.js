let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//define model schema
let DiscountSchema = new Schema(
  {
    name: { type: String, required: true },
    value: { type: String },
    type: { type: Number, default: 0 }, // type of discount = darsadi or poli
    beginDate: { type: Date, default: Date.now() },
    expireDate: { type: Date },
  },
  { timestamps: true }
);

//Export model
module.exports = mongoose.model("Discount", DiscountSchema);
