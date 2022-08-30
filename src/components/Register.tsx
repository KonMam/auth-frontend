import { useState } from "react";
import { Credentials } from '../types/types'

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


export default function Register({childToParent}  : {childToParent:any}) {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email && password) {
            await registerUser({
                email,
                password
            });

            childToParent(true)
        }
    }

    return (
        <div className="Register">
            <h1>Register:</h1>
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