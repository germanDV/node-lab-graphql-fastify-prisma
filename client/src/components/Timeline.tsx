import { useTweets } from "../hooks/tweets"

function Timeline() {
  const { data, error, isLoading } = useTweets()

  if (isLoading) {
    return <p>loading tweets...</p>
  }

  if (error) {
    return <p>error loading tweets.</p>
  }

  return (
    <div>
      <pre>{JSON.stringify(data, null, 2)}</pre>
    </div>
  )
}

export default Timeline
