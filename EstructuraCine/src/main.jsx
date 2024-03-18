import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './Components/Carousel/Carousel.jsx';
import './index.css'; // Estilos CSS globales
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import LoginForm from './Components/Login/LoginForm.jsx'
import MovieInfo from './Components/MovieInfo/MovieInfo.jsx';


const movies = [
  {
    title: 'Madame Web',
    imageUrl: "https://www.themoviedb.org/t/p/w600_and_h900_bestv2/8enikn5rdpsVyQd1qnpOqpACZqO.jpg",
    bannerUrl: "https://image.tmdb.org/t/p/original/pwGmXVKUgKN13psUjlhC9zBcq1o.jpg"
  },
  {
    title: 'Spider-Man: Cruzando el Multiverso',
    imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/37WcNMgNOMxdhT87MFl7tq7FM1.jpg',
    bannerUrl: 'https://image.tmdb.org/t/p/original/9xfDWXAUbFXQK585JvByT5pEAhe.jpg'
  },
  {
    title: 'Wonka',
    imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/6eHcR7zwvNSvkOl9jbctU0lvZQ1.jpg',
    bannerUrl:"https://image.tmdb.org/t/p/original/yyFc8Iclt2jxPmLztbP617xXllT.jpg"
  },
  {
    title: 'Paddington',
    imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/mJypxc7GFS98v4GvlS6Z8EcXc9F.jpg',
    bannerUrl:"https://image.tmdb.org/t/p/original/oMKEjH5LB2igku773vhgVlttdOg.jpg"
  },
  {
    title: 'Dune',
    imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/hIEKzq0klqtz1H3S7QxzH4mMbvT.jpg',
    bannerUrl:"https://image.tmdb.org/t/p/original/lzWHmYdfeFiMIY4JaMmtR7GEli3.jpg"
  },
  {
    title: 'Oppenheimer',
    imageUrl: 'https://www.themoviedb.org/t/p/w600_and_h900_bestv2/ncKCQVXgk4BcQV6XbvesgZ2zLvZ.jpg',
    bannerUrl:"https://image.tmdb.org/t/p/original/nb3xI8XI3w4pMVZ38VijbsyBqP4.jpg"
  },
  // Agrega más películas según sea necesario
];
const movie = {
  titulo: "THE BATMAN",
  descripcion: "Cuando un asesino se dirige a la élite de Gotham con  de maquinaciones sádicas, unrie de maquinaciones sádicas, unrie de maquinaciones sádicas, unrie de maquinaciones sádicas, unrie de maquinaciones sádicas, unrie de maquinaciones sádicas, unrie de maquinaciones sádicas, unrie de maquinaciones sádicas, unrie de maquinaciones sádicas, un rastro de pistas crípticas envía Batman a una investigación en los bajos fondos. A medida que las pruebas comienzan a acercarse a su casa y se hace evidente la magnitud de los planes del autor, Batman debe forjar nuevas relaciones, desenmascarar al culpable y hacer justicia al abuso de poder y la corrupción que durante mucho tiempo han asolado Gotham City.",
  edadRango: 12,
  duracion: 160,
  formato: "4D",
  director:"Matt Reeves",
  tipo:"Acción",
  imagenUrl: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/mo7teil1qH0SxgLijnqeYP1Eb4w.jpg",
  trailerUrl:"https://www.youtube.com/embed/L6DEcPaNdLs"
};


ReactDOM.render(
  <React.StrictMode>
    <Sidebar/>

   {/* <LoginForm/> */}

     {/* <MovieInfo movie={movie}/>  */}
     <Carousel movies={movies}/> 


  </React.StrictMode>,
  document.getElementById('root')
);