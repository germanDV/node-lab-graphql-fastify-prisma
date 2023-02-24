import { FormEvent } from "react"
import { useTweetMutation } from "../hooks/tweets"

function PostTweet() {
  const mutation = useTweetMutation()

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
    <form onSubmit={handleSubmit}>
      <textarea name="body" rows={10} />
      <button>Tweet</button>
    </form>
  )
}

export default PostTweet
