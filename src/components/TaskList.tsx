import { useEffect, useState } from "react"
import { ToDos } from "../types/types"
import '../styles/TaskList.css'

const refreshToken = async () => {
    return fetch('/api/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.json())
}

const changeStatus = async (taskId: number, status: boolean) => {
    return fetch(`/api/tasks/${taskId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({status: !status}) 
    })
    .then(data => data.json())
}

const deleteTask = async (taskId: number) => {
  return fetch(`/api/tasks/${taskId}`, {
    method: 'DELETE',
    headers: {
      'Content-Type': 'application/json'
    }
  })
  .then(data => data.json())
}

async function createTask(text: {text: string}) {
  return fetch('/api/tasks', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(text)
  })
    .then(data => data.json())
}

export default function TaskList() {
  const [status, setStatus] = useState<number>(0);
  const [statusText, setStatusText] = useState<string>('');
  const [data, setData] = useState<ToDos | undefined>();
  const [error, setError] = useState<any>();
  const [loading, setLoading] = useState<boolean>(true);

  const getAPIData = async () => {
    try {
      const apiResponse = await fetch(`/api/tasks`)

      setStatus(apiResponse.status)
      setStatusText(apiResponse.statusText)
      
      const json = await apiResponse.json()

      setData(json)
    } catch (error) {
      setError(error)
    }
    setLoading(false)
  };
  
  const handleExpiredToken = async () => {
    if (status === 401) {
        await refreshToken()
    }
  }
  
  const handleStatusChange = async (taskId: number, status: boolean) => {
    await changeStatus(taskId, status)

    const newData: any = data!.map((todo) => {
      if (todo.id === taskId) {
        const updatedItem = {
          ...todo,
          status: !status,
        };
        return updatedItem;
      }
      return todo;
    });

    setData(newData)
  }

  const handleDeleteTask = async (taskId: number) => {
    await deleteTask(taskId)

    const filtered: any = data?.filter(todo => {
      return todo.id !== taskId;
    });
    setData(filtered);
  }


  const [text, setText] = useState<string>();
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

    if (text) {
        await createTask(
            {text}
        );
    }
}

  useEffect(() => {getAPIData()}, [])
  handleExpiredToken()

  return (
  <div className="test">
    <div className="TaskForm">
    <form onSubmit={handleSubmit}>
        <label htmlFor="text">New Task: </label>
        <input name="text" id="text" onChange={e => setText(e.target.value)}></input>
        <button type="submit" value="Submit">Submit</button>
    </form>
    </div>
      <div className="box">
          {!loading ? data?.map( ( todo ) => 
          <div key={todo.id} className="list-element">
              <button className="delete-button" onClick={() => handleDeleteTask(todo.id)}>🗑️</button>
              <p className="task-status">{todo.status === false ? "❌": "✔️"}</p>
              <p className="task-text">{todo.text}</p>
              <button className="complete-button" onClick={() => handleStatusChange(todo.id, todo.status)}>{ todo.status === false ? 'Check Task' : 'Uncheck Task'}</button>
              <br/>
          </div>) : 
          <li>Loading</li>}
      </div>
      </div>
  )
}
