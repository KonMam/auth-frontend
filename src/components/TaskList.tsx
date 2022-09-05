import { useState } from "react"
import { useFetch } from "../hooks/useFetch"
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

    const {loading, data, status} = useFetch<ToDos>('/tasks')

    const handleExpired = async () => {
        if (status === 401) {
            await refreshToken()
        }
    }
    handleExpired()

    const [text, setText] = useState<string>();

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {

        if (text) {
            await createTask(
                {text}
            );
        }
    }
    return (
        <div>
            <div className="TaskForm">
            <form onSubmit={handleSubmit}>
                <label htmlFor="text">New Task: </label>
                <input name="text" id="text" onChange={e => setText(e.target.value)}></input>
                <button type="submit" value="Submit">Submit</button>
            </form>
            </div>
            <div className="TaskList">
                {!loading ? 
                    data?.map( ( todo ) => 
                <li key={todo.id} className="list-element">
                {todo.text} <br/>{todo.status === false ? "Status: ✘": "Status: ✓"}
                </li>) : 
                <li>Loading</li>}
            </div>
        </div>
    )
}
