import { useFetch } from "../hooks/useFetch"
import { ToDos } from "../types/types"


export default function TaskList() {

    const {loading, data} = useFetch<ToDos>('/tasks')

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
