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
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);

  useEffect(() => {
      fetchCarouselItems();
      const interval = setInterval(nextMovie, 5000);
      return () => clearInterval(interval);
  }, []);

  const fetchCarouselItems = async () => {
      try {
          const response = await axios.get(URI);
          setCarouselItems(response.data);
      } catch (error) {
          console.error('Error fetching carousel items:', error);
      }
  };

  const nextMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % carouselItems.length);
};


  const handleMovieClick = (index) => {
    setSelectedThumbnailIndex(index === selectedThumbnailIndex ? null : index);
  };

  return (
    <div className="carousel">
      <Link
        to={`/movie/${carouselItems[currentMovieIndex]?.id}`} 
        className="main-slide"
      >
        <div className="image-container">
          <img
            className="brightness-50"
            src={carouselItems[currentMovieIndex]?.bannerUrl}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/800x400?text=No+Image";
            }}
            alt={carouselItems[currentMovieIndex]?.title}
            style={{ width: "1340px", height: "600px" }}
          />
          <div className="overlay-container">
            <h2 className="title-overlay font-titles uppercase font-bold">
              {carouselItems[currentMovieIndex]?.title}
            </h2>
            <p className="description-overlay font-titles font-semibold">
              {carouselItems[currentMovieIndex]?.description}
            </p>
          </div>
        </div>
      </Link>

      <div className="thumbnails ">
        <Splide
          options={{
            rewind: true,
            width: "1340px",
            height: "327px",
            gap: "20px",
            perPage: "4.5",
            autoplay: false, // Desactivar el autoplay del Splide para evitar conflictos
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
                    e.target.src =
                      "https://via.placeholder.com/100x150?text=No+Image";
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
