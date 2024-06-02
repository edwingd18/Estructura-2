import { Router } from "express";
import { showUsers, showUser, createUser, loginUser, loginUserGoogle } from '../controllers/user.controller.js'
import multer from 'multer';

const upload = multer();
const router = Router();

// Ruta para mostrar todos los usuarios
router.get('/', showUsers);

// Ruta para mostrar un solo usuario
router.get('/:email', showUser);

// Ruta para registrar un usuario NO CAMBIAR EDWIN POR FAVOR CREASTE LAS COSAS QUE YO YA HABIA CREADO
router.post('/', createUser);

// Ruta para iniciar sesion de un usuario
router.post('/login', loginUser);

// Ruta para iniciar sesion de un usuario con google
router.post('/google-login', loginUserGoogle);

export default router;