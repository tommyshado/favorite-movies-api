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
    checksUser(user) {
        if (!user.name) {
            throw new Error("User name is required");
        }
        if (!user.email) {
            throw new Error("User email is required");
        }
    }
    findUser(email) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.query("SELECT * FROM users WHERE email = $1", [email]);
        });
    }
    createUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checksUser(user);
            const userExists = yield this.findUser(user.email);
            if (userExists) {
                throw new Error("User already exists");
            }
            const result = yield this.db.query("INSERT INTO users VALUES ($1, $2, $3)", [user.name, user.email, user.new_password]);
            return result.rowCount === 1 ? user : {};
        });
    }
    updateUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checksUser(user);
            // Decrypt the new password then add to the db
            const result = yield this.db.query("UPDATE users SET name = $1, email = $2, password = $3 WHERE email = $2 AND password = $4", [user.name, user.email, user.new_password, user.old_password]);
            return result.rowCount === 1;
        });
    }
    deleteUser(user) {
        return __awaiter(this, void 0, void 0, function* () {
            this.checksUser(user);
            const result = yield this.db.query("DELETE FROM users WHERE email = $1", [
                user.email,
            ]);
            return result.rowCount === 1;
        });
    }
    getAllUsers() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.query("SELECT * FROM users");
        });
    }
}
exports.UsersImpl = UsersImpl;
