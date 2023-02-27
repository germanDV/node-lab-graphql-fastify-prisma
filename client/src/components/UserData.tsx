import { AuthCtxType } from "../hooks/auth"

type Props = {
  user: AuthCtxType["user"]
  handleLogout: AuthCtxType["logout"]
}

function UserData({ user, handleLogout }: Props) {
  return (
    <>
      <h4>@{user.username}</h4>
      <small>{user.email}</small>
      <button type="button" onClick={handleLogout}>
        Log Out
      </button>
    </>
  )
}

export default UserData
