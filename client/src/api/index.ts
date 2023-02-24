export async function getTweets() {
  const q = {
    query: `query Tweets {
      messages {
        id
        createdAt
        body
        user {
          username
        }
      }
    }`,
  }

  return fetch("http://localhost:4000/graphql", {
    method: "POST",
    credentials: "include",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(q),
  }).then((resp) => resp.json())
}
