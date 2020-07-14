import * as path from 'path';

import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';

import { nexusPrismaPlugin } from 'nexus-prisma';
import { makeSchema } from '@nexus/schema';

import { IncomingMessage } from 'http';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../users/services/UserService';

import * as usersSchema from '../users/schema';

import { IUserService } from '../users/services/IUserService';
import {JWT} from '../common/auth/JWT';
import {User} from '../users/domain/User';

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

    return {
      schema,
      debug: true,
      playground: true,
      context: async ({ req, connection }: { req: IncomingMessage; connection: any }): Promise<InitialContext> => {
        const context: InitialContext = {
          request: req,
          userService: this.userService,
          user: null,
        };

        const authorization = req ? req?.headers?.authorization : connection?.context?.authorization;
        if (authorization) {
          const jwt: JWT = new JWT();
          const userId = await jwt.getUser(authorization);
          const user = await this.userService.getUser(userId);

          context.user = user;
        }

        return context;
      },
    };
  }
}

export interface InitialContext {
  request: IncomingMessage;
  userService: IUserService;
  user: User | null
  // logger: Logger
}

export interface Context extends InitialContext {
}
