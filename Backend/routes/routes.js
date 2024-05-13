// Importa los controladores necesarios
import { getAllMovies, createMovie } from "../controllers/MovieController.js";

// Importa express y crea un router
import express from "express";
const router = express.Router();

// Define las rutas
router.get('/allMovies', getAllMovies);
router.post('/crearPeli', createMovie); // Ruta para crear una película

// Exporta el router
export default router;
