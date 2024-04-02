import { Routes, Route } from "react-router-dom";
import Carousel from "./Components/Carousel/Carousel";
import MovieInfo from "./Components/MovieInfo/MovieInfo";
import { movies } from "./constants/moviesData";
import SelectTickets from "./Components/SelectTickets - Part one/SelectTickets";
import Food from "./Components/SelectFood/Food";
import SeatMap from "./Components/SeatSelection/SeatMap";
import CheckOut from "./Components/Checkout/Checkout";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Carousel movies={movies} />} />
      <Route path="/movie/:id" element={<MovieInfo movies={movies} />} />
      <Route path="/selectTickets" element={<SelectTickets />} />
      <Route path="/selectSeat" element={<SeatMap />}></Route>
      <Route path="/selectFood" element={<Food />} />
      <Route path="/checkout" element={<CheckOut />}></Route>
    </Routes>
  );
};

export default App;