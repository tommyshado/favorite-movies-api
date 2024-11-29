import * as pgPromise from 'pg-promise';
import { IFavorite } from './types/IFavorite';

export class FavoriteMoviesImpl {
    constructor(private db: pgPromise.IDatabase<any>) {}

    async addFavoriteMovie(userId: number, movieId: number): Promise<boolean> {
        const result = await this.db.query('INSERT INTO favorite_movies VALUES ($1, $2)',
            [userId, movieId]);
        return result.rowCount === 1;
    }

    async removeFavoriteMovie(userId: number, movieId: number): Promise<boolean> {
        const result = await this.db.query('DELETE FROM favorite_movies WHERE user_id = $1 AND movie_id = $2',
            [userId, movieId]);
        return result.rowCount === 1;
    }

    async getFavoriteMovies(userId: number): Promise<number[]> {
        const result = await this.db.query('SELECT movie_id FROM favorite_movies WHERE user_id = $1', [userId]);
        return result.map((movie: any) => movie.movie_id);
    }

    // Create a function that will join the movies table with the favorite_movies table and return the results using the user_id and movie_id
    async getFavoriteMoviesWithDetails(userId: number): Promise<any[]> {
        return await this.db.query('SELECT * FROM movies INNER JOIN favorite_movies ON movies.id = favorite_movies.movie_id WHERE user_id = $1', [userId]);
    }
}