import { IMovie } from './IMovies';

export interface IFavorite {
    addToFavorites: (userId: number, movie: IMovie) => Promise<boolean>;
    removeFromFavorites: (userId: number, movieId: number) => Promise<boolean>;
    getUserFavoriteMovies: (userId: number) => Promise<any[]>;
}