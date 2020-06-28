import { Injectable } from '@nestjs/common';
import { objectType, extendType, stringArg } from '@nexus/schema';
import { UsersService } from './users.service';

@Injectable()
export class UsersResolver {

  constructor(
    private readonly users: UsersService,
  ) {}

  private userType = objectType({
    name: 'User',
    definition(t) {
      t.model.id();
      t.model.email();
      t.model.name();
    },
  });

  private query = extendType({
    type: 'Query',
    definition: (t) => {
      t.field('users', {
        type: 'User',
        list: true,
        args: { name: stringArg({ nullable: true }) },
        resolve: async (parent, { name }) => {
          const users = await this.users.getUsers({ name });

          return users;
        },
      });
    },
  });

  public getSchema(): any {
    return [this.userType, this.query];
  }
}
