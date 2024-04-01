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
        {/* <Link
          to={`/movie/${selectedThumbnailIndex !== null
              ? carouselItems[selectedThumbnailIndex].id
              : carouselItems[0]?.id}`}
          className="main-slide"
        >
          <div className="image-container">
            <img
              className="brightness-50"
              src={carouselItems[selectedThumbnailIndex !== null ? selectedThumbnailIndex : 0]?.bannerUrl}
              onError={(e) => {
                e.target.onerror = null;
                e.target.src = "https://via.placeholder.com/800x400?text=No+Image";
              }}
              alt={carouselItems[selectedThumbnailIndex !== null ? selectedThumbnailIndex : 0]?.title}
              style={{ width: "1340px", height: "600px" }}
            />
            <div className="overlay-container">
              <h2 className="title-overlay font-titles uppercase font-bold">
                {carouselItems[selectedThumbnailIndex !== null ? selectedThumbnailIndex : 0]?.title}
              </h2>
              <p className="description-overlay font-titles font-semibold">
                {carouselItems[selectedThumbnailIndex !== null ? selectedThumbnailIndex : 0]?.description}
              </p>
            </div>
          </div>
        </Link> */}
                <div className="main-slide">
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
                    src={movie.bannerUrl}
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
