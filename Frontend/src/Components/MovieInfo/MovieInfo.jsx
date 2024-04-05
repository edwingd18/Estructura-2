import { useState, useEffect } from "react";
import axios from 'axios';
import { Link, useParams } from 'react-router-dom';
import { Button } from "flowbite-react";
import { HiShoppingCart } from "react-icons/hi";
import "./MovieInfo.css";

const URI = 'http://localhost:8000/api/movies/';

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
        const selectedMovie = response.data.find(m => m._id === id);
        if (selectedMovie) {
          setMovie(selectedMovie);
        } else {
          setMovie(null);
        }
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  if (!movie) {
    return <div>Loading...</div>;
  }

  return (
    <div className="movie-info mr-5 ml-44 items-start text-white p-5 rounded-md">
      <div>
        <img src={movie.imageUrl} alt="Imagen" className="movie-poster" />
        <div className="trailer">
          <iframe
            width="1220"
            height="800"
            src={movie.trailerUrl}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div>
      <div className="movie-text text-lg"> 
        <h1 className="movie-title text-7xl font-bold mb-9 max-w-screen-lg">{movie.title}</h1>
        <p className="description text-lg mb-7 max-w-screen-lg">{movie.description}</p>
        <div className="mt-6">
          <p className="edadRango mb-7 bg-white text-black py-2 px-4 rounded-full inline-block">Recomendada para Mayores de {movie.ageRange} años</p>
        </div>
        <div>
          <p className="duration mb-7 bg-white text-black py-2 px-4 rounded-full inline-block">{movie.duration} Min</p>
        </div>
        <div>
        <p className="director mb-7 bg-white text-black py-2 px-4 rounded-full inline-block">Director: {movie.director}</p>
        </div>
        <p className="type mb-7 bg-white text-black py-2 px-4 rounded-full inline-block">Tipo: {movie.type.join(", ")}</p>
        <div className="format">
          <div className="movie-format">{movie.format.join(", ")}</div>
        </div>
        
        <div className="bg-centerflex justify-center items-center h-screen">
          <Link to='/login'>
            <button className="buttonComprar bg-black border border-whiter rounded-xl h-11 w-80 m-52 hover:hover:bg-blue-800">
              <HiShoppingCart className="mr-2 h-5 w-5 inline-block hover:bg" />
              Adquiere tus entradas
            </button>
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;