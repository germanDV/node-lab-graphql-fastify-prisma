import { useTweets } from "../core/tweets"
import Tweet from "./Tweet"

function Timeline() {
  const { data, error, isLoading, isSuccess } = useTweets()

  if (isLoading) {
    return <p>loading tweets...</p>
  }
  if (error) {
    return <p>error loading tweets.</p>
  }
  if (!isSuccess) {
    return <p>No error but no success??</p>
  }

  return (
    <div className="timeline">
      {data.messages.map((m) => (
        <Tweet key={m.id} tweet={m} />
      ))}
    </div>
  )
}

export default Timeline
