import { Injectable } from '@nestjs/common';
import { GqlOptionsFactory, GqlModuleOptions } from '@nestjs/graphql';

import { IncomingMessage } from 'http';
import { PrismaService } from '../prisma/prisma.service';
import { UserService } from '../users/services/UserService';

import { IUserService } from '../users/services/IUserService';
import { JWT } from '../common/auth/JWT';
import { User } from '../users/domain/User';
import { schema } from './schema-config';

@Injectable()
export class GraphqlConfigService implements GqlOptionsFactory {
  constructor(
    private readonly prisma: PrismaService,
    private readonly userService: UserService,
  ) {
  }

  async createGqlOptions(): Promise<GqlModuleOptions> {
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
