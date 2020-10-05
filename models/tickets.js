let mongoose = require("mongoose");
let Schema = mongoose.Schema;

//define model schema
let TicketSchema = new Schema(
  {
    title: { type: String, required: true },
    user: { type: Schema.Types.ObjectId, ref: "User" },

    messages: [
      {
        text: String,
        date: { type: Date, default: Date.now() },
        sender: { type: Number }, // 0: user  1: admin
      },
    ],
    status: { type: Number, default: 0 }, // 0: not verified  1: verified
  },
  { timestamps: true }
);

//Export model
module.exports = mongoose.model("Ticket", TicketSchema);
