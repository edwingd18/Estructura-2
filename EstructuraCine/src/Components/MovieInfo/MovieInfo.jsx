import './MovieInfo.css'

function MovieInfo({ movie }){

    return (
        <div className="movie-info">
            <img src={movie.imagenUrl} alt="Batman movie poster" className='movie-poster' />
            <div className="movie">
                <h1 className='movie-title'>{movie.titulo}</h1>
                <p className='description'>{movie.descripcion}</p>
                <p className='edadRango'>Recomendada para Mayores de {movie.edadRango} años</p> 
                <p className='duration'>{movie.duracion} Min</p>
                <p className='author'>Autor: {movie.autor}</p> {/* Agregado el autor */}
                <p className='type'>Tipo: {movie.tipo}</p> {/* Agregado el tipo */}
                <div>
                    <div className="movie-format">{movie.formato}</div>

                    <a href="https://www.batmantickets.com/" className="movie-button">Adquiere tus entradas</a>
                </div>
                <div>
                        {/* Agrega aquí el video del trailer */}
                        <iframe 
                            width="560" 
                            height="315" 
                            src={movie.trailerUrl} 
                            title="Trailer"
                            frameborder="0" 
                            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                            allowfullscreen
                        ></iframe>
                    </div>
            </div>
        </div>
    );
};

export default MovieInfo;
