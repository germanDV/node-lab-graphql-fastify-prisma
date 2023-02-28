import { useQuery, useMutation } from "@tanstack/react-query"
import { queryClient } from "../query_client"
import { graphql } from "../generated/gql"
import { client } from "../graphql/client"
import { FollowUserMutationVariables } from "../generated/gql/graphql"

const following = graphql(/* GraphQL */ `
  query Following {
    me {
      following {
        items {
          id
          username
        }
      }
    }
  }
`)

export function useFollowing() {
  return useQuery({
    queryKey: ["user", "following"],
    queryFn: async () => client.request(following),
  })
}

const follow = graphql(/* GraphQL */ `
  mutation FollowUser($input: FollowUserInput!) {
    followUser(input: $input) {
      following {
        count
        items {
          username
        }
      }
    }
  }
`)

export function useFollowMutation() {
  return useMutation({
    mutationKey: ["user", "following", "add"],
    mutationFn: async (input: FollowUserMutationVariables) => client.request(follow, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user", "following"] }),
  })
}

const unfollow = graphql(/* GraphQL */ `
  mutation UnfollowUser($input: FollowUserInput!) {
    unfollowUser(input: $input) {
      following {
        count
        items {
          username
        }
      }
    }
  }
`)

export function useUnfollowMutation() {
  return useMutation({
    mutationKey: ["user", "following", "remove"],
    mutationFn: async (input: FollowUserMutationVariables) => client.request(unfollow, input),
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["user", "following"] }),
  })
}
