import { IMovie } from "./IMovies";

export interface IFavoriteMessages {
  status: string;
  message: string;
}

export interface IFavoriteMovie {
  id: number; // Primary key
  title: string; // Title of the movie
  language: string; // Language of the movie
  overview: string; // Overview of the movie
  releaseDate: string; // Release date as a string in ISO format or a specific format
  backdropPath: string; // Path to the movie's backdrop image
  movieId: number; // Unique identifier for the movie
  userId: number; // Foreign key referencing the user
  favoriteMovie: boolean; // Whether the movie is marked as a favorite
}

export interface IFavorite {
  addToFavorites: (userId: number, movie: IMovie) => Promise<IFavoriteMessages>;
  removeFromFavorites: (
    userId: number,
    movieId: number
  ) => Promise<IFavoriteMessages>;
  getUserFavoriteMovies: (userId: number) => Promise<any[]>;
}
