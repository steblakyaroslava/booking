const mongoose = require("mongoose");

const TicketSchema = new mongoose.Schema({
  date: { type: Date, required: true },
  time: { type: String, required: true },
  fromplace: { type: String, required: true },
  to: { type: String, required: true },
  stops: [{ type: String }],
  price: { type: Number, required: true },
});

const Ticket = mongoose.model("Ticket", TicketSchema);

module.exports = Ticket;
