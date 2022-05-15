import path from 'path'
import { buildSchema as buildGraphqlSchema } from 'type-graphql'
import { resolvers } from '@teilen/api/generated-types'

import customResolvers from './resolvers'

export const buildSchema = async () => {
  return await buildGraphqlSchema({
    resolvers: [...resolvers, ...customResolvers],
    emitSchemaFile: path.resolve(__dirname, './generated-schema.graphql'),
    dateScalarMode: 'timestamp',
    validate: false,
  })
}
