import { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "./Carousel.css";
import axios from 'axios';
import { Link } from "react-router-dom";

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
        <Splide
          options={{
            width: "1340px",
            height: "600px",
            arrows: false, // Quitamos las flechas
            pagination: false, // Quitamos los indicadores de slide
          }}
        >
          {carouselItems.map((movie, index) => (
            <SplideSlide key={index}>
              <Link
                to={`/movie/${movie.id}`}
                className={`thumbnail  ${index === selectedThumbnailIndex ? "active" : ""}`}
                onClick={() => handleMovieClick(index)}
              >
                <div className="movie-info">
                  <h2>{movie.title}</h2>
                  <p>{movie.description}</p>
                </div>
                <img
                  src={movie.bannerUrl}
                  style={{ width: "1340px", height: "600px" }} // Cambio aquí
                  alt={movie.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/100x150?text=No+Image";
                  }}
                />
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </div>

      <div className="thumbnails ">
        <Splide
          options={{
            rewind: true,
            width: "1340px",
            height: "327px",
            gap: "20px",
            perPage: "4.5",
            autoplay: true,
            focus: "center",
          }}
        >
          {carouselItems.map((movie, index) => (
            <SplideSlide key={index}>
              <Link
                to={`/movie/${movie.id}`}
                className={`thumbnail  ${index === selectedThumbnailIndex ? "active" : ""}`}
                onClick={() => handleMovieClick(index)}
              >
                <img
                  src={movie.imageUrl}
                  style={{ width: "268px", height: "327px" }}
                  alt={movie.title}
                  onError={(e) => {
                    e.target.onerror = null;
                    e.target.src = "https://via.placeholder.com/100x150?text=No+Image";
                  }}
                />
              </Link>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default Carousel;
