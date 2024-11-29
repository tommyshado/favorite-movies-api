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
exports.Movies = void 0;
class Movies {
    constructor(db) {
        this.db = db;
    }
    // Add movie that comes from the api when a user clicks on the favorite button
    addMovie(movie) {
        return __awaiter(this, void 0, void 0, function* () {
            const result = yield this.db.query('INSERT INTO movies VALUES ($1, $2, $3, $4, $5, $6, $7)', [movie.title, movie.language, movie.overview, movie.release_date, movie.adult, movie.ratings, movie.popularity]);
            return result.rowCount === 1;
        });
    }
    removeMovie(id) {
        return __awaiter(this, void 0, void 0, function* () {
            // Check if a movie exists
            const movie = yield this.getMovieById(id);
            if (!movie) {
                throw new Error('Movie does not exist');
            }
            const result = yield this.db.query('DELETE FROM movies WHERE id = $1', [id]);
            return result.rowCount === 1;
        });
    }
    getMovieById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.query('SELECT * FROM movies WHERE id = $1', [id]);
        });
    }
    getMoviesList() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.db.query('SELECT * FROM movies');
        });
    }
}
exports.Movies = Movies;
