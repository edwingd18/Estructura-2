import { Swiper, SwiperSlide } from 'swiper/react';
import PropTypes from 'prop-types';
import 'swiper/css';
import 'swiper/css/pagination';
import { Autoplay, Navigation } from 'swiper/modules';
import { Link } from 'react-router-dom';

const ThumbnailCarousel = ({ carouselItems, handleMovieClick }) => {
  return (
    <div className="thumbnails mt-5">
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
        className="mySwiper thumbnail-swiper "
        style={{ width: '1370px', height: '420px' }}
      >
        {carouselItems.map((movie, index) => (
          <SwiperSlide key={index}>
            <Link
              to={`/movie/${movie._id}`}
              className="opacity-50 hover:opacity-100 transition-opacity duration-300 ease-linear"
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
                className="thumbnail-image shadow-md"
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

// Definición de propTypes
ThumbnailCarousel.propTypes = {
  carouselItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      bannerUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  handleMovieClick: PropTypes.func.isRequired,
};

export default ThumbnailCarousel;
