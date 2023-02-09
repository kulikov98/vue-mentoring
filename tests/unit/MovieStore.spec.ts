import { setActivePinia, createPinia } from 'pinia'
import { useMovieStore } from '@/stores/MovieStore';
import { SearchBy, SortBy } from '@/helpers/constants';

const moviesData = {
  page: 1,
  results: [],
  total_pages: 1,
  total_results: 0,
};

const genresData = {
  genres: [
    { name: 'genre1', id: 1 },
    { name: 'genre2', id: 2 },
  ]
};

jest.mock('@/helpers/api-service', () => ({
  getMovies: jest.fn(() => Promise.resolve(moviesData)),
  getMoviesDiscovery: jest.fn(() => Promise.resolve(moviesData)),
  getGenres: jest.fn(() => Promise.resolve(genresData)),
}));

describe('MovieStore actions', () => {
  let store: any;

  beforeEach(() => {
    setActivePinia(createPinia());
    store = useMovieStore();
  });

  describe('getMovies action', () => {
    it('should set isLoading to false after making API call', async () => {
      await store.getMovies();
      expect(store.isLoading).toBe(false);
    });

    it('should call getMovies() with the correct search query', async () => {
      const getMoviesMock = require('@/helpers/api-service').getMovies;

      store.searchQuery = 'some query';
      await store.getMovies();
      expect(getMoviesMock).toHaveBeenCalledWith('some query');
    });

    it('should set data with the returned result', async () => {
      await store.getMovies();
      expect(store.data).toEqual(moviesData);
    });

    it('catches the error and logs it to the console', async () => {
      const errorMessage = 'getMovies failed';
      console.error = jest.fn();
      require('@/helpers/api-service').getMovies.mockImplementation(() => Promise.reject(errorMessage));
      await store.getMovies();
      expect(console.error).toHaveBeenCalledWith('getMovies failed:', errorMessage);
    });
  });

  describe('getMoviesDiscovery action', () => {
    it('should set isLoading to false after making API call', async () => {
      await store.getMoviesDiscovery();
      expect(store.isLoading).toBe(false);
    });

    it('should call getMoviesDiscovery() with the correct arguments', async () => {
      const genreId = 1;
      const sortBy = 'sortBy';
      const getMoviesDiscoveryMock = require('@/helpers/api-service').getMoviesDiscovery;

      store.sortBy = sortBy;
      await store.getMoviesDiscovery(genreId);
      expect(getMoviesDiscoveryMock).toHaveBeenCalledWith(sortBy, genreId);
    });

    it('should set data with the returned result', async () => {
      await store.getMoviesDiscovery();
      expect(store.data).toEqual(moviesData);
    });

    it('catches the error and logs it to the console', async () => {
      const errorMessage = 'getMoviesDiscovery failed';
      console.error = jest.fn();
      require('@/helpers/api-service').getMoviesDiscovery.mockImplementation(() => Promise.reject(errorMessage));
      await store.getMoviesDiscovery();
      expect(console.error).toHaveBeenCalledWith('getMoviesDiscovery failed:', errorMessage);
    });
  });

  describe('getGenres action', () => {
    it('should call getGenres()', async () => {
      const getGenresMock = require('@/helpers/api-service').getGenres;
      await store.getGenres();
      expect(getGenresMock).toHaveBeenCalled();
    });

    it('should set data with the returned result', async () => {
      await store.getGenres();
      expect(store.genres).toEqual(genresData.genres);
    });

    it('catches the error and logs it to the console', async () => {
      const errorMessage = 'getGenres failed';
      console.error = jest.fn();
      require('@/helpers/api-service').getGenres.mockImplementation(() => Promise.reject(errorMessage));
      await store.getGenres();
      expect(console.error).toHaveBeenCalledWith('getGenres failed:', errorMessage);
    });
  });

  describe('search action', () => {
    it('should set search query', () => {
      const query = 'some query';
      store.search(query);
      expect(store.searchQuery).toBe(query);
    });

    it('should call getMoviesDiscovery action if search query is empty', () => {
      jest.spyOn(store, 'getMoviesDiscovery');
      store.search();
      expect(store.getMoviesDiscovery).toHaveBeenCalled();
    });

    it('should call getMoviesDiscovery action with a genre id if a search query is a genre name', () => {
      store.searchBy = SearchBy.Genre;
      store.genres = genresData.genres;
      jest.spyOn(store, 'getMoviesDiscovery');

      const genre = genresData.genres[0];
      store.search(genre.name);
      expect(store.getMoviesDiscovery).toHaveBeenCalledWith(genre.id.toString());
    });

    it('should call getMovies action', () => {
      jest.spyOn(store, 'getMovies');
      store.search('some query');
      expect(store.getMovies).toHaveBeenCalled();
    });
  });

  describe('setSortBy and setSearchBy actions', () => {
    it('should set sortBy value and launch search', () => {
      jest.spyOn(store, 'search');
      store.setSortBy(SortBy.ReleaseDate);
      expect(store.sortBy).toBe(SortBy.ReleaseDate);
      expect(store.search).toHaveBeenCalled();
    });

    it('should set searchBy value and launch search', () => {
      jest.spyOn(store, 'search');
      store.setSearchBy(SearchBy.Genre);
      expect(store.searchBy).toBe(SearchBy.Genre);
      expect(store.search).toHaveBeenCalled();
    });
  });
});
