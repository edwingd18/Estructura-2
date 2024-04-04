import { Router } from "express";
import { showUsers, showUser, createUser, loginUser } from '../controllers/user.controller.js'
import { verifyToken } from '../middleware/token.JWT.js'

const router = Router();

// Ruta para mostrar todos los usuarios
router.get('/', showUsers);

// Ruta para mostrar un solo usuario
router.get('/:email', verifyToken, showUser);

// Ruta para registrar un usuario
router.post('/', createUser);

// Ruta para iniciar sesion de un usuario
router.post('/login', loginUser);

export default router;
