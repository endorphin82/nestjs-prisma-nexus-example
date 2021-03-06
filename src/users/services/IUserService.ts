import { User } from '../domain/User';
import { AuthPayload } from '../domain/AuthPayload';
import { UserRole } from '../domain/UserRole';

export interface IUserService {
  signUpUser(data: SignUpUserInterface): Promise<AuthPayload>;
  signInUser(data: SignInUserInterface): Promise<AuthPayload>;
  createUser(data: CreateUserInterface): Promise<User>;
  getUsers(): Promise<User[]>;
  getUser(id: string): Promise<User>;
}

export interface CreateUserInterface {
  email: string;
  password: string;
  middleName?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  roles: UserRole[];
}

export interface SignUpUserInterface {
  email: string;
  password: string;
  firstName?: string | null;
  lastName?: string | null;
}

export interface SignInUserInterface {
  email: string;
  password: string;
}
