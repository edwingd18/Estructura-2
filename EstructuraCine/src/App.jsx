import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Login from '../Login/Login';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Carousel from './Components/Carousel/Carousel';
import Sidebar from './Components/Sidebar/Sidebar';

function App() {
  const [count, setCount] = useState(0)

  return (
    <Router>
      <div>
        <a href="https://vitejs.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      <h1>Vite + React</h1>
      <Sidebar />
        <Routes>
          <Route path='/' element= { <Carousel /> }></Route>
          <Route path='/login' element= { <Login /> }></Route>
        </Routes>
          <div className="card">
            <button onClick={() => setCount((count) => count + 1)}>
              count is {count}
            </button>
            <p>
              Edit <code>src/App.jsx</code> and save to test HMR
            </p>
          </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </Router>
  );
}

export default App;
