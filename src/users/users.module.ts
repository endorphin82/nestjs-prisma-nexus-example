import { PrismaModule }from '../modules/prisma.module';
import { UsersResolver } from './users.definition';
import { UsersService } from './users.service';
import { Module } from '@nestjs/common';

@Module({
  imports: [PrismaModule],
  providers: [UsersResolver, UsersService],
  exports: [UsersResolver, UsersService],
})
export class UsersModule { }
