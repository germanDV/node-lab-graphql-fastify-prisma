import { useState } from "react"
import Login from "./Login"
import Register from "./Register"

type Options = "login" | "signup" | null

function LoginOrSignup() {
  const [show, setShow] = useState<Options>(null)

  switch (show) {
    case "login":
      return (
        <div>
          <Login />
          <button onClick={() => setShow(null)}>&larr;</button>
        </div>
      )
    case "signup":
      return (
        <div>
          <Register />
          <button onClick={() => setShow(null)}>&larr;</button>
        </div>
      )
    default:
      return (
        <div>
          <button onClick={() => setShow("login")}>Login</button> or{" "}
          <button onClick={() => setShow("signup")}>Register</button>
        </div>
      )
  }
}

export default LoginOrSignup
