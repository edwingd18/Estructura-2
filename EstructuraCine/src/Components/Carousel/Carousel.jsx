import { useState, useEffect } from 'react';
import './Carousel.css'; // Estilos CSS para el carrusel

const Carousel = ({ movies }) => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [visibleThumbnails, setVisibleThumbnails] = useState([]);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(null);

  useEffect(() => {
    // Actualiza las miniaturas visibles cuando cambia el índice actual
    updateVisibleThumbnails();
  }, [currentMovieIndex]);

  useEffect(() => {
    // Iniciar el carrusel automático
    const interval = setInterval(nextMovie, 5000);
    return () => clearInterval(interval); // Limpieza al desmontar
  }, []);

  // Función para avanzar al siguiente índice de película
  const nextMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  // Actualiza las miniaturas visibles basadas en el índice actual
  const updateVisibleThumbnails = () => {
    const startIndex = currentMovieIndex;
    const endIndex = (startIndex + 4) % movies.length;
    const visible = [];

    for (let i = startIndex; i !== endIndex; i = (i + 1) % movies.length) {
      visible.push(i);
    }

    setVisibleThumbnails(visible);
  };

  const handleMovieClick = (index) => {
    setSelectedThumbnailIndex(index);
  };

  return (
    <div className="carousel">
      {/* Diapositiva principal grande */}
      <div className="main-slide">
        <img
          src={movies[selectedThumbnailIndex !== null ? selectedThumbnailIndex : currentMovieIndex].bannerUrl}
          onError={(e) => {
            e.target.onerror = null;
            e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
          }}
          style={{ width: '1340px', height: '600px' }} // Establecer dimensiones
        />
        <h2 className="title-overlay">{movies[selectedThumbnailIndex !== null ? selectedThumbnailIndex : currentMovieIndex].title}</h2>
      </div>

      {/* Miniaturas de películas */}
      <div className="thumbnails">
        {visibleThumbnails.map((index) => (
          <div
            key={index}
            className={`thumbnail ${index === selectedThumbnailIndex ? 'active' : ''}`}
            onClick={() => handleMovieClick(index)}
          >
            <img
              src={movies[index].imageUrl}
              style={{ width: '268px', height: '327px' }} // Establecer dimensiones
              alt={movies[index].title}
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
