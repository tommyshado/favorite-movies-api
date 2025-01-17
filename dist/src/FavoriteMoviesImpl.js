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
    constructor(db, usersImpl) {
        this.db = db;
        this.usersImpl = usersImpl;
    }
    checkIfUserExists(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the user exists
            const user = yield this.usersImpl.findUser(userId);
            if (!user) {
                return {
                    status: "error",
                    message: "User does not exist"
                };
            }
            return user;
        });
    }
    checkIfMovieExists(movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if the movie exists
            const movieExists = yield this.db.query("SELECT * FROM favorite_movies WHERE movie_id = $1", [movieId]);
            if (movieExists.length === 0) {
                return {
                    status: "error",
                    message: "Movie does not exist"
                };
            }
            return movieExists[0];
        });
    }
    addToFavorites(userId, movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield this.checkIfUserExists(userId);
            const checkMovie = yield this.checkIfMovieExists(movie.id);
            // Handle errors or return messages from the check function
            if ('status' in checkUser && checkUser.status === "error") {
                return checkUser;
            }
            if ('status' in checkMovie && checkMovie.status === "error") {
                return checkMovie;
            }
            // `checkResult` contains the user object if the checks passed
            const user = checkUser;
            const favoriteMovie = checkMovie;
            if (favoriteMovie.favoriteMovie) {
                return {
                    status: "error",
                    message: "Movie already exists"
                };
            }
            // Insert and update the favorite_movie boolean to true
            yield this.db.query(`INSERT INTO 
       favorite_movies (title, language, overview, release_date, backdrop_path, movie_id, user_id, favorite_movie)
       VALUES ($1, $2, $3, $4, $5, $6, $7, true)
      `, [
                movie.title,
                movie.language,
                movie.overview,
                movie.release_date,
                movie.backdrop_path,
                movie.id,
                user.id,
            ]);
            return {
                status: "success",
                message: "Movie added to favorites"
            };
        });
    }
    removeFromFavorites(userId, movieId) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield this.checkIfUserExists(userId);
            const checkMovie = yield this.checkIfMovieExists(movieId);
            // Handle errors or return messages from the check function
            if ('status' in checkUser && checkUser.status === "error") {
                return checkUser;
            }
            if ('status' in checkMovie && checkMovie.status === "error") {
                return checkMovie;
            }
            // `checkResult` contains the user object if the checks passed
            const user = checkUser;
            const favoriteMovie = checkMovie;
            if (favoriteMovie.favoriteMovie) {
                // This function should update the favorite_movie boolean to false
                const result = yield this.db.query("UPDATE favorite_movies SET favorite_movie = false WHERE user_id = $1 AND movie_id = $2", [user.id, movieId]);
                if (result.rowCount === 1) {
                    return {
                        status: "success",
                        message: "Movie removed from favorites"
                    };
                }
            }
            return {
                status: "error",
                message: "Movie does not exist"
            };
        });
    }
    getUserFavoriteMovies(userId) {
        return __awaiter(this, void 0, void 0, function* () {
            const checkUser = yield this.checkIfUserExists(userId);
            if ('status' in checkUser && checkUser.status === "error") {
                return [checkUser];
            }
            const user = checkUser;
            const result = yield this.db.query("SELECT * FROM favorite_movies WHERE user_id = $1 AND favorite_movie = true", [user.id]);
            return result;
        });
    }
}
exports.FavoriteMoviesImpl = FavoriteMoviesImpl;
