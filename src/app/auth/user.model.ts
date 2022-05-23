export class User {
  public id: string;
  public email: string;
  private idToken: string;

  constructor(id: string, email: string, idToken: string) {
    this.id = id;
    this.email = email;
    this.idToken = idToken;
  }
}
