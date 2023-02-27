import { useTweets } from "../core/tweets"

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
    <div className="box">
      <ul>
        {data.messages.map((m) => (
          <li key={m.id}>
            <span>@{m.user.username}:</span>
            <span>{m.body}</span>
          </li>
        ))}
      </ul>
    </div>
  )
}

export default Timeline
