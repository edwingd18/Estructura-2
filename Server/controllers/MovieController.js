import MovieModel from "../models/MovieModel.js";

//Mostrar todas las peliculas

export const getAllMovies = async (req, res) => {

    try{
        const movies = await MovieModel. find()
        res.status(200).json(movies)
    }
    catch(error){
        res.json({message: error.message})

    }
}

