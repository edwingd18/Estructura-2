import { Routes, Route } from "react-router-dom";
import Carousel from "./Components/Carousel/Carousel";
import MovieInfo from "./Components/MovieInfo/MovieInfo";
import SelectTickets from "./Components/SelectTickets - Part one/SelectTickets";
import Food from "./Components/SelectFood/Food";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Carousel />} />
      <Route path="/movie/:id" element={<MovieInfo />} />
      <Route path="/selecttickets" element={<SelectTickets />} />
      <Route path="/selectFood" element={<Food />} />
    </Routes>
  );
};

export default App;