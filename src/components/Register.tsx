import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { Credentials } from '../types/types'
import '../styles/Register.css'

async function registerUser(credentials: Credentials) {
    return fetch('/api/signup', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
   }


export default function Register() {

    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    const [responseStatus, setResponseStatus] = useState<number>(0)
    
    const navigate = useNavigate()
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (username && email && password) {
            const response = await registerUser({
                username,
                email,
                password
            });

            setResponseStatus(response.status)
            
            const data = await response.json()

            if (responseStatus === 401) {
                alert('Bad inputs!')
            }
            
            if (responseStatus === 200) {
                localStorage.setItem('user', data)
                navigate("/tasks")
            }
        }
    }

    return (
        <div className="register-box">
            <form onSubmit={handleSubmit} className='register-form'>
                <h2 
                    id='register-heading' 
                    className="register-form-element">
                    Register
                </h2>
                <input 
                    name="username" 
                    id="register-username" 
                    className="register-form-element" 
                    placeholder="Username" 
                    onChange={e => setUsername(e.target.value)}>
                </input>
                <input 
                    name="email" 
                    id="register-email" 
                    className="register-form-element" 
                    placeholder="Email" 
                    onChange={e => setEmail(e.target.value)}>
                </input>
                <input 
                    name="password" 
                    id="register-password" 
                    className="register-form-element" 
                    placeholder="Password" 
                    type="password" 
                    onChange={e => setPassword(e.target.value)}>
                </input>
                <div className='login-buttons'>
                <button 
                    value="Sign-Up" 
                    id="reg-login-button" 
                    className="login-form-button"
                    onClick={() => navigate('/login')}>
                    Login
                </button>
                <button 
                    type="submit" 
                    value="Submit" 
                    id="reg-reg-button" 
                    className="login-form-button">
                    Submit
                </button>
                </div>
            </form>
        </div>
    )
}