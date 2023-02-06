import { SortBy } from './constants';

const API_KEY = process.env.VUE_APP_API_KEY;
const API_BASE_URL = 'https://api.themoviedb.org/3';

const API_PARAM_MAP = {
  [SortBy.Rating]: 'popularity.desc',
  [SortBy.ReleaseDate]: 'release_date.desc',
};

const defaultRequestOptions = {
  headers: {
    Authorization: `Bearer ${API_KEY}`,
    'Content-Type': 'application/json;charset=utf-8',
  },
};

export const getMoviesDiscovery = async (sortBy: SortBy, genreId = '') => {
  const maxYear = new Date().getFullYear();

  const queryParams = new URLSearchParams({
    'release_date.lte': maxYear.toString(),
    sort_by: API_PARAM_MAP[sortBy],
    with_genres: genreId,
  });

  const res = await fetch(
    `${API_BASE_URL}/discover/movie?${queryParams}`,
    defaultRequestOptions,
  );
  const json = await res.json();
  return json;
};

export const getMovies = async (query: string) => {
  const res = await fetch(
    `${API_BASE_URL}/search/movie?query=${query}`,
    defaultRequestOptions,
  );
  const json = await res.json();
  return json;
};

export const getMovie = async (id: string) => {
  const res = await fetch(
    `${API_BASE_URL}/movie/${id}`,
    defaultRequestOptions,
  );
  const json = await res.json();
  return json;
};

export const getGenres = async () => {
  const res = await fetch(
    `${API_BASE_URL}/genre/movie/list`,
    defaultRequestOptions,
  );
  const json = res.json();
  return json;
};
