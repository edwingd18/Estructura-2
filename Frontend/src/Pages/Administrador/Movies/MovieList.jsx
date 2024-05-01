import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CreateMovie from './ModalCrearPelicula/CreateMovie';
import EditMovie from './ModalEditarPelicula/EditMovie';
import DeleteMovie from './ModalElimarPelicula/DeleteMovie'

const URI = 'http://localhost:8000/api/allMovies';

const MovieList = ({ movies, handleMovieClick }) => {



  const handleLinkClick = (e, index) => {
    e.preventDefault(); // Evita la navegación por defecto
    handleMovieClick(index); // Maneja el clic en el enlace
  };

  return (
    <div className='text-white ml-32 mr-10'>
      <h1 className=' mt-5 mb-5 text-4xl'>Películas</h1>
      <input className='w-[740px] h-14 rounded-md' type="text" placeholder="Filtro" />
      <div className='inline-block ml-5'>
        <CreateMovie />
        
      </div>
      <div className='grid grid-cols-4 gap-4 mt-5'>
        {movies.map((movie, index) => (
          <div key={index} className='mb-4 group relative'>
            <Link
              to={`/movie/${movie._id}`}
              onClick={(e) => handleLinkClick(e, index)}
            >
              <img
                src={movie.imageUrl}
                alt={movie.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/100x150?text=No+Image';
                }}
               
                className="movie-image shadow-md opacity-100 rounded-md group-hover:opacity-50 transition-opacity duration-300 ease-linear"
              />
              <div className='absolute flex flex-col top-[390px] left-[280px] items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
              <div className='mb-2'>
              <EditMovie />
              </div>
              <DeleteMovie/>
                
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
    // Aquí puedes agregar la lógica para navegar a la página de detalles de la película
  };

  return <MovieList movies={movies} handleMovieClick={handleMovieClick} />;
};

export default MovieListContainer;