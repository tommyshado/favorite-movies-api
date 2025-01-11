import { FavoriteMoviesImpl } from "../FavoriteMoviesImpl";
import { Request, Response } from 'express';

export class FavoriteMoviesController {
    constructor(private favoriteMoviesImpl: FavoriteMoviesImpl) {
        this.addFavorite = this.addFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
        this.findUserFavorites = this.findUserFavorites.bind(this);
    }

    async addFavorite(req: Request, res: Response) {
        const email = req.query.email as string;
        const movie = {
            id: parseInt(req.body.id),
            title: req.body.title,
            backdrop_path: req.body.backdrop_path,
            overview: req.body.overview,
            language: req.body.language,
            release_date: req.body.release_date
        }

        try {
            const result = await this.favoriteMoviesImpl.addToFavorites(email, movie);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    async removeFavorite(req: Request, res: Response) {
        const email = req.query.email as string;
        const movieId = parseInt(req.params.id);
        try {
            const result = await this.favoriteMoviesImpl.removeFromFavorites(email, movieId);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }

    async findUserFavorites(req: Request, res: Response) {
        const email = req.query.email as string;
        try {
            const result = await this.favoriteMoviesImpl.getUserFavoriteMovies(email);
            res.status(200).send(result);
        } catch (error: any) {
            res.status(400).send(error.message);
        }
    }
}