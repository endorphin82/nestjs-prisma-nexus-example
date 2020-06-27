import * as Typegen from 'nexus-prisma/typegen'
import * as Prisma from '@prisma/client';

// Pagination type
type Pagination = {
  first?: boolean
  last?: boolean
  before?: boolean
  after?: boolean
}

// Prisma custom scalar names
type CustomScalars = 'DateTime'

// Prisma model type definitions
interface PrismaModels {
  User: Prisma.User
  Account: Prisma.Account
  Transaction: Prisma.Transaction
}

// Prisma input types metadata
interface NexusPrismaInputs {
  Query: {
    users: {
      filtering: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'accounts' | 'email' | 'password' | 'AND' | 'OR' | 'NOT'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'email' | 'password'
    }
    accounts: {
      filtering: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'currency' | 'balance' | 'userId' | 'transactions' | 'AND' | 'OR' | 'NOT' | 'user'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'currency' | 'balance' | 'userId'
    }
    transactions: {
      filtering: 'id' | 'createdAt' | 'updatedAt' | 'amount' | 'accountId' | 'AND' | 'OR' | 'NOT' | 'account'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'amount' | 'accountId'
    }
  },
  User: {
    accounts: {
      filtering: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'currency' | 'balance' | 'userId' | 'transactions' | 'AND' | 'OR' | 'NOT' | 'user'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'name' | 'currency' | 'balance' | 'userId'
    }
  }
  Account: {
    transactions: {
      filtering: 'id' | 'createdAt' | 'updatedAt' | 'amount' | 'accountId' | 'AND' | 'OR' | 'NOT' | 'account'
      ordering: 'id' | 'createdAt' | 'updatedAt' | 'amount' | 'accountId'
    }
  }
  Transaction: {

  }
}

// Prisma output types metadata
interface NexusPrismaOutputs {
  Query: {
    user: 'User'
    users: 'User'
    account: 'Account'
    accounts: 'Account'
    transaction: 'Transaction'
    transactions: 'Transaction'
  },
  Mutation: {
    createOneUser: 'User'
    updateOneUser: 'User'
    updateManyUser: 'BatchPayload'
    deleteOneUser: 'User'
    deleteManyUser: 'BatchPayload'
    upsertOneUser: 'User'
    createOneAccount: 'Account'
    updateOneAccount: 'Account'
    updateManyAccount: 'BatchPayload'
    deleteOneAccount: 'Account'
    deleteManyAccount: 'BatchPayload'
    upsertOneAccount: 'Account'
    createOneTransaction: 'Transaction'
    updateOneTransaction: 'Transaction'
    updateManyTransaction: 'BatchPayload'
    deleteOneTransaction: 'Transaction'
    deleteManyTransaction: 'BatchPayload'
    upsertOneTransaction: 'Transaction'
  },
  User: {
    id: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    name: 'String'
    accounts: 'Account'
    email: 'String'
    password: 'String'
    roles: 'UserRole'
  }
  Account: {
    id: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    name: 'String'
    currency: 'Currency'
    balance: 'Float'
    user: 'User'
    userId: 'String'
    transactions: 'Transaction'
  }
  Transaction: {
    id: 'String'
    createdAt: 'DateTime'
    updatedAt: 'DateTime'
    amount: 'Float'
    account: 'Account'
    accountId: 'String'
  }
}

// Helper to gather all methods relative to a model
interface NexusPrismaMethods {
  User: Typegen.NexusPrismaFields<'User'>
  Account: Typegen.NexusPrismaFields<'Account'>
  Transaction: Typegen.NexusPrismaFields<'Transaction'>
  Query: Typegen.NexusPrismaFields<'Query'>
  Mutation: Typegen.NexusPrismaFields<'Mutation'>
}

interface NexusPrismaGenTypes {
  inputs: NexusPrismaInputs
  outputs: NexusPrismaOutputs
  methods: NexusPrismaMethods
  models: PrismaModels
  pagination: Pagination
  scalars: CustomScalars
}

declare global {
  interface NexusPrismaGen extends NexusPrismaGenTypes {}

  type NexusPrisma<
    TypeName extends string,
    ModelOrCrud extends 'model' | 'crud'
  > = Typegen.GetNexusPrisma<TypeName, ModelOrCrud>;
}
  