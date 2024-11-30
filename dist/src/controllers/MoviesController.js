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
exports.MoviesController = void 0;
const pool_1 = require("../model/pool");
const MoviesImpl_1 = require("../MoviesImpl");
class MoviesController extends MoviesImpl_1.Movies {
    constructor() {
        super(pool_1.dbForApp);
    }
    createMovie(req, res) {
        const _super = Object.create(null, {
            addMovie: { get: () => super.addMovie }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const movie = req.body;
            try {
                const result = yield _super.addMovie.call(this, movie);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    deleteMovie(req, res) {
        const _super = Object.create(null, {
            removeMovie: { get: () => super.removeMovie }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const result = yield _super.removeMovie.call(this, id);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    getMovie(req, res) {
        const _super = Object.create(null, {
            getMovieById: { get: () => super.getMovieById }
        });
        return __awaiter(this, void 0, void 0, function* () {
            const id = parseInt(req.params.id);
            try {
                const result = yield _super.getMovieById.call(this, id);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
    getMovies(req, res) {
        const _super = Object.create(null, {
            getMoviesList: { get: () => super.getMoviesList }
        });
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const result = yield _super.getMoviesList.call(this);
                res.status(200).send(result);
            }
            catch (error) {
                res.status(400).send(error.message);
            }
        });
    }
}
exports.MoviesController = MoviesController;
