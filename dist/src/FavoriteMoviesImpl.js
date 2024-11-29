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
exports.FavoriteMoviesImpl = void 0;
class FavoriteMoviesImpl {
    constructor(db) {
        this.db = db;
    }
    addToFavorites(userId, movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.query('INSERT INTO favorite_movies VALUES ($1, $2)', [userId, movieId]);
            return result.rowCount === 1;
        });
    }
    removeFromFavorites(userId, movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.query('DELETE FROM favorite_movies WHERE user_id = $1 AND movie_id = $2', [userId, movieId]);
            return result.rowCount === 1;
        });
    }
    getFavorites(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.query('SELECT movie_id FROM favorite_movies WHERE user_id = $1', [userId]);
            return result.map((movie) => movie.movie_id);
        });
    }
    // Create a function that will join the movies table with the favorite_movies table and return the results using the user_id and movie_id
    getUserFavoriteMovies(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.query('SELECT * FROM movies INNER JOIN favorite_movies ON movies.id = favorite_movies.movie_id WHERE user_id = $1', [userId]);
        });
    }
}
exports.FavoriteMoviesImpl = FavoriteMoviesImpl;
