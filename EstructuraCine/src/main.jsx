import React from 'react';
import ReactDOM from 'react-dom';
import Carousel from './Components/Carousel/Carousel.jsx';
import './index.css'; // Estilos CSS globales
import Sidebar from './Components/Sidebar/Sidebar.jsx';

const movies = [
  {
    title: 'Pelicula 1',
    imageUrl: 'https://example.com/image1.jpg',
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

ReactDOM.render(
  <React.StrictMode>
    <Sidebar/>
    <Carousel movies={movies} />

  </React.StrictMode>,
  document.getElementById('root')
);