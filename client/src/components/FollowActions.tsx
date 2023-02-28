import { useAuth } from "../core/auth"
import { useFollowing, useFollowMutation, useUnfollowMutation } from "../core/users"
import { TweetsQuery } from "../generated/gql/graphql"

type Props = {
  authorName: TweetsQuery["messages"][number]["user"]["username"]
}

function FollowActions({ authorName }: Props) {
  const { user } = useAuth()
  const { data } = useFollowing()
  const followMutation = useFollowMutation()
  const unfollowMutation = useUnfollowMutation()

  const handleFollow = () => {
    followMutation.mutate({ input: { username: authorName } })
  }

  const handleUnfollow = () => {
    unfollowMutation.mutate({ input: { username: authorName } })
  }

  if (!user.username || user.username === authorName) return null

  if (data?.me.following.items.some((i) => i.username === authorName)) {
    return <button onClick={handleUnfollow}>Unfollow</button>
  }

  return <button onClick={handleFollow}>Follow</button>
}

export default FollowActions
