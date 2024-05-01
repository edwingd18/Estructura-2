import express from "express"
import { getAllMovies } from "../controllers/MovieController.js";
import { getAllCombos } from "../controllers/ComboController.js";

const router = express.Router()

router.get('/allMovies', getAllMovies)
router.get('/combos',getAllCombos)

export default router