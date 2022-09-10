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

    useEffect(() => {getAPIData()}, [])
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
