import React from "react";
import { Routes, Route } from "react-router-dom";
import Carousel from "./Components/Carousel/Carousel";
import MovieInfo from "./Components/MovieInfo/MovieInfo";
const movies = [
  {
    id: 1,
    title: "Madame Web",
    imageUrl:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8enikn5rdpsVyQd1qnpOqpACZqO.jpg",
    trailerUrl: "https://www.youtube.com/embed/plv6ppDBGCk",
    bannerUrl:
      "https://image.tmdb.org/t/p/original/pwGmXVKUgKN13psUjlhC9zBcq1o.jpg",
    description:
      "Cassandra Webb es una paramédica en Manhattan que podría tener habilidades clarividentes. Obligada a enfrentarse a sucesos que se han revelado de su pasado, crea una relación con tres jóvenes destinadas a tener un futuro poderoso... si consiguen sobrevivir a un presente mortal.",
    ageRange: 15,
    duration: "1h 56m",
    format: "2D, 3D",
    director: "S.J. Clarkson",
    type: "Acción, Fantasía",
  },
  {
    id: 2,
    title: "Spider-Man: Cruzando el Multiverso",
    imageUrl:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/37WcNMgNOMxdhT87MFl7tq7FM1.jpg",
    bannerUrl:
      "https://image.tmdb.org/t/p/original/9xfDWXAUbFXQK585JvByT5pEAhe.jpg",
    description:
      "Tras reencontrarse con Gwen Stacy, el amigable vecindario de Spider-Man de Brooklyn al completo es catapultado a través del Multiverso, donde se encuentra con un equipo de Spidermans encargados de proteger su propia existencia. Pero cuando los héroes se enfrentan sobre cómo manejar una nueva amenaza, Miles se encuentra enfrentado a las otras Arañas y debe redefinir lo que significa ser un héroe para poder salvar a la gente que más quiere.",
    ageRange: 15,
    duration: "2h 20m",
    format: "2D, 3D",
    director: "Justin K. Thompson",
    type: "Animación, Acción, Aventura, Ciencia ficción",
    trailerUrl: "https://youtu.be/oBmazlyP220",
  },
  {
    id: 3,
    title: "Wonka",
    imageUrl:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6eHcR7zwvNSvkOl9jbctU0lvZQ1.jpg",
    bannerUrl:
      "https://image.tmdb.org/t/p/original/yyFc8Iclt2jxPmLztbP617xXllT.jpg",
    description:
      "Basada en el personaje que protagoniza 'Charlie' y la fábrica de chocolate, el libro infantil más emblemático de Roald Dahl y uno de los más vendidos de todos los tiempos, 'Wonka' cuenta la historia de cómo el mayor inventor, mago y chocolatero del mundo se convirtió en el querido Willy Wonka que conocemos hoy en día.",
    ageRange: 15,
    duration: "1h 57m",
    format: "2D, 3D",
    director: "Paul Kingn",
    type: "Comedia, Familia, Fantasía",
    trailerUrl: "https://youtu.be/-YRw-3dgsjo",
  },
  {
    id: 4,
    title: "Paddington",
    imageUrl:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/mJypxc7GFS98v4GvlS6Z8EcXc9F.jpg",
    bannerUrl:
      "https://image.tmdb.org/t/p/original/oMKEjH5LB2igku773vhgVlttdOg.jpg",
    description:
      "Paddington es un oso que ha crecido en las profundidades de la selva peruana junto a su tía Lucy quien, debido a un encuentro casual con un explorador inglés, ha inculcado en su sobrino el sueño de vivir en Londres. Cuando un terremoto destruye su hogar, la tía Lucy decide ocultar a su joven sobrino en un barco rumbo a Inglaterra en busca de una vida mejor.",
    ageRange: 15,
    duration: "1h 35m",
    format: "2D, 3D",
    director: "Michael Bond",
    type: "Comedia, Aventura, Familia",
    trailerUrl: "https://youtu.be/Bt4J4MVuHXE",
  },
  {
    id: 5,
    title: "Dune",
    imageUrl:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hIEKzq0klqtz1H3S7QxzH4mMbvT.jpg",
    bannerUrl:
      "https://image.tmdb.org/t/p/original/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg",
    description:
      "En un lejano futuro, la galaxia conocida es gobernada mediante un sistema feudal de casas nobles bajo el mandato del Emperador. Las alianzas y la política giran entorno a un pequeño planeta, Dune, del que extrae la 'especia melange', la materia prima que permite los viajes espaciales.",
    ageRange: 15,
    duration: "2h 35m",
    format: "2D, 3D",
    director: "Denis Villeneuve",
    type: "Ciencia ficción, Aventura",
    trailerUrl: "https://youtu.be/TTgk_iT8Uts",
  },
  {
    id: 6,
    title: "Oppenheimer",
    imageUrl:
      "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ncKCQVXgk4BcQV6XbvesgZ2zLvZ.jpg",
    bannerUrl:
      "https://image.tmdb.org/t/p/original/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg",
    description:
      "Película sobre el físico J. Robert Oppenheimer y su papel como desarrollador de la bomba atómica. Basada en el libro 'American Prometheus: The Triumph and Tragedy of J. Robert Oppenheimer' de Kai Bird y Martin J. Sherwin.",
    ageRange: 15,
    duration: "3h 01m",
    format: "2D, 3D",
    director: "Christopher Nolan",
    type: "Drama, Historia",
    trailerUrl: "https://youtu.be/gMPEbJQun68",
  },
];
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Carousel movies={movies} />}></Route>
      <Route path="/movie/:id" element={<MovieInfo movies={movies} />}></Route>
    </Routes>
  );
};

export default App;
