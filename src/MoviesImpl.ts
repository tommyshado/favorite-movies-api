import * as pgPromise from "pg-promise";
import { IMovie, IMovies } from "./types/IMovies";

export class Movies implements IMovies {
  constructor(private db: pgPromise.IDatabase<any>) {}

  // Add movie that comes from the api when a user clicks on the favorite button
  async addMovie(movie: IMovie): Promise<boolean> {
    const result = await this.db.query(
      "INSERT INTO movies VALUES ($1, $2, $3, $4, $5, $6, $7)",
      [
        movie.title,
        movie.language,
        movie.overview,
        movie.release_date,
        movie.adult,
        movie.ratings,
        movie.popularity,
      ]
    );
    return result.rowCount === 1;
  }

  async removeMovie(id: number): Promise<boolean> {
    // Check if a movie exists
    const movie = await this.getMovieById(id);
    if (!movie) {
      throw new Error("Movie does not exist");
    }

    const result = await this.db.query("DELETE FROM movies WHERE id = $1", [
      id,
    ]);
    return result.rowCount === 1;
  }

  async getMovieById(id: number): Promise<IMovie> {
    return await this.db.query("SELECT * FROM movies WHERE id = $1", [id]);
  }

  async getMoviesList(): Promise<IMovie[]> {
    return await this.db.query("SELECT * FROM movies");
  }
}
