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
      .then(data => data.json())
   }


export default function Register() {

    const [username, setUsername] = useState<string>();
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    const navigate = useNavigate()
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (username && email && password) {
            await registerUser({
                username,
                email,
                password
            });

            navigate("/login")
        }

    }

    return (
        <div className="register-form">
            <hr className='line'></hr>
            <h2 className='header'>Register</h2>
            <form onSubmit={handleSubmit} className='register-details'>
                <input name="username" id="username" className="form-element" placeholder="Username" onChange={e => setUsername(e.target.value)}></input>
                <input name="email" id="email" className="form-element" placeholder="Email" onChange={e => setEmail(e.target.value)}></input>
                <input name="password" id="password" className="form-element" placeholder="Password" type="password" onChange={e => setPassword(e.target.value)}></input>
                <button type="submit" value="Submit" id="button" className="form-element">Submit</button>
            </form>
        </div>
    )
}