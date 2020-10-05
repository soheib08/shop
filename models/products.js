let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//define model schema
let ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    features: [{ featureName: String }],
    prices: [{ price: String }],
    tags: [{ tagId: Schema.Types.ObjectId, ref: "Tag" }],
    commnets: [
      { text: String, date: Date, userId: Schema.Types.ObjectId, ref: "User" },
    ],
    images: [{ imageId: Schema.Types.ObjectId, ref: "Image" }],
    createDate: { type: Date },
    description: { type: String },
    like: { type: Number },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    quantity: { type: Number },
  },
  { timestamps: true }
);

//Export model
module.exports = mongoose.model("Product", ProductSchema);
