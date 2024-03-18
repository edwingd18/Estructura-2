import { useState, useEffect } from 'react';
import './Carousel.css'; // Estilos CSS para el carrusel

const Carousel = ({ movies }) => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  // Función para avanzar al siguiente índice de película
  const nextMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  // Efecto para cambiar automáticamente de película cada 5 segundos
  useEffect(() => {
    const interval = setInterval(nextMovie, 5000);
    return () => clearInterval(interval);
  }, []);

  const handleMovieClick = (index) => {
    setCurrentMovieIndex(index);
  };

  return (
    <div className="carousel">
      {/* Diapositiva principal grande */}
      <div className="main-slide">
        <img
          src={movies[currentMovieIndex].imageUrl}
          alt={movies[currentMovieIndex].title}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
          }}
        />
        <h2>{movies[currentMovieIndex].title}</h2>
      </div>

      {/* Miniaturas de películas */}
      <div className="thumbnails">
        {movies.map((movie, index) => (
          <div
            key={index}
            className={`thumbnail ${index === currentMovieIndex ? 'active' : ''}`}
            onClick={() => handleMovieClick(index)}
          >
            <img
              src={movie.imageUrl}
              alt={movie.title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = 'https://via.placeholder.com/100x150?text=No+Image';
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
