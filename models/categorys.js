let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//define model schema
let CategorySchema = new Schema(
  {
    name: { type: String, required: true },
    parent: { type: Schema.Types.ObjectId, ref: "Category" },
    child: [{ type: Schema.Types.ObjectId, ref: "Category" }],
    description: { type: String },
  },
  { timestamps: true }
);

//Export model
module.exports = mongoose.model("Category", CategorySchema);
