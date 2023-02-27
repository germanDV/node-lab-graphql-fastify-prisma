import { useMutation, useQuery } from "@tanstack/react-query"
import { graphql } from "../generated/gql"
import { queryClient } from "../query_client"
import { CreateMessageMutationVariables } from "../generated/gql/graphql"
import { client } from "../graphql/client"

const allTweets = graphql(/* GraphQL */ `
  query Tweets {
    messages {
      id
      createdAt
      body
      user {
        username
      }
    }
  }
`)

const postTweet = graphql(/* GraphQL */ `
  mutation CreateMessage($input: CreateMessageInput!) {
    createMessage(input: $input) {
      id
      body
      user {
        id
        username
      }
    }
  }
`)

export function useTweets() {
  return useQuery({
    queryKey: ["tweets", "list"],
    queryFn: async () => client.request(allTweets),
  })
}

export function useTweetMutation() {
  return useMutation({
    mutationKey: ["tweets", "new"],
    mutationFn: async (input: CreateMessageMutationVariables) => client.request(postTweet, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tweets", "list"] }),
  })
}
