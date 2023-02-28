import UserAuth from "./UserAuth"

function NavBar() {
  return (
    <nav>
      <div>
        <h1>Partial&lt;Twitter&gt;</h1>
      </div>
      <div>
        <UserAuth />
      </div>
    </nav>
  )
}

export default NavBar
