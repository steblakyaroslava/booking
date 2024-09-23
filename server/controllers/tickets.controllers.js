const mongoose = require("mongoose");
const { format } = require("date-fns");
const User = require("../models/User");
const Ticket = require("../models/Ticket");

createTicket = async (req, res) => {
  try {
    let { date, time, fromplace, to, stops, price } = req.body;
    const ticket = await new Ticket({
      date: new Date(date),
      time,
      fromplace,
      to,
      stops,
      price,
    });
    await ticket.save();

    return res.status(201).json({ message: "Created", ticket });
  } catch (error) {
    console.error("Error creating ticket:", error);
    return res.status(500).json({ message: "Failed to create ticket" });
  }
};

getTickets = async (req, res) => {
  try {
    const tickets = await Ticket.find();
    return res.status(200).json(tickets);
  } catch (error) {
    return res.status(500).json({ message: "Something wrong" });
  }
};

getOneTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Not found" });
    }
    return res.status(200).json(ticket);
  } catch (error) {
    return res.status(500).json({ message: "Something wrong" });
  }
};

updateTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;
    const { date, time, from, to, stops, price } = req.body;
    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Not found" });
    }

    const updatedTicket = await Ticket.updateOne(
      { _id: ticketId },
      { date, time, from, to, stops, price }
    );

    return res.status(201).json({ mesasge: "Updated", updatedTicket });
  } catch (error) {
    console.log("Error: " + error);
    return res.status(500).json({ message: "Something wrong" });
  }
};

deleteTicket = async (req, res) => {
  try {
    const ticketId = req.params.id;

    const ticket = await Ticket.findById(ticketId);

    if (!ticket) {
      return res.status(404).json({ message: "Not found" });
    }

    await Ticket.deleteOne({ _id: ticketId });

    return res.status(200).json({ message: "Deleted" });
  } catch (error) {
    return res.status(500).json({ message: "Something wrong" });
  }
};

module.exports = {
  getTickets,
  getOneTicket,
  createTicket,
  updateTicket,
  deleteTicket,
};
