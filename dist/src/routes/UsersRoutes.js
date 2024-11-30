"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.usersRouter = void 0;
const express_1 = __importDefault(require("express"));
const UsersController_1 = require("../controllers/UsersController");
const usersRouter = express_1.default.Router();
exports.usersRouter = usersRouter;
const usersController = new UsersController_1.UsersController();
usersRouter.get('/users', usersController.getUsers);
usersRouter.get('/users/:userId', usersController.findAUser);
usersRouter.post('/users', usersController.createAUser);
usersRouter.put('/users/:userId', usersController.updateAUser);
usersRouter.delete('/users/:userId', usersController.deleteAUser);
