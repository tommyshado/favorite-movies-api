"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.favoritesRouter = void 0;
const express_1 = __importDefault(require("express"));
const FavoriteMoviesController_1 = require("../controllers/FavoriteMoviesController");
const favoritesRouter = express_1.default.Router();
exports.favoritesRouter = favoritesRouter;
const favoriteMoviesController = new FavoriteMoviesController_1.FavoriteMoviesController();
favoritesRouter.get("favorites/:userId", 
// authenticate,
favoriteMoviesController.findUserFavorites);
favoritesRouter.post("favorites/:userId/", favoriteMoviesController.addFavorite);
favoritesRouter.delete("favorites/:userId/:id", favoriteMoviesController.removeFavorite);
