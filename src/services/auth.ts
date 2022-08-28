
export const userLogin = async (event: React.FormEvent<HTMLFormElement>) => {

    event.preventDefault()

    const email: string = (<HTMLInputElement>document.getElementById('email')).value
    const password: string = (<HTMLInputElement>document.getElementById('password')).value

    const body = JSON.stringify({
        email: email,
        password: password
    })

    const response = await fetch('/api/login', {
      method: 'POST',
      credentials: 'same-origin',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json'
      },
      body: body
    })

    return await response.json()
}