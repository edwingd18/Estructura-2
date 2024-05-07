import { Router } from 'express';
import { createPreference, showInfo } from '../controllers/payment.controller.js'

const routes = Router();

routes.get('/', showInfo)
routes.post('/create_preference', createPreference)

export default routes;