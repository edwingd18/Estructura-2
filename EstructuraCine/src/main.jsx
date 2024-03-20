import React from "react";
import ReactDOM from "react-dom";
import "./index.css";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";
import App from "./App.jsx";
import { BrowserRouter } from "react-router-dom";
import SelectTicket from './Components/SelectTickets - Part one/SelectTickets.jsx'

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Sidebar />
    <BrowserRouter>
      <App />
    </BrowserRouter>
  </React.StrictMode>
);
