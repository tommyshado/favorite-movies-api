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

  async findUser(userId: number): Promise<IUser> {
    return await this.db.query("SELECT * FROM users WHERE id = $1", [userId]);
  }

  async createUser(user: IUser): Promise<IUser | {}> {
    this.checksUser(user);
    if (!user.id) {
      throw new Error("User ID is required");
    }
    const userExists = await this.findUser(user.id);
    if (userExists) {
      throw new Error("User already exists");
    }

    const result = await this.db.query(
      "INSERT INTO users VALUES ($1, $2, $3)",
      [user.name, user.email, user.new_password]
    );
    return result.rowCount === 1 ? user : {};
  }

  async updateUser(user: IUser): Promise<boolean> {
    this.checksUser(user);

    // Decrypt the new password then add to the db

    const result = await this.db.query(
      "UPDATE users SET name = $1, email = $2, password = $3 WHERE email = $2 AND password = $4",
      [user.name, user.email, user.new_password, user.old_password]
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
