// Carousel.js
import React, { useState, useEffect, useMemo } from "react";
import "./Carousel.css";

const Carousel = ({ movies }) => {
  const [currentMovieIndex, setCurrentMovieIndex] = useState(0);
  const [visibleThumbnails, setVisibleThumbnails] = useState([]);
  const [selectedThumbnailIndex, setSelectedThumbnailIndex] = useState(null);

  useEffect(() => {
    const interval = setInterval(nextMovie, 5000);
    return () => clearInterval(interval);
  }, []);

  useEffect(() => {
    updateVisibleThumbnails();
  }, [currentMovieIndex]);

  const nextMovie = () => {
    setCurrentMovieIndex((prevIndex) => (prevIndex + 1) % movies.length);
  };

  const updateVisibleThumbnails = useMemo(() => {
    return () => {
      const startIndex = currentMovieIndex;
      const endIndex = (startIndex + 4) % movies.length;
      const visible = [];

      for (let i = startIndex; i !== endIndex; i = (i + 1) % movies.length) {
        visible.push(i);
      }

      setVisibleThumbnails(visible);
    };
  }, [currentMovieIndex, movies.length]);

  const handleMovieClick = (index) => {
    history.push(`/movie/${movies[index].id}`);
    setSelectedThumbnailIndex(index);
  };

  return (
    <div className="carousel">
      <a
        className="main-slide"
        href={`/movie/${
          movies[
            selectedThumbnailIndex !== null
              ? selectedThumbnailIndex
              : currentMovieIndex
          ].id
        }`}
      >
        <div className="image-container">
          <img
            className="brightness-50"
            src={
              movies[
                selectedThumbnailIndex !== null
                  ? selectedThumbnailIndex
                  : currentMovieIndex
              ].bannerUrl
            }
            onError={(e) => {
              e.target.onerror = null;
              e.target.src =
                "https://via.placeholder.com/800x400?text=No+Image";
            }}
            alt={
              movies[
                selectedThumbnailIndex !== null
                  ? selectedThumbnailIndex
                  : currentMovieIndex
              ].title
            }
            style={{ width: "1340px", height: "600px" }}
          />
          <h2 className="title-overlay font-titles uppercase font-bold">
            {
              movies[
                selectedThumbnailIndex !== null
                  ? selectedThumbnailIndex
                  : currentMovieIndex
              ].title
            }
          </h2>
          <p className="description-overlay font">
            {
              movies[
                selectedThumbnailIndex !== null
                  ? selectedThumbnailIndex
                  : currentMovieIndex
              ].description
            }
          </p>
        </div>
      </a>

      {/* Miniaturas de películas */}
      <div className="thumbnails">
        {visibleThumbnails.map((index) => (
          <a
            href={`/movie/${movies[index].id}`}
            key={index}
            className={`thumbnail ${
              index === selectedThumbnailIndex ? "active" : ""
            }`}
            onClick={() => handleMovieClick(index)}
          >
            <img
              src={movies[index].imageUrl}
              style={{ width: "268px", height: "327px" }}
              alt={movies[index].title}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src =
                  "https://via.placeholder.com/100x150?text=No+Image";
              }}
            />
          </a>
        ))}
      </div>
    </div>
  );
};

export default Carousel;
