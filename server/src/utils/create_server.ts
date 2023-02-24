import { ApolloServerPluginDrainHttpServer } from "apollo-server-core"
import { ApolloServer } from "apollo-server-fastify"
import { ApolloServerPlugin } from "apollo-server-plugin-base"
import fastify, { FastifyInstance, FastifyReply, FastifyRequest } from "fastify"
import fastifyCors from "@fastify/cors"
import fastifyCookie from "@fastify/cookie"
import fastifyJwt from "@fastify/jwt"
import { GraphQLSchema, execute, subscribe } from "graphql"
import { SubscriptionServer } from "subscriptions-transport-ws"
import { buildSchema } from "type-graphql"
import UserResolver from "../modules/user/user_resolver"
import { User } from "@prisma/client"
import { bearerAuthChecker } from "./auth"
import MessageResolver from "../modules/message/message_resolver"

const app = fastify({ logger: true })

app.register(fastifyCors, {
  credentials: true,
  origin: (origin, cb) => {
    if (
      !origin ||
      [
        "http://localhost:5173",
        "http://localhost:3000",
        "https://studio.apollographql.com",
      ].includes(origin)
    ) {
      return cb(null, true)
    }
    return cb(new Error("Not allowed"), false)
  },
})

app.register(fastifyCookie)

app.register(fastifyJwt, {
  secret: "change-me",
  cookie: {
    cookieName: "token",
    signed: false,
  },
})

/** Stop Fastify app when Apollo server is stopped. */
function fastifyAppClosePlugin(app: FastifyInstance): ApolloServerPlugin {
  return {
    async serverWillStart() {
      return {
        async drainServer() {
          await app.close()
        },
      }
    },
  }
}

type CtxUser = Omit<User, "password">

async function buildContext({
  request,
  reply,
  conn,
}: {
  request?: FastifyRequest
  reply?: FastifyReply
  conn?: { Authorization: string }
}) {
  // Handle WebSocket connection
  if (conn || !request) {
    try {
      const user = app.jwt.verify<CtxUser>(conn?.Authorization || "")
      return { user }
    } catch {
      return { user: null }
    }
  }

  try {
    const user = await request?.jwtVerify<CtxUser>()
    return { request, reply, user }
  } catch {
    return { request, reply, user: null }
  }
}

export type Context = Awaited<ReturnType<typeof buildContext>>

export async function createServer() {
  const schema = await buildSchema({
    resolvers: [UserResolver, MessageResolver],
    authChecker: bearerAuthChecker,
  })

  const server = new ApolloServer({
    schema,
    plugins: [
      fastifyAppClosePlugin(app),
      ApolloServerPluginDrainHttpServer({ httpServer: app.server }),
    ],
    context: buildContext,
  })

  subscriptionServer({ schema, server: app.server })
  return { app, server }
}

function subscriptionServer({
  schema,
  server,
}: {
  schema: GraphQLSchema
  server: FastifyInstance["server"]
}) {
  return SubscriptionServer.create(
    {
      schema,
      execute,
      subscribe,
      async onConnect(conn: { Authorization: string }) {
        return buildContext({ conn })
      },
    },
    {
      server,
      path: "/graphql",
    }
  )
}
