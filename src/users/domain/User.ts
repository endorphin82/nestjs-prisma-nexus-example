import { Entity } from '../../common/Entity';
import { UniqueEntityID } from '../../common/UniqueEntityID';

import { UserRole } from './UserRole';

interface IUserProps {
  email: string;
  password: string,
  firstName?: string | null,
  lastName?: string | null,
  middleName?: string | null,
  roles: UserRole[],
}

export class User extends Entity<IUserProps> {
  get roles(): UserRole[] {
    return this.props.roles;
  }

  get email(): string {
    return this.props.email;
  }

  get password(): string {
    return this.props.password;
  }

  get firstName(): string | null | undefined {
    return this.props.firstName;
  }

  get lastName(): string | null | undefined {
    return this.props.lastName;
  }

  get middleName(): string | null | undefined {
    return this.props.middleName;
  }

  private constructor(props: IUserProps, id?: UniqueEntityID) {
    super(props, id);
  }

  getName() {
    return `${(this.firstName) || ''} ${(this.middleName) || ''} ${(this.lastName) || ''}`.trim();
  }

  public static create(props: IUserProps, id?: UniqueEntityID): User {
    const defaultValues: IUserProps = { ...props };

    const user = new User(defaultValues, id);

    return user;
  }
}
