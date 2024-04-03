import { useState, useEffect } from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/css';
import 'swiper/css/effect-coverflow';
import 'swiper/css/pagination';
import { EffectCoverflow, Navigation, Autoplay } from 'swiper/modules';
import axios from 'axios';
import { Link } from 'react-router-dom';
import './Carousel.css'; // Importa el archivo CSS personalizado

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
      <div className="main-slide" style={{ marginTop: '20px' }}>
        <Swiper
          effect={'coverflow'}
          grabCursor={true}
          centeredSlides={true}
          autoplay={{ delay: 5000, disableOnInteraction: false }} // Aumentamos el delay a 5 segundos
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
          style={{ width: '1100px', height: '618.75px' }}
        >
          {carouselItems.map((movie, index) => (
            <SwiperSlide key={index}>
              <div className="movie-container">
                <Link
                  to={`/movie/${movie._id}`}
                  className={`thumbnail ${
                    index === selectedThumbnailIndex ? 'active' : ''
                  }`}
                  onClick={() => handleMovieClick(index)}
                >
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
                </Link>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
      <div className="thumbnails" style={{ marginTop: '20px' }}>
        <Swiper
          spaceBetween={20}
          slidesPerView={4.5}
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
          style={{ width: '1100px', height: '343.1px' }}
        >
          {carouselItems.map((movie, index) => (
            <SwiperSlide key={index}>
              <Link
                to={`/movie/${movie._id}`}
                className={`thumbnail ${
                  index === selectedThumbnailIndex ? 'active' : ''
                }`}
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
    </div>
  );
};

export default Carousel;