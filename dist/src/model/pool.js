"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.dbForApp = exports.dbForTests = void 0;
require("dotenv/config");
const pg_promise_1 = __importDefault(require("pg-promise"));
const pgp = (0, pg_promise_1.default)();
const configForTests = {
    connectionString: process.env.DATABASE_FOR_TESTS,
};
const dbForTests = pgp(configForTests);
exports.dbForTests = dbForTests;
/******************************************************************************************/
const configForApp = {
    connectionString: process.env.DATABASE_APP,
};
const dbForApp = pgp(configForApp);
exports.dbForApp = dbForApp;
