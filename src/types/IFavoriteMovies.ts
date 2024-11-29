interface IMovie {
    "id": number,
    "overview": string,  
    "adult": boolean,
    "release_date": string,
    "language": string,  
    "title": string,
    "popularity": number,
    "ratings": number,
    "selected_movie": boolean,
    "user_id": number,
}

export interface IMovies {
    addMovie: (movie: IMovie) => Promise<boolean>;
    removeMovie: (id: number) => Promise<boolean>;
    getMovieById: (id: number) => Promise<IMovie>;
    getMoviesList: () => Promise<IMovie[]>;
}