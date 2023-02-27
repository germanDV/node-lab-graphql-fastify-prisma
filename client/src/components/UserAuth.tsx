import { useAuth } from "../core/auth"
import UserData from "./UserData"
import LoginOrSignup from "./LoginOrSignup"

function UserAuth() {
  const { user, logout } = useAuth()

  return (
    <div className="box">
      {user.id ? <UserData user={user} handleLogout={logout} /> : <LoginOrSignup />}
    </div>
  )
}

export default UserAuth
