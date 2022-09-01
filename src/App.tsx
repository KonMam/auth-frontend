import './App.css';

import Login from './components/Login';
import TaskList from './components/TaskList';
import { useState } from 'react';
import Register from './components/Register';

import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";


function App() {

  const [ authentication, setAuthentication ] = useState<boolean>()

  const childToParent = (childdata: boolean) => {
    setAuthentication(childdata);
  }

  if(authentication) {
    return (
    <BrowserRouter>
        <Routes>
          <Route path="/tasks" element={<TaskList/>}></Route>
        </Routes>
    </BrowserRouter>
  )};

  return (
    <div className='App'>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<h1>Home</h1>}></Route>
          <Route path="/login" element={<Login childToParent={childToParent}/>}></Route>
          <Route path="/register" element={<Register childToParent={childToParent}/>}></Route>
        </Routes>
      </BrowserRouter>
    </div>
)};

export default App
