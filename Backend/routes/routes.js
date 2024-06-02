import { getAllMovies, createMovie, deleteMovie, updateMovie,getMovieById} from "../controllers/MovieController.js";
import { getAllCombos, createCombo, deleteCombo, updateCombo, getComboById} from "../controllers/ComboController.js";
import express from "express";

const router = express.Router();
router.get('/allCombos',getAllCombos)
router.post('/crearCombo', createCombo); 
router.delete('/combo/:id',deleteCombo);
router.put('/combos/:id', updateCombo);
router.get('/combos/:id', getComboById);
router.get('/allMovies', getAllMovies);
router.post('/crearPeli', createMovie); 
router.delete('/:id', deleteMovie);
router.put('/movies/:id', updateMovie);
router.get('/movies/:id', getMovieById);


export default router;
