import * as pgPromise from 'pg-promise';
import { IUser, IUsers } from './types/IUsers';

export class UsersImpl implements IUsers {
    constructor(private db: pgPromise.IDatabase<any>) {}

    async findUser(id: number): Promise<IUser> {
        return await this.db.query('SELECT * FROM users WHERE id = $1', [id]);
    }

    async createUser(user: IUser): Promise<IUser | {}> {
        // Check if user exists
        const userExists = await this.findUser(user.id);
        if (userExists) {
            throw new Error('User already exists');
        }

        const result = await this.db.query('INSERT INTO users VALUES ($1, $2, $3)', [user.id, user.name, user.email]);
        return result.rowCount === 1 ? user : {};
    }

    async updateUser(id: number, user: IUser): Promise<boolean> {
        const checkUser = await this.findUser(id);
        if (!checkUser) {
            throw new Error('User does not exist');
        }
        const result = await this.db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [user.name, user.email, id]);
        return result.rowCount === 1 ? true : false;
    }

    async deleteUser(id: number): Promise<boolean> {
        const checkUser = await this.findUser(id);
        if (!checkUser) {
            throw new Error('User does not exist');
        }
        const result = await this.db.query('DELETE FROM users WHERE id = $1', [id]);
        return result.rowCount === 1 ? true : false;
    }

    async getAllUsers(): Promise<IUser[]> {
        return await this.db.query('SELECT * FROM users');
    }
}