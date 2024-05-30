import { useState } from "react";
import { Routes, Route } from "react-router-dom";
import Carousel from "./Pages/Home/Carousel";
import MovieInfo from "./Components/MovieInfo/MovieInfo";
import SelectTickets from "./Components/SelectTickets - Part one/SelectTickets";
import Food from "./Components/SelectFood/Food";
import SeatMap from "./Components/SeatSelection/SeatMap";
import MovieList from "./Pages/Administrador/Movies/MovieList";
import ComboList from "./Pages/Administrador/Combos/ComboList";
import ResumenCompra from "./Components/ResumenCompra/Resumen";
import MovieChat from "./Pages/Usuario/ChatUsuario/Chat";
import withAuth from "./Pages/Login/Auth";
import MovieListUser from "./Components/MovieListUser/MovieListUser";

const ProtectedSelectTickets = withAuth(SelectTickets);
const ProtectedSeatMap = withAuth(SeatMap);
const ProtectedFood = withAuth(Food);
const ProtectedResumen = withAuth(ResumenCompra);
const ProtectedAdmin = withAuth(MovieList);
const ProtectedChat = withAuth(MovieChat);
const ProtectedInfoPayment = withAuth(InfoPayment)

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleCartUpdate = (newCartItems) => {
    setCartItems(newCartItems);
  };

  return (
    <Routes>
      <Route path="/" element={<Carousel />} />
      <Route path="/movie/:id" element={<MovieInfo />} />
      <Route path="/selectTickets" element={<ProtectedSelectTickets />} />
      <Route path="/selectSeat" element={<ProtectedSeatMap />} />
      <Route path="/selectFood" element={<ProtectedFood />} />
      <Route
        path="/purchase-summary"
        element={<ProtectedResumen selectedCombos={cartItems} />}
      />
      <Route path="/allmovies" element={<ProtectedAdmin />} />
      <Route path="/allcombos" element={<ComboList />} />
      <Route path="/chat" element={<ProtectedChat />} />
      <Route path="/listMovies" element={<MovieListUser />} />
      <Route
        path="/shopping-cart"
        element={<ResumenCompra items={cartItems} onUpdate={handleCartUpdate} />}
      />
      <Route path="/infoPage" element={<ProtectedInfoPayment />} />
    </Routes>
  );
};



export default App;
