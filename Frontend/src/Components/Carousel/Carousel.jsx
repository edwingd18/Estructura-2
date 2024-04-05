import React, { useState, useEffect } from 'react';
import axios from 'axios';
import MainCarousel from './MainCarousel';
import ThumbnailCarousel from './ThumbnailCarousel';
import './Carousel.css';

const URI = 'http://localhost:8000/api/movies/';

const Carousel = () => {
  const [carouselItems, setCarouselItems] = useState([]);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(null);

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
    <div className="carousel">
      <MainCarousel
        carouselItems={carouselItems}
        selectedThumbnailIndex={selectedThumbnailIndex}
        handleMovieClick={handleMovieClick}
      />
      <ThumbnailCarousel
        carouselItems={carouselItems}
        selectedThumbnailIndex={selectedThumbnailIndex}
        handleMovieClick={handleMovieClick}
      />
    </div>
  );
};

export default Carousel;