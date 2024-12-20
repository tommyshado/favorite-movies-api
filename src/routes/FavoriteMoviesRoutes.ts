import express from "express";
import { FavoriteMoviesController } from "../controllers/FavoriteMoviesController";
// import { authenticate } from "../middlewares/authMiddleware";

const favoritesRouter = express.Router();
const favoriteMoviesController = new FavoriteMoviesController();

console.log("favoriteMoviesController", favoriteMoviesController);


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
