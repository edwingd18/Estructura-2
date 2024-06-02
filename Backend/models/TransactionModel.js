import mongoose from "mongoose";

const transactionSchema = new mongoose.Schema({
    emailUser: { type: String, required: true },
    movieName: { type: String, required: true },
    date: { type: Date, required: true },
    ticketType: { type: String, required: true },
    ticketQuantity: { type: Number, required: true },
    selectedSeats: { type: [String], required: true },
    foodDetails: { type: [String], required: true },
    boletas: { type: String, required: true },
    total: { type: Number, required: true },
});

const Transaction = mongoose.model('Transaction', transactionSchema);

export default Transaction;