import { Injectable } from '@nestjs/common';

import { PrismaService } from '../services/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getUsers(): Promise<User[]> {
    const users = await this.prisma.user.findMany();

    return users;
  }

}
