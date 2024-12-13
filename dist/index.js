"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const body_parser_1 = __importDefault(require("body-parser"));
const cors_1 = __importDefault(require("cors"));
const FavoriteMoviesRoutes_1 = require("./src/routes/FavoriteMoviesRoutes");
const UsersRoutes_1 = require("./src/routes/UsersRoutes");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 8080;
app.use((0, cors_1.default)());
// parse application/x-www-form-urlencoded
app.use(body_parser_1.default.urlencoded({ extended: false }));
// parse application/json
app.use(body_parser_1.default.json());
app.use("/api", FavoriteMoviesRoutes_1.favoritesRouter, UsersRoutes_1.usersRouter);
app.get("/", (req, res) => {
    res.send("Welcome to the Favorite Movies API");
});
app.listen(PORT, () => console.log("🚀 favorite-movies-api started @:", PORT));
