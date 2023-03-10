import { FormEvent } from "react"
import { useAuth } from "../core/auth"

function Login() {
  const { login } = useAuth()

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const form = ev.target as EventTarget & {
      username: { value: string }
      password: { value: string }
    }
    login({ usernameOrEmail: form.username.value, password: form.password.value })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Email or Username" />
      <input type="password" name="password" placeholder="Password" />
      <button>Login</button>
    </form>
  )
}

export default Login
