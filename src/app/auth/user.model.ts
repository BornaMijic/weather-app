export class User {
  public id: string;
  public email: string;
  private idToken: string;
  private expiresIn: Date

  constructor(id: string, email: string, idToken: string, expiresIn: Date) {
    this.id = id;
    this.email = email;
    this.idToken = idToken;
    this.expiresIn = expiresIn;
  }
}
