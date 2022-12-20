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

export const getMoviesDiscovery = async (sortBy: SortBy) => {
  const sort = API_PARAM_MAP[sortBy];
  const maxYear = new Date().getFullYear();

  const res = await fetch(
    `${API_BASE_URL}/discover/movie?release_date.lte=${maxYear}&sort_by=${sort}`,
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
