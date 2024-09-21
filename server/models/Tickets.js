const mongoose = require('mongoose');

const TicketSchema = new mongoose.Schema({
    date: {type: Date, required: true, },
    time: {type: TimeRanges, required: true },
    from: {type: String, required: true},
    to: {type: String, required: true},
    stops: [{type: String,  required: true}],
    price: {type: Number, required: true},
    userId: {type: mongoose.SchemaTypes.ObjectId, ref: 'User'}
})

const Ticket = mongoose.model('Ticket', TicketSchema)

module.export = Ticket;