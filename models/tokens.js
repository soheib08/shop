let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//define model schema
let TokenSchema = new Schema(
  {
    token: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },
  },
  { timestamps: true }
);

//Export model
module.exports = mongoose.model("Token", TokenSchema);
