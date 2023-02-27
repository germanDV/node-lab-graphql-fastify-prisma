import UserAuth from "./components/UserAuth"
import Timeline from "./components/Timeline"
import PostTweet from "./components/PostTweet"

function App() {
  return (
    <div>
      <h1>`Partial&lt;Twitter&gt;`</h1>
      <UserAuth />
      <PostTweet />
      <Timeline />
    </div>
  )
}

export default App
