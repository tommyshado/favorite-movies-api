export interface IUser {
    id: number;
    name: string;
    email: string;
    created_at?: Date;
}

export interface IUsers {
    createUser(user: IUser): Promise<IUser> | {};
    findUser(id: number): Promise<IUser>;
    updateUser(id: number, user: IUser): Promise<boolean>;
    deleteUser(id: number): Promise<boolean>;
    getAllUsers(): Promise<IUser[]>;
}