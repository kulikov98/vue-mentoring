/* eslint-disable import/prefer-default-export */
import { getMovies, getMoviesDiscovery } from '@/helpers/api-service';
import { SearchBy, SortBy } from '@/helpers/constants';
import { IMovie, IMovieSearchResult } from '@/helpers/types';
import { defineStore } from 'pinia';

export const useMovieStore = defineStore('movies', {
  state: () => ({
    data: <IMovieSearchResult>{
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    },
    isLoading: true,
    selectedMovie: <IMovie | null>null,
    searchQuery: '',
    sortBy: SortBy.ReleaseDate,
    searchBy: SearchBy.Title,
  }),

  getters: {
    movies: (state) => state.data.results,
    hasLoaded: (state) => !state.isLoading && state.data.results.length > 0,
    withSearch: (state) => !!state.selectedMovie,
    currentMovie: (state) => state.selectedMovie,
  },

  actions: {
    async getMovies() {
      try {
        this.data = await getMovies(this.searchQuery);
      } catch (e) {
        console.error('getMovies failed:', e);
      } finally {
        this.isLoading = false;
      }
    },

    async getMoviesDiscovery() {
      try {
        this.data = await getMoviesDiscovery(this.sortBy);
      } catch (e) {
        console.error('getMoviesDiscovery failed:', e);
      } finally {
        this.isLoading = false;
      }
    },

    selectMovie(data: IMovie | null) {
      this.selectedMovie = data;
    },

    search(query = '') {
      this.searchQuery = query;

      if (query === '') {
        this.getMoviesDiscovery();
      } else {
        this.getMovies();
      }
    },

    setSortBy(sortBy: SortBy) {
      this.sortBy = sortBy;
      this.search(this.searchQuery);
    },

    setSearchBy(searchBy: SearchBy) {
      this.searchBy = searchBy;
      this.search(this.searchQuery);
    },
  },
});
