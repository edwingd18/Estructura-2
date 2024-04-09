import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CreateMovie from './ModalCrearPelicula/CreateMovie';
import {HiUser} from "react-icons/hi";

const URI = 'http://localhost:8000/api/movies/';

const MovieList = ({ movies, handleMovieClick }) => {
  return (
    <div className='text-white ml-52'>
      <h2>Películas</h2>
      <input type="text" placeholder="Filtro" />
      <CreateMovie />
      <div className='grid grid-cols-4 gap-4'> {/* Cambio aquí */}
        {movies.map((movie, index) => (
          <div key={index} className='mb-4'> 
            <Link to={`/movie/${movie._id}`} onClick={() => handleMovieClick(index)}>
              <img
                src={movie.imageUrl}
                alt={movie.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/100x150?text=No+Image';
                }}
                style={{ borderRadius: '10px' }}
                className="movie-image shadow-md hover:brightness-50  duration-300 ease-linear"
              />
            </Link>
            <p>{movie.title}</p>
            <button className='bg-white text-black'>Eliminar</button>
            <button>Editar</button>
          </div>
        ))}
      </div>
    </div>
  );
};

MovieList.propTypes = {
  movies: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      imageUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleMovieClick: PropTypes.func.isRequired,
};

const MovieListContainer = () => {
  const [movies, setMovies] = useState([]);

  const fetchItems = async () => {
    try {
      const response = await axios.get(URI);
      setMovies(response.data);
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  const handleMovieClick = (index) => {
    // Lógica para manejar el clic en una película
    console.log('Clic en la película:', movies[index].title);
  };

  return <MovieList movies={movies} handleMovieClick={handleMovieClick} />;
};

export default MovieListContainer;