import  { useState, useEffect } from 'react';
import axios from 'axios';
import MainCarousel from './MainCarousel';
import ThumbnailCarousel from './ThumbnailCarousel';
import CreateMovie from './Administrador/Movies/ModalCrearPelicula/CreateMovie';

const URI = 'http://localhost:8000/api/movies/';

const Carousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(0); // Inicializado con 0

  useEffect(() => {
    fetchCarouselItems();
  }, []);

  const fetchCarouselItems = async () => {
    try {
      const response = await axios.get(URI);
      setCarouselItems(response.data);
    } catch (error) {
      console.error('Error fetching carousel items:', error);
    }
  };

  const handleMovieClick = (index) => {
    setSelectedThumbnailIndex(index);
  };

  return (
    <div className="carousel 2xl:ml-9 2xl:mb-2">
      {carouselItems.length > 0 && ( 
        <MainCarousel
          carouselItems={carouselItems}
          selectedThumbnailIndex={selectedThumbnailIndex}
          handleMovieClick={handleMovieClick}
        />
      )}
      <ThumbnailCarousel
        carouselItems={carouselItems}
        selectedThumbnailIndex={selectedThumbnailIndex}
        handleMovieClick={handleMovieClick}
      />
        <CreateMovie/>
    </div>
  
  );
};

export default Carousel;