import { useEffect, useState } from "react"
import { ToDos } from "../types/types"
import '../styles/TaskList.css'
import { useNavigate } from "react-router-dom"

const refreshToken = async () => {
    return fetch('/api/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
    })
    .then(data => data.json())
}

const getData = async () => {
    return fetch('/api/tasks', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json'
        },
      })
}

const changeData = async (taskId: number, status: boolean, text: string) => {
    return fetch(`/api/tasks/${taskId}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({status: status, text: text}) 
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

export default function TaskList() {
    const [status, setStatus] = useState<number>(0);
    const [data, setData] = useState<ToDos | undefined>();
    const [error, setError] = useState<any>();
    const [loading, setLoading] = useState<boolean>(true);

    const getAPIData = async () => {
        try {
            const response = await getData()
            setStatus(response.status)
            
            const data = await response.json()
            setData(data)
        } catch (err) {
            setError(err)
            console.log(error)
        }
        setLoading(false)
    };
    
    const handleExpiredToken = async () => {
        if (status === 401) {
            await refreshToken()
            getAPIData()
        }
    }
    
    const handleStatusChange = async (taskId: number, status: boolean, text: string) => {
        await changeData(taskId, !status, text)

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

    const handleTextChange = async (taskId: number, status: boolean, text: string) => {
        await changeData(taskId, status, text)

        const newData: any = data!.map((todo) => {
            if (todo.id === taskId) {
                const updatedItem = {
                ...todo,
                text: text,
                };
                return updatedItem;
            }
            return todo;
        });

        setData(newData)
    }

    useEffect(() => {
        const loggedInUser = localStorage.getItem("user");
        if (loggedInUser) {
            getAPIData()
        }
    }, [])

    handleExpiredToken()

    return (
        <div className="box">
            {!loading ? data?.map( ( todo ) => 
            <div key={todo.id} className="list-element">
                <button 
                    id="delete-button" 
                    className="tasks-button"
                    onClick={() => handleDeleteTask(todo.id)}>
                    🗑️
                </button>
                <p className="task-status">
                    {todo.status === false ? "❌": "✔️"}
                </p>
                <textarea 
                    className="task-text" 
                    spellCheck="false"
                    defaultValue={todo.text} 
                    onBlur={e => handleTextChange(todo.id, todo.status, e.target.value)}>
                </textarea>
                <button 
                    id="complete-button" 
                    className="tasks-button"
                    onClick={() => handleStatusChange(todo.id, todo.status, todo.text)}>
                    {todo.status === false ? 'Check Task' : 'Uncheck Task'}
                </button>
                <br/>
            </div>) : 
            <div>Loading</div>}
        </div>
    )
}
