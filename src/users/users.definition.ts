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
    },
  });

  private query = extendType({
    type: 'Query',
    definition: (t) => {
        t.crud.users(); 
        t.string("hello", {
          args: { name: stringArg({ nullable: true }) },
          resolve: async (parent, { name }) => {
            const user = await this.users.getUsers();

            return JSON.stringify(user);
          },
        });
    },
  });  

  public getSchema(): any {
    return [this.userType, this.query];
  }
}
