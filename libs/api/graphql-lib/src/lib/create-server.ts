import { ApolloError, ApolloServer } from 'apollo-server-express'
import { ApolloServerPluginLandingPageGraphQLPlayground } from 'apollo-server-core'
import { GraphQLSchema } from 'graphql'

import { getPrismaClient } from './prisma-client'
import { Context } from '../types'

export const createServer = (schema: GraphQLSchema) => {
  const prisma = getPrismaClient()

  return new ApolloServer({
    schema,
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    context: ({ req }: any): Context => {
      if (!req.user) throw new ApolloError('User not authenticated', 'UNAUTHORIZED')
      return {
        user: req.user,
        prisma,
      }
    },
    plugins: [
      ApolloServerPluginLandingPageGraphQLPlayground({
        settings: { 'request.credentials': 'same-origin' },
      }),
    ],
  })
}
