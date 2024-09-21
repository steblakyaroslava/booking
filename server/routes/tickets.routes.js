const express = require("express");

const ticketsController = require("../controllers/tickets.controllers");
const router = express.Router();

router.get("/tickets", ticketsController.getTickets);

router.post("/ticket", ticketsController.createTicket);

router.get("/ticket/:id", ticketsController.getOneTicket);

router.put("/ticket/:id", ticketsController.updateTicket);

router.delete("/ticket/:id", ticketsController.deleteTicket);

module.exports = router;
