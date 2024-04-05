import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const ThumbnailCarousel = ({ carouselItems, selectedThumbnailIndex, handleMovieClick }) => {
  return (
    <div className="thumbnails" style={{ marginTop: '20px' }}>
      <Swiper
        spaceBetween={20}
        slidesPerView={5}
        loop={true}
        pagination={{
          dynamicBullets: true,
          clickable: true,
        }}
        navigation={{
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        }}
        autoplay={{ delay: 2500, disableOnInteraction: false }}
        modules={[Autoplay, Navigation]}
        className="mySwiper thumbnail-swiper"
        style={{ width: '1370px', height: '420px' }}
      >
        {carouselItems.map((movie, index) => (
          <SwiperSlide key={index}>
            <Link
              to={`/movie/${movie._id}`}
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
                style={{ borderRadius: '10px' }}
                className="thumbnail-image"
              />
            </Link>
          </SwiperSlide>
        ))}
        <div className="swiper-button-prev"></div>
        <div className="swiper-button-next"></div>
      </Swiper>
    </div>
  );
};

export default ThumbnailCarousel;