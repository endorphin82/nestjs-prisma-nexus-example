import { objectType } from '@nexus/schema';
import { NexusObjectTypeDef } from '@nexus/schema/dist/core';

export * from './query';

export const User = (): NexusObjectTypeDef<'User'> => {
  return objectType({
    name: 'User',
    definition(t) {
      t.model.id();
    },
  });
};
