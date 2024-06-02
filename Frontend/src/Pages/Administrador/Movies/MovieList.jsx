import { useState, useEffect } from 'react';
import axios from 'axios';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import CreateMovie from './ModalCrearPelicula/CreateMovie';
import EditMovie from './ModalEditarPelicula/EditMovie';
import DeleteMovie from './ModalElimarPelicula/DeleteMovie';

const URI = 'http://localhost:8000/api/allMovies';

const MovieList = ({ movies, handleMovieClick }) => {
  const [filter, setFilter] = useState('');
  const [selectedType, setSelectedType] = useState('Todos');

  const handleFilterChange = (event) => {
    setFilter(event.target.value);
  };

  const handleTypeChange = (event) => {
    setSelectedType(event.target.value);
  };

  const filteredMovies = movies.filter(movie =>
    movie.title.toLowerCase().includes(filter.toLowerCase()) &&
    (selectedType === 'Todos' || movie.type === selectedType)
  );

  const handleLinkClick = (e, index) => {
    e.preventDefault();
    handleMovieClick(index);
  };

  return (
    <div className='text-black ml-32 mr-10'>
      <h1 className=' mt-5 mb-5 text-4xl text-white'>Películas</h1>
      <div className='flex flex-row'>
        <input
          className='w-[640px] h-14 rounded-md'
          type="text"
          placeholder="Filtro"
          value={filter}
          onChange={handleFilterChange}
        />
        <select
          className='ml-3 h-14 rounded-md'
          id="format"
          value={selectedType}
          onChange={handleTypeChange}
        >
          <option value="Todos">Todas</option>
          <option value="Comedia">Comedia</option>
          <option value="Suspenso">Suspenso</option>
          <option value="Acción">Acción</option>
          <option value="Drama">Drama</option>
          <option value="Ciencia ficción">Ciencia ficción</option>
          <option value="Animación">Animación</option>
          <option value="Romance">Romance</option>
        </select>
        <div className="ml-3">
          <CreateMovie />
        </div>
      </div>
      <div className='grid grid-cols-4 gap-4 mt-5'>
        {filteredMovies.map((movie, index) => (
          <div key={index} className='mb-4 group relative'>
            <Link to={`/movie/${movie._id}`} onClick={(e) => handleLinkClick(e, index)}>
              <img
                src={movie.imageUrl}
                alt={movie.title}
                onError={(e) => {
                  e.target.onerror = null;
                  e.target.src = 'https://via.placeholder.com/100x150?text=No+Image';
                }}
                className="movie-image shadow-md opacity-100 rounded-md group-hover:opacity-50 transition-opacity duration-300 ease-linear"
              />
              <div className='absolute flex flex-col top-[310px] left-[225px] items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300'>
                <div className='mb-2'>
                  <EditMovie movieId={movie._id} />
                </div>
                <DeleteMovie movieId={movie._id} />
              </div>
            </Link>
            <p className='text-xl mt-3 text-white'>{movie.title}</p>
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
      type: PropTypes.string.isRequired,
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
