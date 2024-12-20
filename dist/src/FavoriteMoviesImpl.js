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
    addToFavorites(userId, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the user exists
            // const user = await this.usersImpl.findUser(userId);
            // if (!user) {
            //     return false;
            // }
            // Insert and update the favorite_movie boolean to true
            const result = yield this.db.query(`INSERT INTO 
       favorite_movies (title, language, overview, release_date, backdrop_path, movie_id, user_id, favorite_movie)
       VALUES ($1, $2, $3, $4, $5, $6, $7, true)
      `, [
                movie.title,
                movie.language,
                movie.overview,
                movie.release_date,
                movie.backdrop_path,
                movie.id,
                userId,
            ]);
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
            // This function should update the favorite_movie boolean to false
            const result = yield this.db.query("UPDATE favorite_movies SET favorite_movie = false WHERE user_id = $1 AND movie_id = $2", [userId, movieId]);
            return result.rowCount === 1;
        });
    }
    getUserFavoriteMovies(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the user exists
            // const user = await this.usersImpl.findUser(userId);
            // if (!user) {
            //     return [];
            // }
            console.log("userId", userId);
            const result = yield this.db.query("SELECT * FROM favorite_movies WHERE user_id = $1 AND favorite_movie = true", [userId]);
            return result;
        });
    }
}
exports.FavoriteMoviesImpl = FavoriteMoviesImpl;
