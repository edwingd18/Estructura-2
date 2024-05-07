import { Router } from 'express';
import createPreference from '../controllers/payment.controller.js'

const routes = Router();

routes.post('/create_preference', createPreference)

export default routes;