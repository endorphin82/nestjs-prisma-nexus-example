import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';

import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema, queryType, stringArg, objectType } from '@nexus/schema';

import { PrismaService } from '../services/prisma.service';

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  constructor (
    private readonly prisma: PrismaService,
  ) {}
  async createGqlOptions(): Promise<GqlModuleOptions> {

    const User = objectType({
      name: 'User',
      definition(t) {
        t.id('id');
      }
    })
    const Query = queryType({
      definition(t) {
        t.crud.users();
        t.string("hello", {
          args: { name: stringArg({ nullable: true }) },
          resolve: (parent, { name }) => `Hello ${name || "World"}!`,
        });
      },
    });
    
    const schema = makeSchema({
      types: [Query, User],
      plugins: [nexusPrismaPlugin({
        experimentalCRUD: true,
        outputs: {
          typegen: path.join(__dirname, "../generated/nexus-prisma-typegen.ts"), 
        }
      })],
      outputs: {
        schema: path.join(__dirname, '../generated/schema.graphql'),
        typegen: path.join(__dirname, '../generated/nexus.ts'),
      },
    });

    return {
      debug: true,
      playground: true,
      schema,
      context: ({ req, res }): any => ({ req, res, prisma: this.prisma }),
    };
  }
}