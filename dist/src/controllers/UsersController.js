"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UsersController = void 0;
const pool_1 = require("../model/pool");
const UsersImpl_1 = require("../UsersImpl");
class UsersController extends UsersImpl_1.UsersImpl {
    constructor() {
        super(pool_1.dbForApp);
    }
    createAUser(req, res) {
        const _super = Object.create(null, {
            createUser: { get: () => super.createUser }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const user = req.body;
            try {
                const result = yield _super.createUser.call(this, user);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    findAUser(req, res) {
        const _super = Object.create(null, {
            findUser: { get: () => super.findUser }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            try {
                const result = yield _super.findUser.call(this, userId);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    updateAUser(req, res) {
        const _super = Object.create(null, {
            updateUser: { get: () => super.updateUser }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            const user = req.body;
            try {
                const result = yield _super.updateUser.call(this, userId, user);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    deleteAUser(req, res) {
        const _super = Object.create(null, {
            deleteUser: { get: () => super.deleteUser }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            try {
                const result = yield _super.deleteUser.call(this, userId);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    getUsers(req, res) {
        const _super = Object.create(null, {
            getAllUsers: { get: () => super.getAllUsers }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield _super.getAllUsers.call(this);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.UsersController = UsersController;
