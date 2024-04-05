import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

const MainCarousel = ({ carouselItems, selectedThumbnailIndex, handleMovieClick }) => {
  return (
    <div className="main-slide" style={{ marginTop: '20px' }}>
      <Swiper
        effect={'coverflow'}
        grabCursor={true}
        loop={true}
        centeredSlides={true}
        autoplay={{ delay: 5000, disableOnInteraction: false }}
        slidesPerView={'auto'}
        coverflowEffect={{
          rotate: 70,
          stretch: 0,
          depth: 100,
          modifier: 1,
          slideShadows: true,
        }}
        modules={[EffectCoverflow, Autoplay]}
        className="mySwiper main-swiper"
        style={{ width: '1370px', height: '675px' }}
      >
        {carouselItems.map((movie, index) => (
          <SwiperSlide key={index}>
            <div className="movie-item">
              <Link
                to={`/movie/${movie._id}`}
                className={`thumbnail ${index === selectedThumbnailIndex ? 'active' : ''}`}
                onClick={() => handleMovieClick(index)}
              >
                <div className="image-container">
                  <img
                    src={movie.bannerUrl}
                    alt={movie.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/100x150?text=No+Image';
                    }}
                    style={{ borderRadius: '10px' }}
                    className="main-slide-image"
                  />
                </div>
                <div className="movie-texto">
                  <h2 className='title-overlay font-bold text-7xl pb-5 font-titulo'>{movie.title}</h2>
                  <p className='description-overlay text-xl font-titles font-medium'>{movie.description}</p>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default MainCarousel;