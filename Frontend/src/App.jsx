import { Routes, Route } from "react-router-dom";
import Carousel from "./Pages/Home/Carousel";
import MovieInfo from "./Components/MovieInfo/MovieInfo";
import SelectTickets from "./Components/SelectTickets - Part one/SelectTickets";
import Food from "./Components/SelectFood/Food";
import SeatMap from "./Components/SeatSelection/SeatMap";
import CheckOut from "./Components/Checkout/Checkout";
import LoginForm from './Pages/Login/LoginForm'

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Carousel />} />
      <Route path="/movie/:id" element={<MovieInfo />} />
      <Route path="/selectTickets" element={<SelectTickets />} />
      <Route path="/selectSeat" element={<SeatMap />}></Route>
      <Route path="/selectFood" element={<Food />} />
      <Route path="/checkout" element={<CheckOut />}></Route>
      <Route path="/login" element={<LoginForm />}></Route>
    </Routes>
  );
};

export default App;