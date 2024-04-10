import PropTypes from 'prop-types';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Autoplay } from 'swiper/modules';
import { Link } from 'react-router-dom';

const MainCarousel = ({ carouselItems, selectedThumbnailIndex, handleMovieClick }) => {
  return (
    <div className=" sm:w" style={{ marginTop: '20px' }}>
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
            <div className="movie-item relative">
              <Link
                to={`/movie/${movie._id}`}
                className={`thumbnail ${index === selectedThumbnailIndex ? 'active' : ''}`}
                onClick={() => handleMovieClick(index)}
              >
                <div className="group relative">
                  <img
                    src={movie.bannerUrl}
                    alt={movie.title}
                    onError={(e) => {
                      e.target.onerror = null;
                      e.target.src = 'https://via.placeholder.com/100x150?text=No+Image';
                    }}
                    style={{ borderRadius: '10px' }}
                    className="main-slide-image opacity-100 group-hover:opacity-50 transition-opacity duration-300"
                  />
                  <div className="movie-texto opacity-0 transition-opacity duration-300 ease-linear absolute bottom-40 hover:opacity-100 group-hover:opacity-100">
                    <div className=" ml-28 mr-32">
                      <h2 className="title-overlay font-bold text-7xl pb-5 font-titulo text-white ">
                        {movie.title}
                      </h2>
                      <p className="description-overlay text-xl font-titles w-full font-medium text-white">
                        {movie.description}
                      </p>
                    </div>
                  </div>
                </div>
              </Link>
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

// Definición de propTypes
MainCarousel.propTypes = {
  carouselItems: PropTypes.arrayOf(
    PropTypes.shape({
      _id: PropTypes.string.isRequired,
      title: PropTypes.string.isRequired,
      description: PropTypes.string.isRequired,
      bannerUrl: PropTypes.string.isRequired,
    })
  ).isRequired,
  selectedThumbnailIndex: PropTypes.number.isRequired,
  handleMovieClick: PropTypes.func.isRequired,
};

export default MainCarousel;