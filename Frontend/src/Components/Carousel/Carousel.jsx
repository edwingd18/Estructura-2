import React, { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Pagination, Autoplay } from 'swiper/modules';
import axios from 'axios';
import { Link } from 'react-router-dom';

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
      <div className="main-slide">
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          slidesPerView={'auto'}
          coverflowEffect={{
            rotate: 0, // Reducimos el ángulo de rotación
            stretch: 0,
            depth: 100,
            modifier: 1,
            slideShadows: true,
          }}
          modules={[EffectCoverflow, Autoplay]}
          className="mySwiper"
          style={{ width: '1000px', height: '450px' }} // Reducimos el tamaño del carrusel
        >
          {carouselItems.map((movie, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/movie/${movie.id}`}
                className={`thumbnail ${index === selectedThumbnailIndex ? 'active' : ''}`}
                onClick={() => handleMovieClick(index)}
              >
                <img
                  src={movie.bannerUrl}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = 'https://via.placeholder.com/100x150?text=No+Image';
                  }}
                />
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="thumbnails">
        <Swiper
          spaceBetween={20}
          slidesPerView={4.5}
          autoplay={{
            delay: 2500,
            disableOnInteraction: false,
          }}
          modules={[Autoplay]}
          className="mySwiper"
          style={{ width: '1000px', height: '450px' }} // Reducimos el tamaño del carrusel

        >
          {carouselItems.map((movie, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/movie/${movie.id}`}
                className={`thumbnail ${index === selectedThumbnailIndex ? 'active' : ''}`}
                
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
              </Link>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
};

export default Carousel;