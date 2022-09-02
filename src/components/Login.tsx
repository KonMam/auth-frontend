import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Credentials } from '../types/types'

async function loginUser(credentials: Credentials) {
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function Login() {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const navigate = useNavigate()
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email && password) {
            await loginUser({
                email,
                password
            });
            navigate("/tasks")
        }
    }

    return (
        <div className="Login">
            <h1>Login:</h1>
            <form onSubmit={handleSubmit}>
                <label htmlFor="email" >Email</label>
                <input name="email" id="email" onChange={e => setEmail(e.target.value)}></input>
                <label htmlFor="password">Password</label>
                <input name="password" id="password" onChange={e => setPassword(e.target.value)}></input>
                <button type="submit" value="Submit">Submit</button>
            </form>
        </div>
    )
}
