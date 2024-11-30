import express from "express";
import { UsersController } from "../controllers/UsersController";

const usersRouter = express.Router();
const usersController = new UsersController();

usersRouter.get("/users", usersController.getUsers);
usersRouter.get("/findUser", usersController.findAUser);
usersRouter.post("/users", usersController.createAUser);
usersRouter.put("/users/:userId", usersController.updateAUser);
usersRouter.delete("/users/:userId", usersController.deleteAUser);

export { usersRouter };
