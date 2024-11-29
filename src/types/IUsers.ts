interface IUser {
    id: number;
    name: string;
    email: string;
    created_at?: Date;
}

interface IUsers {
    createUser(user: IUser): Promise<IUser>;
    getUserById(id: number): Promise<IUser>;
    updateUser(id: number, user: IUser): Promise<IUser>;
    deleteUser(id: number): Promise<IUser>;
    getAllUsers(): Promise<IUser[]>;
}