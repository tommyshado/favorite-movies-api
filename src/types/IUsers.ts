export interface IUser {
    id?: number;
    name: string;
    email: string;
    created_at?: Date;
    new_password?: string;
    old_password?: string;
}

export interface IUsers {
    createUser(user: IUser): Promise<IUser> | {};
    findUser(email: string): Promise<IUser>;
    updateUser(user: IUser): Promise<boolean>;
    deleteUser(user: IUser): Promise<boolean>;
    getAllUsers(): Promise<IUser[]>;
}