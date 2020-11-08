let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//define model schema
let ProductSchema = new Schema(
  {
    name: { type: String, required: true },
    category: { type: Schema.Types.ObjectId, ref: "Category" },
    features: { type: Array, default: [] },
    prices: [{ price: String }],
    tags: [{ tagId: { type: Schema.Types.ObjectId, ref: "Tag" } }],
    commnets: [
      {
        text: String,
        date: Date,
        userId: { type: Schema.Types.ObjectId, ref: "User" },
      },
    ],
    images: [{ imageId: { type: Schema.Types.ObjectId, ref: "Image" } }],
    description: { type: String },
    like: { type: Number },
    brand: { type: Schema.Types.ObjectId, ref: "Brand" },
    quantity: { type: Number },
  },
  { timestamps: true }
);

//Export model
module.exports = mongoose.model("Product", ProductSchema);
