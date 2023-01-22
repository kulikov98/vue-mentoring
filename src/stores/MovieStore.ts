/* eslint-disable import/prefer-default-export */
import { getMoviesDiscovery, getGenres, getMovies } from '@/helpers/api-service';
import { SearchBy, SortBy } from '@/helpers/constants';
import { IMovie, IGenre, IMovieSearchResult } from '@/helpers/types';
import { defineStore } from 'pinia';

export const useMovieStore = defineStore('movies', {
  state: () => ({
    data: <IMovieSearchResult>{
      page: 0,
      results: [],
      total_pages: 0,
      total_results: 0,
    },
    genres: <IGenre[]>[],
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
    moviesWithGenres: (state) => state.data.results.map((movie) => {
      const genres = movie.genre_ids.map((id) => {
        const gen = state.genres.find((genre: IGenre) => genre.id === id);
        return gen?.name ?? '';
      });
      return { ...movie, genres };
    }),
  },

  actions: {
    async getMovies() {
      try {
        this.isLoading = true;
        this.data = await getMovies(this.searchQuery);
      } catch (e) {
        console.error('getMovies failed:', e);
      } finally {
        this.isLoading = false;
      }
    },

    async getMoviesDiscovery(genreId = '') {
      try {
        this.isLoading = true;
        this.data = await getMoviesDiscovery(this.sortBy, genreId);
      } catch (e) {
        console.error('getMoviesDiscovery failed:', e);
      } finally {
        this.isLoading = false;
      }
    },

    async getGenres() {
      try {
        const { genres } = await getGenres();
        this.genres = genres;
      } catch (e) {
        console.error('getGenres failed:', e);
      }
    },

    selectMovie(data: IMovie | null) {
      this.selectedMovie = data;
    },

    search(query = '') {
      this.searchQuery = query;

      if (query === '') {
        this.getMoviesDiscovery();
        return;
      }

      const correspondingGenre = this.genres
        .find((genre) => genre.name.toLowerCase() === query.toLowerCase());

      if (this.searchBy === SearchBy.Genre && correspondingGenre !== undefined) {
        this.getMoviesDiscovery(correspondingGenre.id.toString());
        return;
      }

      this.getMovies();
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
