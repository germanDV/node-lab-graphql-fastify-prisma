import { FormEvent } from "react"
import { useTweetMutation } from "../core/tweets"
import { useAuth } from "../core/auth"

function PostTweet() {
  const mutation = useTweetMutation()
  const { user } = useAuth()

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const form = ev.target as EventTarget & { body: { value: string } }
    mutation.mutate({
      input: {
        body: form.body.value,
      },
    })
  }

  return (
    <div className="box">
      {user.id ? (
        <form onSubmit={handleSubmit}>
          <textarea name="body" rows={10} />
          <button>Tweet</button>
        </form>
      ) : (
        <div>Log in to tweet.</div>
      )}
    </div>
  )
}

export default PostTweet
