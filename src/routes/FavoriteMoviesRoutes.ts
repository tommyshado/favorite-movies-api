import express from "express";
import { FavoriteMoviesController } from "../controllers/FavoriteMoviesController";
import { FavoriteMoviesImpl } from "../FavoriteMoviesImpl";
import { dbForApp } from "../model/pool";
// import { authenticate } from "../middlewares/authMiddleware";
import { UsersImpl } from "../UsersImpl";

const favoritesRouter = express.Router();

const favoriteMoviesImpl = new FavoriteMoviesImpl(dbForApp, new UsersImpl(dbForApp));
const favoriteMoviesController = new FavoriteMoviesController(favoriteMoviesImpl);

favoritesRouter.get(
  "/favorites",
  // authenticate,
  favoriteMoviesController.findUserFavorites
);
favoritesRouter.post(
  "/favorites",
  favoriteMoviesController.addFavorite
);
favoritesRouter.delete(
  "/favorites/:id",
  favoriteMoviesController.removeFavorite
);

export { favoritesRouter };
