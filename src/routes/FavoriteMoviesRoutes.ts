import express from "express";
import { FavoriteMoviesController } from "../controllers/FavoriteMoviesController";
import { FavoriteMoviesImpl } from "../FavoriteMoviesImpl";
import { dbForApp } from "../model/pool";
// import { authenticate } from "../middlewares/authMiddleware";

const favoritesRouter = express.Router();

const favoriteMoviesImpl = new FavoriteMoviesImpl(dbForApp);
const favoriteMoviesController = new FavoriteMoviesController(favoriteMoviesImpl);

favoritesRouter.get(
  "/favorites/:userId",
  // authenticate,
  favoriteMoviesController.findUserFavorites
);
favoritesRouter.post(
  "/favorites/:userId/",
  favoriteMoviesController.addFavorite
);
favoritesRouter.delete(
  "/favorites/:userId/:id",
  favoriteMoviesController.removeFavorite
);

export { favoritesRouter };
