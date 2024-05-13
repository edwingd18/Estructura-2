import { getAllMovies, createMovie, deleteMovie } from "../controllers/MovieController.js";
import express from "express";

const router = express.Router();

router.get('/allMovies', getAllMovies);
router.post('/crearPeli', createMovie); 
router.delete('/:id', deleteMovie);

export default router;
