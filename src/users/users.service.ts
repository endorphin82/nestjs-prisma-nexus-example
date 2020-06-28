import { Injectable } from '@nestjs/common';

import { PrismaService } from '../prisma/prisma.service';
import { User } from '@prisma/client';

@Injectable()
export class UsersService {

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  async getUsers({ name }: GetUsersArgs): Promise<User[]> {
    const users = await this.prisma.user.findMany({ where: { name } });

    return users;
  }

}

interface GetUsersArgs {
  name: string;
}
