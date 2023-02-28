import { useState } from "react"
import Login from "./Login"
import Register from "./Register"

type Options = "login" | "signup" | null

function LoginOrSignup() {
  const [show, setShow] = useState<Options>(null)

  switch (show) {
    case "login":
      return (
        <div className="flex">
          <Login />
          <i onClick={() => setShow(null)} style={{ cursor: "pointer", marginLeft: 4 }}>
            &larr;
          </i>
        </div>
      )
    case "signup":
      return (
        <div className="flex">
          <Register />
          <i onClick={() => setShow(null)} style={{ cursor: "pointer", marginLeft: 4 }}>
            &larr;
          </i>
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
