import { IncomingMessage } from 'http';
import { IUserService } from '../users/services/IUserService';

export default ({ req }: { req: IncomingMessage; connection: any }): InitialContext => {
  const context: InitialContext = {
    request: req, userService: this.userService,
  };

  return context;
};

export interface InitialContext {
  request: IncomingMessage;
  userService: IUserService;
  // user: User | null
  // logger: Logger
}

export interface Context extends InitialContext {
}
