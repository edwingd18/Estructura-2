import { Router } from "express";
import mercadopago from 'mercadopago';
import { createOrder } from '../controllers/payment.controller.js'

// Configura tus credenciales de Mercado Pago
mercadopago.configure({
    access_token: 'TU_ACCESS_TOKEN'
});

const router = Router()

router.post('/create-order', createOrder);

router.get('/success', (req, res) => {
    // Aquí puedes manejar la respuesta de éxito de Mercado Pago
})

export default router;