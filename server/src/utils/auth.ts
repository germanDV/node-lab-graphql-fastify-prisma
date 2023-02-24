import { AuthChecker } from "type-graphql"
import { Context } from "./create_server"

export const bearerAuthChecker: AuthChecker<Context> = ({ context }) => !!context.user
