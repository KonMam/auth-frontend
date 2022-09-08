import { useEffect, useState } from "react"
import { ToDos } from "../types/types"
import '../styles/TaskList.css'

async function refreshToken() {
    return fetch('/api/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.json())
}

async function changeStatus(taskId: number, status: boolean) {
    return fetch(`/api/tasks/${taskId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({status: !status}) 
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
  useEffect(() => {getAPIData()}, [])

  const handleExpiredToken = async () => {
    if (status === 401) {
        await refreshToken()
    }
  }
  handleExpiredToken()

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

  return (
      <div className="TaskList">
          {!loading ? data?.map( ( todo ) => 
          <li key={todo.id} className="list-element">
              <button className="delete-button">Delete</button>
              <p>{todo.status === false ? "Status: ✘": "Status: ✓"}</p>
              <p className="task">{todo.text}</p>
              <button className="complete-button" onClick={() => handleStatusChange(todo.id, todo.status)}>Complete Task</button>
              <br/>
          </li>) : 
          <li>Loading</li>}
      </div>
  )
}
