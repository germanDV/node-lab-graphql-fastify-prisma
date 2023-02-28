import { SubscriptionClient } from "subscriptions-transport-ws"
import { config } from "../config"
import { TweetsQuery } from "../generated/gql/graphql"
import { queryClient } from "../query_client"

const wsClient = new SubscriptionClient(config.WS_API_URL, {
    reconnect: true,
})

const newTweetSubscription = `
  subscription NewTweet {
    newMessage {
      id
      createdAt
      body
      user {
        username
      }
    }
  }
`

wsClient.request({ query: newTweetSubscription }).subscribe({
    next({ data }) {
        if (data?.newMessage) {
            queryClient.setQueryData(["tweets", "list"], (prevData) => {
                return {
                    messages: [data.newMessage, ...(prevData as TweetsQuery).messages],
                }
            })
        }
    },
})

wsClient.onError((err) => console.log("WS Error: ", err))
