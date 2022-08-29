import { useState } from 'react';

interface credentials {
    email: string
    password: string
}

async function loginUser(credentials: credentials) {
    return fetch('/api/login', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(credentials)
    })
      .then(data => data.json())
   }

export default function Login({childToParent}  : {childToParent:any}) {

    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();
    
    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        if (email && password) {
            const token = await loginUser({
                email,
                password
              });

              childToParent(token)
        }
    }

    return (
        <div className="Login">
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
