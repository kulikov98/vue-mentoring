/* eslint-disable */
export interface IMovie {
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
    genres?: string[];
}

export interface IMovieSearchResult {
    page: number;
    results: IMovie[];
    total_pages: number;
    total_results: number;
}

export interface IGenre {
  id: number,
  name: string,
}
