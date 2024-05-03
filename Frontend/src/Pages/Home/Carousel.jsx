import { useState, useEffect } from 'react';
import axios from 'axios';
import MainCarousel from './MainCarousel';
import ThumbnailCarousel from './ThumbnailCarousel';

const URI = 'http://backend.ftfjfagraqa2hwfs.eastus.azurecontainer.io:8000/api/allMovies';

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
    <div className="carousel 2xl:ml-24 2xl:mb-2">
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

    </div>

  );
};

export default Carousel;