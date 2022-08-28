import { useFetch } from "../hooks/useFetch"
import { Users } from "../types/types"


export default function TaskList() {

    const {loading, data} = useFetch<Users>('/db-test')

    return (
        <div className="Login">
            <ul>
            {!loading ? 
                data?.map( ( user ) => 
            <li key={user.id}>
              {user.id}. Name: {user.email} Email: {user.password}
            </li>) : 
            <li>Loading</li>
        }
            </ul>
        </div>
    )
}
