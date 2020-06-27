import * as path from 'path';
import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';

import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema } from '@nexus/schema';

import { PrismaService } from '../services/prisma.service';

import * as types from './types';

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  constructor (
    private readonly prisma: PrismaService,
  ) {}

  async createGqlOptions(): Promise<GqlModuleOptions> {

    const schema = makeSchema({
      types: [Object.values(types).map(item => item(this.prisma))],
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