import { Router } from 'express';
import { createTransaction, getReservedSeats  } from '../controllers/transaction.controller.js';
const router = Router();


// Ruta para crear una transaccion de compra de una pelicula
router.post('/', createTransaction);
router.get('/reservedSeats', getReservedSeats);

export default router;