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
import ShoppingCart from "./Components/ResumenCompra/ShoppingCart";
import MovieChat from "./Pages/Usuario/ChatUsuario/Chat";
import withAuth from "./Pages/Login/Auth";
import MovieListUser from "./Components/MovieListUser/MovieListUser";
import { InfoPayment } from "./Components/Info Payment/InfoPaymen";
import { CreditCard } from "./Components/paymentPage/CreditCart";
import Team from "./Components/About/About"

const ProtectedSelectTickets = withAuth(SelectTickets);
const ProtectedSeatMap = withAuth(SeatMap);
const ProtectedFood = withAuth(Food);
const ProtectedResumen = withAuth(ShoppingCart);
const ProtectedAdmin = withAuth(MovieList);
const ProtectedChat = withAuth(MovieChat);
const ProtectedCardPage = withAuth(CreditCard)
const ProtectedInfoPayment = withAuth(InfoPayment)

const App = () => {
  const [cartItems, setCartItems] = useState([]);

  const handleCartUpdate = (newCartItems) => {
    setCartItems(newCartItems);
  };

  return (
    <Routes>
      <Route path="/About" element={<Team />} />
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
        element={<ShoppingCart items={cartItems} onUpdate={handleCartUpdate} />}
      />
      <Route path="/paymant" element={<ProtectedCardPage />} />
      <Route path="/infoPage" element={<ProtectedInfoPayment />} />
    </Routes>
  );
};



export default App;
