import './App.css';

import Login from './components/Login';
import TaskList from './components/TaskList';
import { useState } from 'react';
import Register from './components/Register';


function App() {

  const [ authentication, setAuthentication ] = useState<boolean>()

  const childToParent = (childdata: boolean) => {
    setAuthentication(childdata);
  }

  if(!authentication) {
    return <Login childToParent={childToParent}/>
  }

  return (
    <TaskList/>
  )
}

export default App
