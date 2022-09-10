import './App.css';

import Login from './components/Login';
import Register from './components/Register';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";
import Board from './components/Board';


function App() {


  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/tasks" element={<Board />}></Route>
        </Routes>
      </BrowserRouter>
    </div>
)};

export default App
