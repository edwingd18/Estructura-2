import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CreateMovie from './ModalCrearPelicula/CreateMovie';
import { HiOutlineTrash, HiPencil } from "react-icons/hi";
import EditMovie from './ModalEditarPelicula/EditMovie';

const URI = 'http://localhost:8000/api/movies/';

const MovieList = ({ movies, handleMovieClick }) => {
  return (
    <div className='text-white ml-32 mr-10'>

      <h1 className=' mt-5 mb-5 text-4xl'>Películas</h1>
      <input className='w-5/12 h-[55px] rounded-2xl' type="text" placeholder="Filtro" />
      <div className='inline-block  ml-7'>
      <CreateMovie />
      <EditMovie/>

      </div>
      <div className='grid grid-cols-4 gap-4 mt-5'>
        {movies.map((movie, index) => (
          <div key={index} className='mb-4 group relative'>
            <Link to={`/movie/${movie._id}`} onClick={() => handleMovieClick(index)}>
              <img
                src={movie.imageUrl}
                alt={movie.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/100x150?text=No+Image';
                }}
                style={{ borderRadius: '10px' }}
                className="movie-image shadow-md opacity-100 group-hover:opacity-50 transition-opacity duration-300 ease-linear"
              />
              <div className='absolute flex flex-col top-72 left-52 items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <button className='btn-editar bg-blue-600 text-white w-14 h-14 rounded-md hover:bg-blue-700
                mb-2'>
                  <HiPencil className='w-10 h-5 mx-auto' />
                </button>
                <button className='btn-eliminar bg-red-600 text-white w-14 h-14 rounded-md hover:bg-red-700 '>
                  <HiOutlineTrash className='w-5 h-5 mx-auto' />
                </button>
              </div>
            </Link>
            <p className='text-xl font-semiboldbold mt-3'>{movie.title}</p>
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
    console.log('Clic en la película:', movies[index].title);
  };

  return <MovieList movies={movies} handleMovieClick={handleMovieClick} />;
};

export default MovieListContainer;