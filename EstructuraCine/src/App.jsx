import React from "react";
import { Routes, Route } from "react-router-dom";
import Carousel from "./Components/Carousel/Carousel";
import MovieInfo from "./Components/MovieInfo/MovieInfo";
import {movies} from "./constants/moviesData";

  
const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Carousel movies={movies} />}></Route>
      <Route path="/movie/:id" element={<MovieInfo movies={movies} />}></Route>
    </Routes>
  );
};

export default App;
