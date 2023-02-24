import { FormEvent } from "react"
import { useLoginMutation } from "../hooks/users"

function Login() {
  const mutation = useLoginMutation()

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()

    const form = ev.target as EventTarget & {
      username: { value: string }
      password: { value: string }
    }

    mutation.mutate({
      input: {
        usernameOrEmail: form.username.value,
        password: form.password.value,
      },
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <input type="text" name="username" placeholder="Email or Username" value="bob" />
      <input type="password" name="password" placeholder="Password" value="come_on_bob_1234" />
      <button>Login</button>
    </form>
  )
}

export default Login
