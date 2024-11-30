import express from 'express';
import { MoviesController } from '../controllers/MoviesController';

const moviesRouter = express.Router();
const moviesController = new MoviesController();

moviesRouter.get('/movies', moviesController.getMovies);
moviesRouter.get('/movies/:id', moviesController.getMovie);
moviesRouter.post('/movies', moviesController.createMovie);
moviesRouter.delete('/movies/:id', moviesController.deleteMovie);

export { moviesRouter };