import { FormEvent } from "react"
import { useAuth } from "../core/auth"

function Register() {
  const { signup } = useAuth()

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const form = ev.target as EventTarget & {
      username: { value: string }
      email: { value: string }
      password: { value: string }
    }

    signup({
      username: form.username.value,
      email: form.email.value,
      password: form.password.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Username" />
      <input type="email" name="email" placeholder="Email" />
      <input type="password" name="password" placeholder="Password" />
      <button>Register</button>
    </form>
  )
}

export default Register
