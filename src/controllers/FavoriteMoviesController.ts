import { dbForApp } from "../model/pool";
import { FavoriteMoviesImpl } from "../FavoriteMoviesImpl";
import { Request, Response } from 'express';
import { UsersImpl } from "../UsersImpl";
import { Movies } from "../MoviesImpl";

const usersImpl = new UsersImpl(dbForApp);
const moviesImpl = new Movies(dbForApp);

export class FavoriteMoviesController extends FavoriteMoviesImpl {
    constructor() {
        super(dbForApp, usersImpl, moviesImpl);
    }

    async addFavorite(req: Request, res: Response) {
        const userId = parseInt(req.params.userId);
        const movieId = parseInt(req.params.movieId);
        try {
            const result = await super.addToFavorites(userId, movieId);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    async removeFavorite(req: Request, res: Response) {
        const userId = parseInt(req.params.userId);
        const movieId = parseInt(req.params.movieId);
        try {
            const result = await super.removeFromFavorites(userId, movieId);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    async findUserFavorites(req: Request, res: Response) {
        const userId = parseInt(req.params.userId);
        try {
            const result = await super.getUserFavoriteMovies(userId);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }
}