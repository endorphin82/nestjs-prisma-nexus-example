export interface IPassword {
  getHashedPassword(): Promise<string>;
}
