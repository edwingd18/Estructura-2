import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './Components/Carousel/Carousel.jsx';
import './index.css'; // Estilos CSS globales
import Sidebar from './Components/Sidebar/Sidebar.jsx';
import LoginForm from './Components/Login/LoginForm.jsx'
import MovieInfo from './Components/MovieInfo/MovieInfo.jsx';
import Login from './Components/Login/Login.jsx';
import SelectTickets from './Components/SelectTickets - Part one/SelectTickets.jsx';


const movies = [
  {
    title: 'Pelicula 1',
    imageUrl: "https://i.ibb.co/w4fRksV/peakpx-1.jpg"
  },
  {
    title: 'Pelicula 2',
    imageUrl: 'https://example.com/image2.jpg',
  },
  {
    title: 'Pelicula 3',
    imageUrl: 'https://example.com/image3.jpg',
  },
  {
    title: 'Pelicula 4',
    imageUrl: 'https://example.com/image3.jpg',
  },
  {
    title: 'Pelicula 5',
    imageUrl: 'https://example.com/image3.jpg',
  },
  {
    title: 'Pelicula 6',
    imageUrl: 'https://example.com/image3.jpg',
  },
  // Agrega más películas según sea necesario
];
const movie = {
  titulo: "THE BATMAN",
  descripcion: "Cuando un asesino se dirige a la élite de Gotham con  de maquinaciones sádicas, unrie de maquinaciones sádicas, unrie de maquinaciones sádicas, unrie de maquinaciones sádicas, unrie de maquinaciones sádicas, unrie de maquinaciones sádicas, unrie de maquinaciones sádicas, unrie de maquinaciones sádicas, unrie de maquinaciones sádicas, un rastro de pistas crípticas envía Batman a una investigación en los bajos fondos. A medida que las pruebas comienzan a acercarse a su casa y se hace evidente la magnitud de los planes del autor, Batman debe forjar nuevas relaciones, desenmascarar al culpable y hacer justicia al abuso de poder y la corrupción que durante mucho tiempo han asolado Gotham City.",
  edadRango: 12,
  duracion: 160,
  formato: "4D",
  director: "Matt Reeves",
  tipo: "Acción",
  imagenUrl: "https://image.tmdb.org/t/p/w600_and_h900_bestv2/mo7teil1qH0SxgLijnqeYP1Eb4w.jpg",
  trailerUrl: "https://www.youtube.com/embed/L6DEcPaNdLs"
};


ReactDOM.createRoot(
  document.getElementById('root')
).render(
  <React.StrictMode>
    <Sidebar />

    {/* <MovieInfo movie={movie}/> */}
    {/* <Carousel movies={movies}/> */}
    {/* <LoginForm login={LoginForm}/> */}
    {<SelectTickets />}

  </React.StrictMode>
);