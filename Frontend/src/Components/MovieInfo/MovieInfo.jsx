import { useState, useEffect } from "react";
import axios from "axios";
import { useParams } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { ModalLogin } from '../../Pages/Login/Login';
import { useNavigate } from "react-router-dom";
import { motion } from 'framer-motion';

const URI = 'http://localhost:8000/api/allMovies';

function MovieInfo() {
  const [movie, setMovie] = useState(null);
  const [showModal, setShowModal] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    fetchMovie();
  }, [id]);

  const fetchMovie = async () => {
    try {
      const response = await axios.get(URI);
      if (response.data) {
        const selectedMovie = response.data.find((m) => m._id === id);
        if (selectedMovie) {
          setMovie(selectedMovie);
          localStorage.setItem('movieId', JSON.stringify(selectedMovie._id));
          localStorage.setItem('movieName', JSON.stringify(selectedMovie.title));
        } else {
          setMovie(null);
        }
      }
    } catch (error) {
      console.error("Error fetching movies:", error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  const handleButtonClick = () => {
    const jwt = localStorage.getItem('jwt');
    if (jwt) {
      navigate('/selectTickets');
    } else {
      setShowModal(true);
    }
  };

  return (
    <div className="flex sm:flex-col flex-row">
      <div className="flex sm:flex-col sm:ml-28 xl:flex-row 2xl:flex-row 2xl:ml-9 mr-5 ml-9 text-white p-5 rounded-md h-full">
        <motion.div
          initial={{ opacity: 0, scale: 0 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{
            duration: 1,
            delay: 0.5,
            ease: [0, 0.71, 1, 1.01]
          }}
        >
          <img
            className="movie-poster  2xl:h-auto w-[500px]  2xl:mr-20 2xl:ml-[145px] rounded-2xl"
            src={movie.imageUrl}
            alt="Imagen"
          />
        </motion.div>
        <motion.div
          initial={{ opacity: 0, x: -100 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{
            duration: 1,
            delay: 1,
            ease: [0, 0.71, 1, 1.01]
          }}
          className="text-lg self-center h-full sm:flex-col 2xl:"
        >
          <h1 className="movie-title sm:text-4xl md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-6xl font-bold mb-9 max-w-screen-sm">
            {movie.title}
          </h1>
          <p className="description sm:text-2xs text-md mb-7 max-w-lg text-stone-400">
            {movie.description}
          </p>
            <div className="edadRango sm:text-xs sm:mb-2 lg:text-sm 2xl:mb-3 2xl:text-md bg-white text-black py-2 px-4 rounded-full inline-block">
              Recomendada para Mayores de {movie.ageRange} años
            </div>
          <div>
            <p className="duration sm:text-xs sm:mb-1 lg:text-sm 2xl:mb-2 2xl:text-md bg-white text-black py-2 px-4 rounded-full inline-block">
              {movie.duration} Min
            </p>
          </div>
          <div>
            <p className="director sm:text-xs sm:mb-2 lg:text-sm 2xl:mb-3 2xl:text-md rounded-full inline-block">
              Director: {movie.director}
            </p>
          </div>
          <p className="type sm:text-xs sm:mb-2 lg:text-sm 2xl:text-md rounded-full">
            Tipo: {movie.type}
          </p>
          <div className="movie-format sm:text-xs sm:mb-2 lg:text-sm 2xl:py-2 2xl:text-sm inline-block rounded-full bg-red-600 text-white py-2 px-4 uppercase mr-4 2xl:mt-4">
            {movie.format}
          </div>
          <motion.button
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 1 }}
              transition={{ duration: 0.2 }}
            onClick={handleButtonClick}
            className="bg-blue-800 text-white py-2 px-4 rounded-full inline-block text-sm"
          >
            <HiShoppingCart className="md:w-4 mr-2 h-5 w-5 inline-block rounded-full hover:bg" />
            Adquiere tus entradas
          </motion.button>
        </motion.div>
      </div>
      <iframe
        className=" 2xl:w-[1150px] 2xl:h-screen 2xl:ml-[200px] rounded-sm "
        src={movie.trailerUrl}
        title="Trailer"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen
      ></iframe>
      <ModalLogin showModal={showModal} toggleModal={() => setShowModal(false)} context='tickets' />,
    </div>
  );
}

export default MovieInfo;
