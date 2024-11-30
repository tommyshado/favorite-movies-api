import { dbForApp } from "../model/pool";
import { Movies } from "../MoviesImpl";
import { IMovie } from "../types/IMovies";
import { Request, Response } from "express";

export class MoviesController extends Movies {
  constructor() {
    super(dbForApp);
  }

  async createMovie(req: Request, res: Response) {
    const movie: IMovie = req.body;
    try {
      const result = await super.addMovie(movie);
      res.status(200).send(result);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async deleteMovie(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const result = await super.removeMovie(id);
      res.status(200).send(result);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async getMovie(req: Request, res: Response) {
    const id = parseInt(req.params.id);
    try {
      const result = await super.getMovieById(id);
      res.status(200).send(result);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }

  async getMovies(req: Request, res: Response) {
    try {
      const result = await super.getMoviesList();
      res.status(200).send(result);
    } catch (error: any) {
      res.status(400).send(error.message);
    }
  }
}
