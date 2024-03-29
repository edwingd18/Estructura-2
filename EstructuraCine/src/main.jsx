import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import SeatMap from "./Components/SeatSelection/SeatMap.jsx";
import Food from "./Components/SelectFood/Food.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <Sidebar />
      <App />
      {/* <SeatMap /> */}
      {/* <Food /> */}
    </BrowserRouter>
  </React.StrictMode>
);
