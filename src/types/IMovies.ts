// Definition of the IMovie interface - data will come from the movies database api
export interface IMovie {
    id: number;
    title: string;
    backdrop_path: string;
    overview: string;
    language: string;
    release_date: string;
}