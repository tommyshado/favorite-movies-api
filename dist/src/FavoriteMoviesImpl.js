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
    constructor(db, 
    /* private usersImpl: UsersImpl, */ movieImpl) {
        this.db = db;
        this.movieImpl = movieImpl;
    }
    addToFavorites(userId, movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the user exists
            // const user = await this.usersImpl.findUser(userId);
            // if (!user) {
            //     return false;
            // }
            // Check if the movie exists
            const movie = yield this.movieImpl.getMovieById(movieId);
            if (!movie) {
                return false;
            }
            // Insert and update the favorite_movie boolean to true
            const result = yield this.db.query("INSERT INTO favorite_movies (user_id, movie_id, favorite_movie) VALUES ($1, $2, true)", [userId, movieId]);
            return result.rowCount === 1;
        });
    }
    removeFromFavorites(userId, movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the user exists
            // const user = await this.usersImpl.findUser(userId);
            // if (!user) {
            //     return false;
            // }
            // Check if the movie exists
            const movie = yield this.movieImpl.getMovieById(movieId);
            if (!movie) {
                return false;
            }
            // This function should update the favorite_movie boolean to false
            const result = yield this.db.query("UPDATE favorite_movies SET favorite_movie = false WHERE user_id = $1 AND movie_id = $2", [userId, movieId]);
            return result.rowCount === 1;
        });
    }
    // Create a function that will join the movies table with the favorite_movies table and return the results using the user_id and movie_id
    // Ensure you are selecting where the favorite_movie boolean is true
    getUserFavoriteMovies(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the user exists
            // const user = await this.usersImpl.findUser(userId);
            // if (!user) {
            //     return [];
            // }
            const result = yield this.db.query("SELECT * FROM movies INNER JOIN favorite_movies ON movies.id = favorite_movies.movie_id WHERE favorite_movies.user_id = $1 AND favorite_movies.favorite_movie = true", [userId]);
            return result;
        });
    }
}
exports.FavoriteMoviesImpl = FavoriteMoviesImpl;
