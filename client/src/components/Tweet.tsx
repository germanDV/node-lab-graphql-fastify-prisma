import { TweetsQuery } from "../generated/gql/graphql"

type Props = {
  tweet: TweetsQuery["messages"][number]
}

function Tweet({ tweet }: Props) {
  const localDateTime = new Date(+tweet.createdAt).toLocaleString()

  return (
    <div className="tweet">
      <p>{tweet.body}</p>
      <time dateTime={localDateTime}>{localDateTime}</time>
      <span className="author">@{tweet.user.username}</span>
    </div>
  )
}

export default Tweet
