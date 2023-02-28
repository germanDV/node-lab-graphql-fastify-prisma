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
    <div>
      {user.id ? (
        <form onSubmit={handleSubmit} className="post-tweet">
          <textarea name="body" rows={6} placeholder="Have something to share?" />
          <button>Tweet</button>
        </form>
      ) : (
        <div style={{ textAlign: "center" }}>Log in to tweet.</div>
      )}
    </div>
  )
}

export default PostTweet
