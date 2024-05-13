import MovieModel from "../models/MovieModel.js";

// Mostrar todas las películas
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

// Crear una nueva película
export const createMovie = async (req, res) => {
  try {
    const {
      title,
      description,
      director,
      duration,
      ageRange,
      bannerUrl,
      imageUrl,
    } = req.body;

    const newMovie = new MovieModel({
      title,
      description,
      director,
      duration,
      ageRange,
      bannerUrl,
      imageUrl,
    });

    await newMovie.save();
    res.status(200).json({ message: 'Película creada correctamente' });
  } catch (error) {
    console.error('Error al crear la película:', error);
    res.status(500).json({ error: 'Error al crear la película' });
  }
};

// Eliminar una película
export const deleteMovie = async (req, res) => {
  try {
    const { id } = req.params;

    const movie = await MovieModel.findByIdAndDelete(id);
    if (!movie) {
      return res.status(404).json({ message: "Película no encontrada." });
    }

    res.status(200).json({ message: "Película eliminada correctamente." });
  } catch (error) {
    console.error('Error al eliminar la película:', error);
    res.status(500).json({ error: 'Error al eliminar la película' });
  }
};