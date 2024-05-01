import mongoose from "mongoose";

const ticketSchema = new mongoose.Schema({
    movieId: { type: String, required: true },
    movieTitle: { type: String, required: true },
    date: { type: String, required: true },
    ticketQuantity: { type: Number, required: true },
    ticketType: { type: String, required: true },
    seatNumber: { type: String, required: true },
    userId: { type: String, required: true },
})

const Tickets = mongoose.model('Tickets', ticketSchema);

export default Tickets;