"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FavoriteMoviesController = void 0;
class FavoriteMoviesController {
    constructor(favoriteMoviesImpl) {
        this.favoriteMoviesImpl = favoriteMoviesImpl;
        this.addFavorite = this.addFavorite.bind(this);
        this.removeFavorite = this.removeFavorite.bind(this);
        this.findUserFavorites = this.findUserFavorites.bind(this);
    }
    addFavorite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            const movie = {
                id: parseInt(req.params.movieId),
                title: req.body.title,
                backdrop_path: req.body.backdrop_path,
                overview: req.body.overview,
                language: req.body.language,
                release_date: req.body.release_date
            };
            try {
                const result = yield this.favoriteMoviesImpl.addToFavorites(userId, movie);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    removeFavorite(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            const movieId = parseInt(req.params.id);
            try {
                const result = yield this.favoriteMoviesImpl.removeFromFavorites(userId, movieId);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    findUserFavorites(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            try {
                const result = yield this.favoriteMoviesImpl.getUserFavoriteMovies(userId);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.FavoriteMoviesController = FavoriteMoviesController;
