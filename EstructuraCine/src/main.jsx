import React from "react";
import ReactDOM from "react-dom";
import Carousel from "./Components/Carousel/Carousel.jsx";
import Carrusel from "./Components/Carousel/Carrusel.jsx";
import "./index.css"; // Estilos CSS globales
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import LoginForm from "./Components/Login/LoginForm.jsx";
import MovieInfo from "./Components/MovieInfo/MovieInfo.jsx";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Sidebar />

    {/* <BrowserRouter>
      <App />
    </BrowserRouter> */}
    <Carrusel />
  </React.StrictMode>
);
