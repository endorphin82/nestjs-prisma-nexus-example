import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { PrismaModule } from '../prisma/prisma.module';
import { UsersModule } from '../users/users.module';

import { GraphqlConfigService } from '../graphql/schema-config.service';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlConfigService,
      imports: [PrismaModule, UsersModule],
    }),
    PrismaModule,
    UsersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
