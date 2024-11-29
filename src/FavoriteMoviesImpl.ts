import * as pgPromise from 'pg-promise';
import { IFavorite } from './types/IFavorite';

export class FavoriteMoviesImpl implements IFavorite {
    constructor(private db: pgPromise.IDatabase<any>) {}

    async addToFavorites(userId: number, movieId: number): Promise<boolean> {
        // Insert and update the favorite_movie boolean to true
        const result = await this.db.query('INSERT INTO favorite_movies (user_id, movie_id, favorite_movie) VALUES ($1, $2, true)', [userId, movieId]);
        return result.rowCount === 1;
    }

    async removeFromFavorites(userId: number, movieId: number): Promise<boolean> {
        // This function should update the favorite_movie boolean to false
        const result = await this.db.query('UPDATE favorite_movies SET favorite_movie = false WHERE user_id = $1 AND movie_id = $2', [userId, movieId]);
        return result.rowCount === 1;
    }

    async getFavorites(userId: number): Promise<number[]> {
        const result = await this.db.query('SELECT movie_id FROM favorite_movies WHERE user_id = $1 AND favorite_movie = true', [userId]);
        return result.map((movie: any) => movie.movie_id);
    }

    // Create a function that will join the movies table with the favorite_movies table and return the results using the user_id and movie_id
    // Ensure you are selecting where the favorite_movie boolean is true
    async getUserFavoriteMovies(userId: number): Promise<any[]> {
        const result = await this.db.query('SELECT * FROM movies INNER JOIN favorite_movies ON movies.id = favorite_movies.movie_id WHERE favorite_movies.user_id = $1 AND favorite_movies.favorite_movie = true', [userId]);
        return result;
    }
}