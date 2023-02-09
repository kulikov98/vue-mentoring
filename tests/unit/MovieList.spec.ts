import MovieList from '@/components/MovieList.vue';
import { useMovieStore } from '@/stores/MovieStore';
import { createTestingPinia } from '@pinia/testing';
import { VueWrapper, mount } from '@vue/test-utils';
import { movies } from './test-data';

const SELECTORS = {
  loading: '[data-testid="loading"]',
  movies: '[data-testid="movies"]',
  noResults: '[data-testid="no-results"]',
};

describe('MovieList', () => {
  let wrapper: VueWrapper;
  const pinia = createTestingPinia();
  const store = useMovieStore(pinia);

  beforeEach(() => {
    wrapper = mount(MovieList, {
      global: {
        plugins: [pinia],
        directives: {
          image: {},
        },
      },
    });
  });

  afterEach(() => wrapper.unmount());

  describe('loading state:', () => {
    beforeEach(() => {
      store.isLoading = true;
    });

    it('should show loading text', () => {
      const loading = wrapper.find(SELECTORS.loading);
      expect(loading.text()).toBe('Looking for movies...');
    });

    it('should not show movies section', () => {
      const moviesSection = wrapper.find(SELECTORS.movies);
      expect(moviesSection.exists()).toBeFalsy();
    });

    it('should not show "not found" text', () => {
      const noResults = wrapper.find(SELECTORS.noResults);
      expect(noResults.exists()).toBeFalsy();
    });
  });

  describe('loaded state:', () => {
    beforeEach(() => {
      store.isLoading = false;
      // @ts-expect-error: getters are writable in tests
      store.hasLoaded = true;
      // @ts-expect-error: getters are writable in tests
      store.moviesWithGenres = movies;
    });

    it('should not show loading text', () => {
      const loading = wrapper.find(SELECTORS.loading);
      expect(loading.exists()).toBeFalsy();
    });

    it('should show movies section', () => {
      const moviesSection = wrapper.find(SELECTORS.movies);
      expect(moviesSection.exists()).toBeTruthy();
    });

    it('should not show "not found" text', () => {
      const noResults = wrapper.find(SELECTORS.noResults);
      expect(noResults.exists()).toBeFalsy();
    });

    it('should show corrent number of movie cards', () => {
      const movieCards = wrapper.findAllComponents({ name: 'MovieCard' });
      expect(movieCards.length).toBe(movies.length);
    });

    it('should trigger selectMovie(movie) when movie card clicked', () => {
      const movieCard = wrapper.findComponent({ name: 'MovieCard' });
      movieCard.trigger('click');
      expect(store.selectMovie).toHaveBeenCalledWith(movies[0]);
    });

    it('should trigger selectMovie(movie) when movie card selected by enter key press', () => {
      const movieCard = wrapper.findComponent({ name: 'MovieCard' });
      movieCard.trigger('keypress.enter');
      expect(store.selectMovie).toHaveBeenCalledWith(movies[0]);
    });
  });

  describe('no results state:', () => {
    beforeEach(() => {
      store.isLoading = false;
      // @ts-expect-error: getters are writable in tests
      store.hasLoaded = false;
      store.data.results = [];
    });

    it('should not show loading text', () => {
      const loading = wrapper.find(SELECTORS.loading);
      expect(loading.exists()).toBeFalsy();
    });

    it('should not show movies section', () => {
      const moviesSection = wrapper.find(SELECTORS.movies);
      expect(moviesSection.exists()).toBeFalsy();
    });

    it('should show "not found" text', () => {
      const noResults = wrapper.find(SELECTORS.noResults);
      expect(noResults.text()).toBe('No movies found');
    });
  });
});
