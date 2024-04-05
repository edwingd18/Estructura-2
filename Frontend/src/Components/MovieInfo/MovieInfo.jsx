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
        <h1 className="movie-title text-7xl font-bold mb-9">{movie.title}</h1>
        <p className="description text-lg mb-7">{movie.description}</p>
          <p className="edadRango mb-7 bg-white text-black py-2 px-4 rounded-full inline-block">
            Recomendada para Mayores de {movie.ageRange} años
          </p>
          <p className="duration mb-7 bg-white text-black py-2 px-4 rounded-full">{movie.duration} Min</p>

        <p className="director mb-7 bg-white text-black py-2 px-4 rounded-full">Director: {movie.director}</p>
        <p className="type mb-7 bg-white text-black py-2 px-4 rounded-full">Tipo: {movie.type.join(", ")}</p>
        <div className="format">
          <div className="movie-format">{movie.format.join(", ")}</div>
        </div>
        
        <div>
          <Link to='/login'>
            <Button className="bg-black border border-whiter buttonComprar">
              <HiShoppingCart className="mr-2 h-5 w-5" />
              Adquiere tus entradas
            </Button>
          </Link>
        </div>
        </div>
      </div>
    </div>
  );
}

export default MovieInfo;