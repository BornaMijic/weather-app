interface IUser {
  id: string;
  email: string;
  idToken: string;
}

export class User implements IUser {
  constructor(
    public id: string,
    public email: string,
    public idToken: string
  ) {}
}
