import { useState, useEffect } from "react";
import axios from "axios";
import { Link, useParams } from "react-router-dom";
import { HiShoppingCart } from "react-icons/hi";
import "./MovieInfo.css";

const URI = "http://localhost:8000/api/movies/";

function MovieInfo() {
  const [movie, setMovie] = useState(null);
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

  return (
    <div className="sm:flex-col-reverse">
      <div className="flex mr-5 ml-32 text-white p-5 rounded-md h-full ">
        <img className="movie-poster sm:w-60 sm:h-1 md:w-32  xl:w-1/2 xl:h-1/3 xl:ml-10 xl:mr-6  2xl:w-2/5 2xl:mr-32 2xl:ml-28 rounded-2xl" src={movie.imageUrl} alt="Imagen" />

        <div className="text-lg self-center h-full sm:flex-col">
          <h1 className="movie-title sm:text-xl xl:text-5xl 2xl:text-7xl font-bold mb-9 max-w-screen-sm">
            {movie.title}
          </h1>
          <p className="description text-lg mb-7 max-w-lg">
            {movie.description}
          </p>
          <div className="mt-6">
            <p className="edadRango mb-7 bg-white text-black py-2 px-4 rounded-full inline-block">
              Recomendada para Mayores de {movie.ageRange} años
            </p>
          </div>
          <div>
            <p className="duration mb-7 bg-white text-black py-2 px-4 rounded-full inline-block">
              {movie.duration} Min
            </p>
          </div>
          <div>
            <p className="director mb-7 rounded-full inline-block">
              Director: {movie.director}
            </p>
          </div>
          <p className="type rounded-full ">Tipo: {movie.type.join(", ")}</p>
          <div className="movie-format inline-block rounded-full bg-red-600 text-white py-2 px-4 uppercase mr-4">
            {movie.format.join(", ")}
          </div>
          <Link to="/login">
            <button className="buttonComprar items-center bg-blue-800 border rounded-full border-whiter  h-11 w-80 m-52 hover:hover:bg-blue-800 py-2 px-4">
              <HiShoppingCart className="mr-2 h-5 w-5 inline-block rounded-full hover:bg" />
              Adquiere tus entradas
            </button>
          </Link>
        </div>
      </div>
        <iframe className="xl:ml-3 2xl:ml-64"
          width="1220"
          height="800"
          src={movie.trailerUrl}
          title="Trailer"
          frameBorder=""
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
          allowFullScreen
        ></iframe>
    </div>
  );
}

export default MovieInfo;


