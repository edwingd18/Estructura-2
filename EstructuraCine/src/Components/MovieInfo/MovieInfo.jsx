import './MovieInfo.css'
import { Button } from "flowbite-react";
import { HiShoppingCart } from 'react-icons/hi';

function MovieInfo({ movie }){

    return (
        <div className="movie-info">
            <div>
                <img src={movie.imagenUrl} alt="Batman movie poster" className='movie-poster' />
                
                {/* Moved the trailer div here */}
                <div className='trailer'>
                    <iframe 
                        width="1700" 
                        height="800" 
                        src={movie.trailerUrl} 
                        title="Trailer"
                        frameborder="0" 
                        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                        allowfullscreen
                    ></iframe>
                </div>  
            </div>
            <div className="movie">
                <h1 className='movie-title'>{movie.titulo}</h1>
                <p className='description'>{movie.descripcion}</p>
                <p className='edadRango'>Recomendada para Mayores de {movie.edadRango} años</p> 
                <p className='duration'>{movie.duracion} Min</p>
                <p className='director'>Director: {movie.director}</p> {/* Agregado el autor */}
                <p className='type'>Tipo: {movie.tipo}</p> {/* Agregado el tipo */}
                
                <div className="format">
                    <div className="movie-format">{movie.formato}</div>
                </div>
                <div>

                <Button className='bg-black border border-whiter buttomComprar'>
                    <HiShoppingCart className="mr-2 h-5 w-5" />
                     Adquiere tus entradas
                </Button>

                </div>
            </div>
        </div>
    );
};

export default MovieInfo;
