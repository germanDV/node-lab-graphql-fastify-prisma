import { AuthCtxType } from "../core/auth"

type Props = {
  user: AuthCtxType["user"]
  handleLogout: AuthCtxType["logout"]
}

function UserData({ user, handleLogout }: Props) {
  return (
    <div className="flex">
      <h2>Welcome, @{user.username}!</h2>
      <button type="button" onClick={handleLogout}>
        Log Out
      </button>
    </div>
  )
}

export default UserData
