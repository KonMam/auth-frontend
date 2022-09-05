import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Credentials } from '../types/types'
import '../styles/Login.css'

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
        <div className="login-form">
            <hr className='line'></hr>
            <h2 className='header'>Login</h2>
            <form onSubmit={handleSubmit} className='login-details'>
                <input name="email" id="email" className="form-element" placeholder="Email" onChange={e => setEmail(e.target.value)}></input>
                <input name="password" id="password" className="form-element" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)}></input>
                <button type="submit" value="Submit" id="button" className="form-element">Submit</button>
            </form>
        </div>
    )
}
