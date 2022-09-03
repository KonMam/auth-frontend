import { useFetch } from "../hooks/useFetch"
import { ToDos } from "../types/types"


async function refreshToken() {
    return fetch('/api/refresh', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      }
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

    return (
        <div className="TaskList">
            {!loading ? 
                data?.map( ( todo ) => 
            <li key={todo.id}>
              {todo.text}, status: {todo.status.toString()}
            </li>) : 
            <li>Loading</li>}
        </div>
    )
}
