import { getAllMovies, createMovie, deleteMovie, updateMovie,getMovieById} from "../controllers/MovieController.js";
import express from "express";

const router = express.Router();

router.get('/allMovies', getAllMovies);
router.post('/crearPeli', createMovie); 
router.delete('/:id', deleteMovie);
router.put('/movies/:id', updateMovie);
router.get('/movies/:id', getMovieById);


export default router;
