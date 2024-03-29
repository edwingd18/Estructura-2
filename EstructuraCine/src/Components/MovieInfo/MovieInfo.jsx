// MovieInfo.js
import { useParams } from "react-router-dom";
import "./MovieInfo.css";
import { Link } from 'react-router-dom';
import { Button } from "flowbite-react";
import { HiShoppingCart } from "react-icons/hi";
import PropTypes from 'prop-types';

function MovieInfo({ movies }) {
  const { id } = useParams();
  const movie = movies.find((movie) => movie.id === parseInt(id));

  if (!movie) {
    return <div>No se encontró la película.</div>;
  }

  return (
    <div className="movie-info">
      <div>
        <img src={movie.imageUrl} alt="Imagen" className="movie-poster" />
        <div className="trailer">
          <iframe
            width="1600"
            height="800"
            src={movie.trailerUrl}
            title="Trailer"
            frameBorder="0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
          ></iframe>
        </div>
      </div>
      <div className="movie">
        <h1 className="movie-title ">{movie.title}</h1>
        <p className="description">{movie.description}</p>
        <div className="info">
          <p className="edadRango">
            Recomendada para Mayores de {movie.ageRange} años
          </p>
          <p className="duration">{movie.duration} Min</p>
        </div>
        <p className="director">Director: {movie.director}</p>
        <p className="type">Tipo: {movie.type}</p>

        <div className="format">
          <div className="movie-format">{movie.format}</div>
        </div>
        <div>
          <Link to='/selecttickets'>
            <Button className="bg-black border border-whiter buttonComprar">
              <HiShoppingCart className="mr-2 h-5 w-5" />
              Adquiere tus entradas
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}

MovieInfo.propTypes = {
  movies: PropTypes.array.isRequired,
};

export default MovieInfo;
