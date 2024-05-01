import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import { createPortal } from 'react-dom';
import { ModalLogin } from '../../Pages/Login/Login'

const URI = "http://localhost:8000/api/allMovies";

function MovieInfo() {
  const [movie, setMovie] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
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

  const handleBuyClick = () => {
    setIsModalOpen(true);
  }

  const handleCloseModal = () => {
    setIsModalOpen(false);
  }

  return (
    <div className="flex sm:flex-col flex-row ">
      <div className="flex sm:flex-col sm:ml-28   xl:flex-row 2xl:flex-row 2xl:ml-9 mr-5 ml-9 text-white p-5 rounded-md h-full ">
        <img className="movie-poster sm:w-96 sm:mb-7  md:w-full  lg:w-10/12 lg:ml-12 xl:w-1/2 xl:h-1/3 xl:ml-10 xl:mr-6  2xl:h-128 2xl:w-128  2xl:mr-20 2xl:ml-28 rounded-2xl" src={movie.imageUrl} alt="Imagen" />

        <div className=" text-lg self-center h-full sm:flex-col 2xl: ml-1">
          <h1 className="movie-title sm:text-4xl  md:text-4xl lg:text-5xl xl:text-5xl 2xl:text-7xl font-bold mb-9 max-w-screen-sm">
            {movie.title}
          </h1>
          <p className="description sm:text-2xs text-lg mb-7 max-w-lg">
            {movie.description}
          </p>
          <div className="mt-6">
            <p className="edadRango  sm:text-xs sm:mb-2  lg:text-sm  2xl:mb-7 2xl:text-lg bg-white text-black py-2 px-4 rounded-full inline-block">
              Recomendada para Mayores de {movie.ageRange} años
            </p>
          </div>
          <div>
            <p className="duration sm:text-xs sm:mb-1  lg:text-sm   2xl:mb-7 2xl:text-lg bg-white text-black py-2 px-4 rounded-full inline-block">
              {movie.duration} Min
            </p>
          </div>
          <div>
            <p className="director sm:text-xs sm:mb-2 lg:text-sm 2xl:mb-7 2xl:text-lg rounded-full inline-block">
              Director: {movie.director}
            </p>
          </div>
          <p className="type sm:text-xs sm:mb-2  lg:text-sm 2xl:text-lg rounded-full ">Tipo: {movie.type.join(", ")}</p>
          <div className="movie-format sm:text-xs sm:mb-2 lg:text-sm 2xl:py-2 2xl:text-lg inline-block rounded-full bg-red-600 text-white py-2 px-4 uppercase mr-4 2xl:mt-7">
            {movie.format.join(", ")}
          </div>
          <Link to="#">
            <button onClick={handleBuyClick} className="buttonComprar sm:text-sm sm:flex-col sm:h-9  md:text-xs md:h-auto md:py-1.5 lg:text-sm lg:py-2 2xl:text-lg 2xl:h-11 2xl:py-2  items-center bg-blue-800 border rounded-full border-whiter  h-11 w-91  hover:hover:bg-blue-800 py-2 px-4">
              <HiShoppingCart className="  md:w-4 mr-2 h-5 w-5 inline-block rounded-full hover:bg" />
              Adquiere tus entradas
            </button>
          </Link>
        </div>
      </div>
      <iframe className="sm:w-8/12 sm:h-80 sm:ml-36 sm:mt-5 sm:mb-5  lg:w-9/12 lg:ml-40 xl:w-10/12 xl:h-screen  xl:ml-40x  2xl:w-10/12 2xl:h-screen 2xl:ml-40"

        src={movie.trailerUrl}
        title="Trailer"
        frameBorder=""
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
        allowFullScreen></iframe>

      {isModalOpen && createPortal(
        <ModalLogin showModal={isModalOpen} toggleModal={handleCloseModal} />,
        document.body
      )}
    </div>
  );
}

export default MovieInfo;


