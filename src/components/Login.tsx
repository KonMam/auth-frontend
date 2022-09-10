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
   }

export default function Login() {

    const navigate = useNavigate()

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const [responseStatus, setResponseStatus] = useState<number>(0)
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email && password) {
            const response = await loginUser({
                email,
                password
            });
            const data = await response.json()

            setResponseStatus(response.status)
            if (responseStatus === 401) {
                navigate('/login')
            }
            
            if (responseStatus === 200) {
                localStorage.setItem('user', data)
                navigate("/tasks")
            }
        }
    }

    return (
        <div className='login-box'>
            <form onSubmit={handleSubmit} className='login-form'>
                <h2 
                    id='login-heading' 
                    className="login-form-element">
                    Login
                </h2>
                <input 
                    name="email" 
                    id="email" 
                    className="login-form-element" 
                    placeholder="Email" 
                    onChange={e => setEmail(e.target.value)}>
                </input>
                <input 
                    name="password" 
                    id="password" 
                    className="login-form-element" 
                    placeholder="Password" 
                    type="password" 
                    onChange={e => setPassword(e.target.value)}>
                </input>
                <button 
                    type="submit" 
                    value="Submit" 
                    id="login-button" 
                    className="login-form-button">
                    Submit
                </button>
            </form>
        </div>
    )
}
