import React, { useState, useEffect } from "react";
import axios from 'axios';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { Button } from "flowbite-react";
import { HiShoppingCart } from "react-icons/hi";
import "./MovieInfo.css";

const URI = 'http://localhost:8000/api/movies/';

function MovieInfo() {
  const [movies, setMovies] = useState([]);

  useEffect(() => {
    fetchMovies();
  }, []);

  const fetchMovies = async () => {
    try {
      const response = await axios.get(URI);
      if (response.data) {
        setMovies(response.data);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  if (movies.length === 0) {
    return <div>Loading...</div>; // Manejar el caso mientras se cargan las películas
  }

  return (
    <div>
      {movies.map(movie => (
        <div className="movie-info" key={movie._id}>
          <div>
            <img src={movie.imageUrl} alt="Imagen" className="movie-poster" />
            <div className="trailer">
              <iframe
                width="1600"
                height="800"
                src={movie.trailerUrl}
                title="Trailer"
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            </div>
          </div>
          <div className="movie">
            <h1 className="movie-title ">{movie.title}</h1>
            <p className="description">{movie.description}</p>
            <div className="info">
              <p className="edadRango">
                Recomendada para Mayores de {movie.ageRange} años
              </p>
              <p className="duration">{movie.duration} Min</p>
            </div>
            <p className="director">Director: {movie.director}</p>
            <p className="type">Tipo: {movie.type.join(", ")}</p>

            <div className="format">
              <div className="movie-format">{movie.format.join(", ")}</div>
            </div>
            <div>
              <Link to='/selecttickets'>
                <Button className="bg-black border border-whiter buttonComprar">
                  <HiShoppingCart className="mr-2 h-5 w-5" />
                  Adquiere tus entradas
                </Button>
              </Link>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

MovieInfo.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MovieInfo;
