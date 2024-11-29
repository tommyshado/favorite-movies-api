import * as pgPromise from 'pg-promise';
import { IMovie, IMovies } from './types/IFavoriteMovies';
import { UsersImpl } from './UsersImpl';

export class FavoriteMoviesImpl implements IMovies {
    constructor(private db: pgPromise.IDatabase<any>, private usersImpl: UsersImpl) {}

    // Add movie that comes from the api when a user clicks on the favorite button
    async addMovie(movie: IMovie): Promise<boolean> {
        // first check if the user exists
        const user = await this.usersImpl.findUser(movie.user_id);
        if (!user) {
            throw new Error('User does not exist');
        }
        
        const result = await this.db.query('INSERT INTO movies VALUES ($1, $2, $3, $4, $5, $6, $7, $8, $9)',
            [movie.overview, movie.adult, movie.release_date, movie.language, movie.title, movie.popularity, movie.ratings, movie.selected_movie, movie.user_id]);
        return result.rowCount === 1;
    }

    async removeMovie(id: number): Promise<boolean> {
        // Check if a movie exists
        const movie = await this.getMovieById(id);
        if (!movie) {
            throw new Error('Movie does not exist');
        }

        const result = await this.db.query('DELETE FROM movies WHERE id = $1', [id]);
        return result.rowCount === 1;
    }

    async getMovieById(id: number): Promise<IMovie> {
        // Check if a movie exists
        const movie = await this.getMovieById(id);
        if (!movie) {
            throw new Error('Movie does not exist');
        }

        return await this.db.query('SELECT * FROM movies WHERE id = $1', [id]);
    }

    async getMoviesList(): Promise<IMovie[]> {
        return await this.db.query('SELECT * FROM movies');
    }
}