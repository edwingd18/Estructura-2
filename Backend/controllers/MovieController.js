import MovieModel from "../models/MovieModel.js";

// Mostrar todas las peliculas
export const getAllMovies = async (req, res) => {
    try {
        const movies = await MovieModel.find().sort({ title: 1 });
        if (!movies) {
            return res.status(404).json({ message: "No se encontraron películas." });
        }
        res.status(200).json(movies);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: error.message });
    }
};