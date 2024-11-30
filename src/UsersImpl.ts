import * as pgPromise from "pg-promise";
import { IUser, IUsers } from "./types/IUsers";

export class UsersImpl implements IUsers {
  constructor(private db: pgPromise.IDatabase<any>) {}

  private checksUser(user: IUser): void {
    if (!user.name) {
      throw new Error("User name is required");
    }
    if (!user.email) {
      throw new Error("User email is required");
    }
  }

  async findUser(email: string): Promise<IUser> {
    return await this.db.query("SELECT * FROM users WHERE email = $1", [email]);
  }

  async createUser(user: IUser): Promise<IUser | {}> {
    this.checksUser(user);
    const userExists = await this.findUser(user.email);
    if (userExists) {
      throw new Error("User already exists");
    }

    const result = await this.db.query(
      "INSERT INTO users VALUES ($1, $2, $3)",
      [user.id, user.name, user.email]
    );
    return result.rowCount === 1 ? user : {};
  }

  async updateUser(user: IUser): Promise<boolean> {
    this.checksUser(user);

    const result = await this.db.query(
      "UPDATE users SET name = $1, email = $2 WHERE email = $3",
      [user.name, user.email, user.email]
    );
    return result.rowCount === 1;
  }

  async deleteUser(user: IUser): Promise<boolean> {
    this.checksUser(user);

    const result = await this.db.query("DELETE FROM users WHERE email = $1", [
      user.email,
    ]);
    return result.rowCount === 1;
  }

  async getAllUsers(): Promise<IUser[]> {
    return await this.db.query("SELECT * FROM users");
  }
}
