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
exports.UsersImpl = void 0;
class UsersImpl {
    constructor(db) {
        this.db = db;
    }
    findUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.query('SELECT * FROM users WHERE id = $1', [id]);
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if user exists
            const userExists = yield this.findUser(user.id);
            if (userExists) {
                throw new Error('User already exists');
            }
            const result = yield this.db.query('INSERT INTO users VALUES ($1, $2, $3)', [user.id, user.name, user.email]);
            return result.rowCount === 1 ? user : {};
        });
    }
    updateUser(id, user) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield this.findUser(id);
            if (!checkUser) {
                throw new Error('User does not exist');
            }
            const result = yield this.db.query('UPDATE users SET name = $1, email = $2 WHERE id = $3', [user.name, user.email, id]);
            return result.rowCount === 1;
        });
    }
    deleteUser(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield this.findUser(id);
            if (!checkUser) {
                throw new Error('User does not exist');
            }
            const result = yield this.db.query('DELETE FROM users WHERE id = $1', [id]);
            return result.rowCount === 1;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.query('SELECT * FROM users');
        });
    }
}
exports.UsersImpl = UsersImpl;
