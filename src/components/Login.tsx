function Login() {

  return (
    <div className="Login">
      <form >
        <label htmlFor="email">Email</label>
        <input name="email"></input>
        <label htmlFor="password">Password</label>
        <input name="password"></input>
        <button type="submit" value="Submit">Submit</button>
      </form>
    </div>
  )
}

export default Login
