import { dbForApp } from "../model/pool";
import { FavoriteMoviesImpl } from "../FavoriteMoviesImpl";
import { Request, Response, NextFunction } from 'express';
import { UsersImpl } from "../UsersImpl";

const usersImpl = new UsersImpl(dbForApp);

export class FavoriteMoviesController extends FavoriteMoviesImpl {
    constructor() {
        super(dbForApp, usersImpl);
    }

    async addFavorite(req: Request, res: Response) {
        const userId = parseInt(req.params.userId);
        const movie = {
            id: parseInt(req.params.movieId),
            title: req.body.title,
            backdrop_path: req.body.backdrop_path,
            overview: req.body.overview,
            language: req.body.language,
            release_date: req.body.release_date
        }
        
        try {
            const result = await super.addToFavorites(userId, movie);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    async removeFavorite(req: Request, res: Response) {
        const userId = parseInt(req.params.userId);
        const movieId = parseInt(req.params.id);
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