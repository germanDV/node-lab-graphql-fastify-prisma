# GraphQL

## Using

- TypeScript
- Node
- GraphQL
- Fastify
- Prisma (PostgreSQL)
- TypeGraphQL
- React-Query
- Subscriptions

## Postgres Docker Image

```shell
$ docker run --name node-lab-graphql -e POSTGRES_USER=postgres -e POSTGRES_PASSWORD=esonoesharinasa -e POSTGRES_DB=graphqlapp -p 5432:5432 -d postgres
```

## Dependency Versions

Due to `apollo-server-fastify` not using latest versions of fastify libraries, `fastify` has to be kept at `^3` (v4 will not work). In addition to `fastify` itself, the plugins `@fastify/jwt` and `@fastify/cookie` are also held back.

`type-graphql` does not yet support `graphql@16` (WIP according to github issues), so `graphql` is kept at `^15`.

## Init

- Have a postgres instance up (set the URI in _./server/.env_)
- Set up the database: `cd server && yarn prisma migrate dev --name init`
- Start server: `cd server && yarn && yarn dev`
- Start client: `cd client && yarn && yarn dev`
