"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoritesRouter = void 0;
const express_1 = __importDefault(require("express"));
const FavoriteMoviesController_1 = require("../controllers/FavoriteMoviesController");
const FavoriteMoviesImpl_1 = require("../FavoriteMoviesImpl");
const pool_1 = require("../model/pool");
// import { authenticate } from "../middlewares/authMiddleware";
const UsersImpl_1 = require("../UsersImpl");
const favoritesRouter = express_1.default.Router();
exports.favoritesRouter = favoritesRouter;
const favoriteMoviesImpl = new FavoriteMoviesImpl_1.FavoriteMoviesImpl(pool_1.dbForApp, new UsersImpl_1.UsersImpl(pool_1.dbForApp));
const favoriteMoviesController = new FavoriteMoviesController_1.FavoriteMoviesController(favoriteMoviesImpl);
favoritesRouter.get("/favorites", 
// authenticate,
favoriteMoviesController.findUserFavorites);
favoritesRouter.post("/favorites", favoriteMoviesController.addFavorite);
favoritesRouter.delete("/favorites/:id", favoriteMoviesController.removeFavorite);
