export class User{

  constructor(
    public userId: number,
    public userName: string,
    public password: string,
    public email: string,
    public firstName: string,
    public lastName: string,
    public gender: string,
    public telephoneNumber: number,
    public street: string,
    public pinCode: number,
    public city: string,
    public country: string,
    public admin: boolean
  ) {}
}
