import './App.css';

import Login from './components/Login';
import TaskList from './components/TaskList';
import { useState } from 'react';


function App() {

  const [ token, setToken ] = useState<string>()

  const childToParent = (childdata: string) => {
    setToken(childdata);
  }

  if(!token) {
    return <Login childToParent={childToParent}/>
  }

  return (
    <TaskList/>
  )
}

export default App
