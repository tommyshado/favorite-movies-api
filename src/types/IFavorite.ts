export interface IFavorite {
    addToFavorites: (userId: number, movieId: number) => Promise<boolean>;
    removeFromFavorites: (userId: number, movieId: number) => Promise<boolean>;
    getFavorites: (userId: number) => Promise<number[]>;
}