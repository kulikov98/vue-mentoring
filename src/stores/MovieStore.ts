/* eslint-disable */
import { getMovies, getMoviesDiscovery } from '@/helpers/api-service';
import { SortBy } from '@/helpers/constants';
import { IMovieSearchResult } from '@/helpers/types';
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
  }),

  getters: {
    movieSearchResult: (state) => state.data,
  },

  actions: {
    async getMovies(query: string) {
      try {
        this.data = await getMovies(query);
      } catch (e) {
        return e;
      } finally {
        this.isLoading = false;
      }
    },

    async getMoviesDiscovery(sortBy: SortBy) {
      try {
        this.data = await getMoviesDiscovery(sortBy);
      } catch (e) {
        return e;
      } finally {
        this.isLoading = false;
      }
    },
  },
});

