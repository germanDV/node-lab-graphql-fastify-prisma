import { config } from "../config"
import { GraphQLClient } from "graphql-request"

export const client = new GraphQLClient(config.API_URL, { credentials: "include" })
