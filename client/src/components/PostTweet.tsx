import { FormEvent, useRef } from "react"
import { useTweetMutation } from "../core/tweets"
import { useAuth } from "../core/auth"

function PostTweet() {
  const mutation = useTweetMutation()
  const { user } = useAuth()
  const formRef = useRef<HTMLFormElement>(null)

  if (mutation.isSuccess) {
    formRef.current?.reset()
  }

  const handleSubmit = (ev: FormEvent<HTMLFormElement>) => {
    ev.preventDefault()
    const form = ev.target as EventTarget & { body: { value: string } } & { reset: () => void }
    mutation.mutate({
      input: {
        body: form.body.value,
      },
    })
  }

  return (
    <div>
      {user.id ? (
        <form ref={formRef} onSubmit={handleSubmit} className="post-tweet">
          <textarea name="body" rows={6} placeholder="Have something to share?" />
          <button type="submit">Tweet</button>
        </form>
      ) : (
        <div style={{ textAlign: "center" }}>Log in to tweet.</div>
      )}
    </div>
  )
}

export default PostTweet
