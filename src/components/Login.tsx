import { userLogin } from "../services/auth";

export default function Login() {

    return (
        <div className="Login">
            <form onSubmit={userLogin}>
                <label htmlFor="email">Email</label>
                <input name="email" id="email"></input>
                <label htmlFor="password">Password</label>
                <input name="password" id="password"></input>
                <button type="submit" value="Submit">Submit</button>
            </form>
        </div>
    )
}
