import { Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { AppController } from './controllers/app.controller';
import { AppService } from './app.service';
import { PrismaService } from './services/prisma.service';
import { GraphqlConfigService } from './graphql/schema-config.service';

@Module({
  imports: [
    GraphQLModule.forRootAsync({
      useClass: GraphqlConfigService,
    }),
  ],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
