import * as path from 'path';

import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema } from '@nexus/schema';

import * as usersSchema from '../users/schema';

export const schema = makeSchema({
  types: { ...usersSchema },
  plugins: [nexusPrismaPlugin({
    experimentalCRUD: true,
    outputs: { typegen: path.join(__dirname, '../generated/nexus-prisma-typegen.ts') },
  })],
  typegenAutoConfig: {
    contextType: 'Context.Context',
    sources: [
      {
        source: '@prisma/client',
        alias: 'prismaClient',
      },
      {
        source: path.join(__dirname, 'schema-config.service.ts'),
        alias: 'Context',
      },
    ],
  },
  outputs: {
    schema: path.join(__dirname, '../generated/schema.graphql'),
    typegen: path.join(__dirname, '../generated/nexus.ts'),
  },
});
