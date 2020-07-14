import * as path from 'path';

import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';

import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema } from '@nexus/schema';

import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../users/services/UserService';

import * as usersSchema from '../users/schema';
import context from './context';

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {}

  async createGqlOptions(): Promise<GqlModuleOptions> {
    const schema = makeSchema({
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
            source: require.resolve('./context'),
            alias: 'Context',
          },
        ],
      },
      outputs: {
        schema: path.join(__dirname, '../generated/schema.graphql'),
        typegen: path.join(__dirname, '../generated/nexus.ts'),
      },
    });

    return {
      schema,
      debug: true,
      playground: true,
      context,
    };
  }
}
