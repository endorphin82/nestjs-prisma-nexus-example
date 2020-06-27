import { extendType, stringArg } from '@nexus/schema';
import { NexusExtendTypeDef } from '@nexus/schema/dist/core';
import { PrismaClient } from '@prisma/client';

export const UserQuery = (prisma: PrismaClient): NexusExtendTypeDef<'Query'> => {
  return extendType({
    type: 'Query',
    definition: (t) => {
        t.crud.users(); 
        t.string("hello", {
          args: { name: stringArg({ nullable: true }) },
          resolve: async (parent, { name }) => {
            const user = await prisma.user.create({ data: { name } });

            return JSON.stringify(user);
          },
        });
    },
  });  
};
