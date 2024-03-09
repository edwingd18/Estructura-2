import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import  Button from './button.jsx'
import Sidebar from './Components/Sidebar.jsx'

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <App />
    <Button />
    <Sidebar />

  </React.StrictMode>,
)
