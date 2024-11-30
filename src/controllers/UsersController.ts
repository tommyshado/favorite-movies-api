import { dbForApp } from "../model/pool";
import { UsersImpl } from "../UsersImpl";
import { Request, Response } from 'express';


export class UsersController extends UsersImpl {
    constructor() {
        super(dbForApp);
    }

    async createAUser(req: Request, res: Response) {
        const user = req.body;
        try {
            const result = await super.createUser(user);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    async findAUser(req: Request, res: Response) {
        const userId = parseInt(req.params.userId);
        try {
            const result = await super.findUser(userId);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    async updateAUser(req: Request, res: Response) {
        const userId = parseInt(req.params.userId);
        const user = req.body;
        try {
            const result = await super.updateUser(userId, user);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    async deleteAUser(req: Request, res: Response) {
        const userId = parseInt(req.params.userId);
        try {
            const result = await super.deleteUser(userId);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    async getUsers(req: Request, res: Response) {
        try {
            const result = await super.getAllUsers();
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }
}