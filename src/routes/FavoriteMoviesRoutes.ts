import express from "express";
import { FavoriteMoviesController } from "../controllers/FavoriteMoviesController";

const favoritesRouter = express.Router();
const favoriteMoviesController = new FavoriteMoviesController();

favoritesRouter.get(
  "favorites/:userId",
  favoriteMoviesController.findUserFavorites
);
favoritesRouter.post(
  "favorites/:userId/:movieId",
  favoriteMoviesController.addFavorite
);
favoritesRouter.delete(
  "favorites/:userId/:movieId",
  favoriteMoviesController.removeFavorite
);

export { favoritesRouter };
