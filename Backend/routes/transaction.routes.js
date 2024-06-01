import { Router } from 'express';
import { createTransaction } from '../controllers/transaction.controller.js';
const router = Router();

// Ruta para crear una transaccion de compra de una pelicula
router.post('/', createTransaction);

export default router;