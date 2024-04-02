import express from "express"
import { getAllMovies } from "../controllers/MovieController.js";

const router = express.Router()

router.get('/', getAllMovies)

export default router