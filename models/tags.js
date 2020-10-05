let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//define model schema
let TagSchema = new Schema(
  {
    name: { type: String, required: true },
  },
  { timestamps: true }
);

//Export model
module.exports = mongoose.model("Tag", TagSchema);
