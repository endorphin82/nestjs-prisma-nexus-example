import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';

import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema } from '@nexus/schema';

import { PrismaService } from '../prisma/prisma.service';
import { UsersResolver } from '../users/users.definition';

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  constructor (
    private readonly prisma: PrismaService,
    private readonly users: UsersResolver,
  ) {}

  async createGqlOptions(): Promise<GqlModuleOptions> {
    const schema = makeSchema({
      types: [...this.users.getSchema()],
      plugins: [nexusPrismaPlugin({
        experimentalCRUD: true,
        outputs: { typegen: path.join(__dirname, '../generated/nexus-prisma-typegen.ts') },
      })],
      outputs: {
        schema: path.join(__dirname, '../generated/schema.graphql'),
        typegen: path.join(__dirname, '../generated/nexus.ts'),
      },
    });

    return {
      schema,
      debug: true,
      playground: true,
      context: ({ req, res }): any => ({ req, res, prisma: this.prisma }),
    };
  }
}
