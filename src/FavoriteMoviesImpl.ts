import * as pgPromise from "pg-promise";
import { IFavorite } from "./types/IFavorite";
import { UsersImpl } from "./UsersImpl";
import { IMovie } from "./types/IMovies";

export class FavoriteMoviesImpl implements IFavorite {
  constructor(
    private db: pgPromise.IDatabase<any>,
    private usersImpl: UsersImpl,
  ) {}

  async addToFavorites(userId: number, movie: IMovie): Promise<boolean> {
    // Check if the user exists
    // const user = await this.usersImpl.findUser(userId);
    // if (!user) {
    //     return false;
    // }

    // Insert and update the favorite_movie boolean to true
    const result = await this.db.query(
      "INSERT INTO favorite_movies (title, language, overview, release_date, backdrop_path, user_id, favorite_movie) VALUES ($1, $2, $3, $4, $5, $6, true)",
      [movie.title, movie.language, movie.overview, movie.release_date, movie.backdrop_path, userId]
    );
    return result.rowCount === 1;
  }

  async removeFromFavorites(userId: number, movieId: number): Promise<boolean> {
    // Check if the user exists
    // const user = await this.usersImpl.findUser(userId);
    // if (!user) {
    //     return false;
    // }

    // This function should update the favorite_movie boolean to false
    const result = await this.db.query(
      "UPDATE favorite_movies SET favorite_movie = false WHERE user_id = $1 AND movie_id = $2",
      [userId, movieId]
    );
    return result.rowCount === 1;
  }

  async getUserFavoriteMovies(userId: number): Promise<any[]> {
    // Check if the user exists
    // const user = await this.usersImpl.findUser(userId);
    // if (!user) {
    //     return [];
    // }

    const result = await this.db.query(
      "SELECT * FROM favorite_movies WHERE user_id = $1 AND favorite_movie = true",
      [userId]
    );
    return result;
  }
}
