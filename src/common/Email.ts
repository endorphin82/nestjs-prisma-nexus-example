import isEmail from 'isemail';

interface IEmailProps {
  email: string;
}

export class Email implements IEmailProps {
  private props: IEmailProps;

  constructor(props: IEmailProps) {
    this.props = props;
  }

  get email(): string {
    return this.props.email;
  }

  validate() {
    if (!isEmail.validate(this.email)) {
      throw new Error('Incorrect Email');
    }
  }

  public static create({ email }: IEmailProps) {
    return new Email({ email });
  }
}
