import { Routes, Route } from "react-router-dom";
import Carousel from "./Pages/Home/Carousel";
import MovieInfo from "./Components/MovieInfo/MovieInfo";
import SelectTickets from "./Components/SelectTickets - Part one/SelectTickets";
import Food from "./Components/SelectFood/Food";
import SeatMap from "./Components/SeatSelection/SeatMap";
import MovieList from "./Pages/Administrador/Movies/MovieList";
import ComboList from "./Pages/Administrador/Combos/ComboList"
import ResumenCompra from "./Components/ResumenCompra/Resumen";
import MovieChat from "./Pages/Usuario/ChatUsuario/Chat";
import withAuth from "./Pages/Login/Auth";

const ProtectedSelectTickets = withAuth(SelectTickets);
const ProtectedSeatMap = withAuth(SeatMap);
const ProtectedFood = withAuth(Food);
const ProtectedResumen = withAuth(ResumenCompra);
const ProtectedAdmin = withAuth(MovieList);

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<Carousel />} />
      <Route path="/movie/:id" element={<MovieInfo />} />
      <Route path="/selectTickets" element={<ProtectedSelectTickets />} />
      <Route path="/selectSeat" element={<ProtectedSeatMap />}></Route>
      <Route path="/selectFood" element={<ProtectedFood />} />
      <Route path="/purchase-summary" element={<ProtectedResumen />} />
      <Route path="/allmovies" element={<ProtectedAdmin />}></Route>
      <Route path="/allcombos" element={<ComboList />}></Route>
      <Route path="/chat" element={<MovieChat />}></Route>
    </Routes>
  );
};

export default App;