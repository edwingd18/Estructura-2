import Transaction from '../models/TransactionModel.js'

export async function createTransaction(req, res) {
    try {
        const { emailUser, movieName, date, ticketType, ticketQuantity, selectedSeats, foodDetails, boletas, total } = req.body;

        const newTransaction = new Transaction({ emailUser, movieName, date, ticketType, ticketQuantity, selectedSeats, foodDetails, boletas, total });

        await newTransaction.save();

        res.status(201).json({ message: "Transaction created successfully" });

    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}

export async function getReservedSeats(req, res) {
    try {
        const transactions = await Transaction.find();
        const reservedSeats = transactions.flatMap(transaction => transaction.selectedSeats);
        res.status(200).json(reservedSeats);
    } catch (error) {
        console.log(error);
        res.status(500).json({ message: "Internal server error" });
    }
}