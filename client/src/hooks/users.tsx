import { useMutation } from "@tanstack/react-query"
import { graphql } from "../generated/gql"
import { LoginMutationVariables } from "../generated/gql/graphql"
import { client } from "../graphql/client"

const login = graphql(/* GraphQL */ `
  mutation Login($input: LoginInput!) {
    login(input: $input)
  }
`)

export function useLoginMutation() {
  return useMutation({
    mutationKey: ["user", "login"],
    mutationFn: async (input: LoginMutationVariables) => client.request(login, input),
  })
}
