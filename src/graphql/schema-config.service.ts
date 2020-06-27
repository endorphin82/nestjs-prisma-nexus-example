import * as path from 'path';

import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';

import { makeSchema, queryType, stringArg } from '@nexus/schema';

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  async createGqlOptions(): Promise<GqlModuleOptions> {

    const Query = queryType({
      definition(t) {
        t.string("hello", {
          args: { name: stringArg({ nullable: true }) },
          resolve: (parent, { name }) => `Hello ${name || "World"}!`,
        });
      },
    });
    
    const schema = makeSchema({
      types: [Query],
      outputs: {
        schema: __dirname + "/generated/schema.graphql",
        typegen: __dirname + "/generated/typings.ts",
      },
    });

    return {
      debug: true,
      playground: true,
      schema,
    };
  }
}