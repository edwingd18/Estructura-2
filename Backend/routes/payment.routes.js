import { Router } from "express";
import { createOrder } from '../controllers/payment.controller.js'

const router = Router()

router.post('/create-order', createOrder);

router.get('/success', (req, res) => {
    // Aquí puedes manejar la respuesta de éxito de Mercado Pago
})

export default router;