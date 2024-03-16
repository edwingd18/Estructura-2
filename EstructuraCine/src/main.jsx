import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import LoginForm from "./Components/Login/LoginForm.jsx";
import Sidebar from "./Components/Sidebar/Sidebar.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <LoginForm />
    <Sidebar />
  </React.StrictMode>
);
