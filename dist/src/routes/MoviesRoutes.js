"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.moviesRouter = void 0;
const express_1 = __importDefault(require("express"));
const MoviesController_1 = require("../controllers/MoviesController");
const moviesRouter = express_1.default.Router();
exports.moviesRouter = moviesRouter;
const moviesController = new MoviesController_1.MoviesController();
moviesRouter.get('/movies', moviesController.getMovies);
moviesRouter.get('/movies/:id', moviesController.getMovie);
moviesRouter.post('/movies', moviesController.createMovie);
moviesRouter.delete('/movies/:id', moviesController.deleteMovie);
