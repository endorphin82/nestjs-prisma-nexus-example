import {Inject, Injectable} from '@nestjs/common';
import { Email } from '../../common/Email';
import { IPassword } from '../../common/auth/IPassword';
import { BcryptPassword } from '../../common/auth/BcryptPassword';

import { IUserService, CreateUserInterface, SignUpUserInterface } from './IUserService';
import { IUserRepository } from '../repository/IUserRepository';
import { User } from '../domain/User';
import { AuthPayload } from '../domain/AuthPayload';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject('IUserRepository') private readonly userRepository: IUserRepository,
  ) {}

  public createUser({ email, password, firstName, lastName, middleName, roles }: CreateUserInterface) {
    const user = User.create({ email, password, firstName, lastName, middleName, roles });

    console.log('testasdasd');
    return this.userRepository.createUser(user);
  }

  public async getUsers(): Promise<User[]> {
    return this.userRepository.getAllUsers();
  }

  public async signUpUser({ email, firstName, lastName, password }: SignUpUserInterface): Promise<AuthPayload> {
    const userEmail = Email.create({ email });
    userEmail.validate();

    const userExists = this.userRepository.getUserByEmail(userEmail.email);
    if (!userExists) throw new Error('This email is already exist in our system');

    const bcryptPassword: IPassword = BcryptPassword.create({ password });
    const hashedPassword: string = await bcryptPassword.getHashedPassword();

    const user = User.create({
      firstName,
      lastName,
      password: hashedPassword,
      email: userEmail.email,
      roles: ['EMPLOYEE'],
    });

    const createdUser = await this.userRepository.createUser(user);

    return {
      user: createdUser,
      token: 'test',
    };
  }
}
