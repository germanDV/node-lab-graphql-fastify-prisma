import { TweetsQuery } from "../generated/gql/graphql"
import FollowActions from "./FollowActions"

type Props = {
  tweet: TweetsQuery["messages"][number]
}

function Tweet({ tweet }: Props) {
  const localDateTime = new Date(+tweet.createdAt).toLocaleString()

  return (
    <div className="tweet">
      <p>{tweet.body}</p>
      <section>
        <div>
          <time dateTime={localDateTime}>{localDateTime}</time>
          <span className="author">@{tweet.user.username}</span>
        </div>
        <FollowActions authorName={tweet.user.username} />
      </section>
    </div>
  )
}

export default Tweet
