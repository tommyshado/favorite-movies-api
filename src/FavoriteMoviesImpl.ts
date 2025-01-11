import * as pgPromise from "pg-promise";
import { IFavorite, IFavoriteMessages, IFavoriteMovie } from "./types/IFavorite";
import { UsersImpl } from "./UsersImpl";
import { IMovie } from "./types/IMovies";
import { IUser } from "./types/IUsers";

export class FavoriteMoviesImpl implements IFavorite {
  constructor(
    private db: pgPromise.IDatabase<any>,
    private usersImpl: UsersImpl
  ) {}

  private async checkIfUserExists(email: string): Promise<IUser | IFavoriteMessages> {
    // Check if the user exists
    const user = await this.usersImpl.findUser(email);
    if (!user) {
        return {
          status: "error",
          message: "User does not exist"
        };
    }
    return user;
  }

  private async checkIfMovieExists(movieId: number): Promise<IFavoriteMovie | IFavoriteMessages> {
    // Check if the movie exists
    const movieExists = await this.db.query(
      "SELECT * FROM favorite_movies WHERE movie_id = $1",
      [movieId]
    );

    if (movieExists.length === 0) {
      return {
        status: "error",
        message: "Movie does not exist"
      };
    }

    return movieExists[0] as IFavoriteMovie;
  }

  async addToFavorites(email: string, movie: IMovie): Promise<IFavoriteMessages> {
    const checkUser = await this.checkIfUserExists(email);
    const checkMovie = await this.checkIfMovieExists(movie.id);

    // Handle errors or return messages from the check function
    if ('status' in checkUser && checkUser.status === "error") {
        return checkUser;
    }

    if ('status' in checkMovie && checkMovie.status === "error") {
        return checkMovie;
    }

    // `checkResult` contains the user object if the checks passed
    const user = checkUser as IUser;
    const favoriteMovie = checkMovie as IFavoriteMovie;
  
    if (favoriteMovie.favoriteMovie) {
      return {
        status: "error",
        message: "Movie already exists"
      }
    }

    // Insert and update the favorite_movie boolean to true
    await this.db.query(
      `INSERT INTO 
       favorite_movies (title, language, overview, release_date, backdrop_path, movie_id, user_id, favorite_movie)
       VALUES ($1, $2, $3, $4, $5, $6, $7, true)
      `,
      [
        movie.title,
        movie.language,
        movie.overview,
        movie.release_date,
        movie.backdrop_path,
        movie.id,
        user.id,
      ]
    );
    return {
      status: "success",
      message: "Movie added to favorites"
    }
  }

  async removeFromFavorites(email: string, movieId: number): Promise<IFavoriteMessages> {
    const checkUser = await this.checkIfUserExists(email);
    const checkMovie = await this.checkIfMovieExists(movieId);

    // Handle errors or return messages from the check function
    if ('status' in checkUser && checkUser.status === "error") {
      return checkUser;
    }

    if ('status' in checkMovie && checkMovie.status === "error") {
      return checkMovie;
    }

    // `checkResult` contains the user object if the checks passed
    const user = checkUser as IUser;
    const favoriteMovie = checkMovie as IFavoriteMovie;
  
    if (favoriteMovie.favoriteMovie) {
      // This function should update the favorite_movie boolean to false
      const result = await this.db.query(
        "UPDATE favorite_movies SET favorite_movie = false WHERE user_id = $1 AND movie_id = $2",
        [user.id, movieId]
      );

      if (result.rowCount === 1) {
        return {
          status: "success",
          message: "Movie removed from favorites"
        }
      }
    }
    return {
      status: "error",
      message: "Movie does not exist"
    };
  }

  async getUserFavoriteMovies(email: string): Promise<any[]> {
    const checkUser = await this.checkIfUserExists(email);

    if ('status' in checkUser && checkUser.status === "error") {
      return [checkUser];
    }

    const user = checkUser as IUser;

    const result = await this.db.query(
      "SELECT * FROM favorite_movies WHERE user_id = $1 AND favorite_movie = true",
      [user.id]
    );
    return result;
  }
}
