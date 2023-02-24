import { useQuery } from "@tanstack/react-query"
import request from "graphql-request"
import { graphql } from "../generated/gql"

const API_URL = "http://localhost:4000/graphql"

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

export function useTweets() {
  return useQuery({ queryKey: ["tweets"], queryFn: async () => request(API_URL, allTweets) })
}
