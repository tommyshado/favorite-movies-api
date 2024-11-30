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
const pool_1 = require("../model/pool");
const FavoriteMoviesImpl_1 = require("../FavoriteMoviesImpl");
const UsersImpl_1 = require("../UsersImpl");
const MoviesImpl_1 = require("../MoviesImpl");
const usersImpl = new UsersImpl_1.UsersImpl(pool_1.dbForApp);
const moviesImpl = new MoviesImpl_1.Movies(pool_1.dbForApp);
class FavoriteMoviesController extends FavoriteMoviesImpl_1.FavoriteMoviesImpl {
    constructor() {
        super(pool_1.dbForApp, usersImpl, moviesImpl);
    }
    addFavorite(req, res) {
        const _super = Object.create(null, {
            addToFavorites: { get: () => super.addToFavorites }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            const movieId = parseInt(req.params.movieId);
            try {
                const result = yield _super.addToFavorites.call(this, userId, movieId);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    removeFavorite(req, res) {
        const _super = Object.create(null, {
            removeFromFavorites: { get: () => super.removeFromFavorites }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            const movieId = parseInt(req.params.movieId);
            try {
                const result = yield _super.removeFromFavorites.call(this, userId, movieId);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    findUserFavorites(req, res) {
        const _super = Object.create(null, {
            getUserFavoriteMovies: { get: () => super.getUserFavoriteMovies }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const userId = parseInt(req.params.userId);
            try {
                const result = yield _super.getUserFavoriteMovies.call(this, userId);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.FavoriteMoviesController = FavoriteMoviesController;
