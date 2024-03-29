import React, { useState, useEffect } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/splide/dist/css/themes/splide-default.min.css";
import "./Carousel.css";

const Carousel = ({ movies }) => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(null);

  useEffect(() => {
    const interval = setInterval(nextMovie, 5000);
    return () => clearInterval(interval);
  }, []);

  const nextMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const handleMovieClick = (index) => {
    history.push(`/movie/${movies[index].id}`);
    setSelectedThumbnailIndex(index);
  };

  return (
    <div className="carousel">
      <a
        className="main-slide"
        href={`/movie/${selectedThumbnailIndex !== null
            ? movies[selectedThumbnailIndex].id
            : movies[currentMovieIndex].id
          }`}
      >
        <div className="image-container">
          <img
            className="brightness-50"
            src={movies[selectedThumbnailIndex !== null ? selectedThumbnailIndex : currentMovieIndex].bannerUrl}
            onError={(e) => {
              e.target.onerror = null;
              e.target.src = "https://via.placeholder.com/800x400?text=No+Image";
            }}
            alt={movies[selectedThumbnailIndex !== null ? selectedThumbnailIndex : currentMovieIndex].title}
            style={{ width: "1340px", height: "600px" }}
          />
          <div className="overlay-container">
            <h2 className="title-overlay font-titles uppercase font-bold">
              {movies[selectedThumbnailIndex !== null ? selectedThumbnailIndex : currentMovieIndex].title}
            </h2>
            <p className="description-overlay font-titles font-semibold">
              {movies[selectedThumbnailIndex !== null ? selectedThumbnailIndex : currentMovieIndex].description}
            </p>
          </div>
        </div>

      </a>

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
          {movies.map((movie, index) => (
            <SplideSlide key={index}>
              <a
                href={`/movie/${movie.id}`}
                className={`thumbnail  ${index === selectedThumbnailIndex ? "active" : ""
                  }`}
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
              </a>
            </SplideSlide>
          ))}
        </Splide>
      </div>
    </div>
  );
};

export default Carousel;
