<script setup lang="ts">
/* eslint-disable camelcase */
import { useMovieStore } from '@/stores/MovieStore';
import { storeToRefs } from 'pinia';
import MovieCard from './MovieCard.vue';

const store = useMovieStore();
const { isLoading, hasLoaded, moviesWithGenres } = storeToRefs(store);
</script>

<template>
  <span
    v-if="isLoading"
    class="info"
    data-testid="loading"
    >Looking for movies...</span
  >
  <section
    v-else-if="hasLoaded"
    class="movie-list"
    data-testid="movies"
  >
    <MovieCard
      v-for="movie in moviesWithGenres"
      :key="movie.id"
      :="movie"
      @click="store.selectMovie(movie)"
      @keypress.enter="store.selectMovie(movie)"
    />
  </section>
  <span
    v-else
    class="info"
    data-testid="no-results"
    >No movies found</span
  >
</template>

<style scoped>
.movie-list {
  display: grid;
  grid-auto-rows: auto;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  grid-gap: 57px;
}

.info {
  min-height: 300px;
  height: 100%;
  display: flex;
  flex-grow: 1;
  align-items: center;
  justify-content: center;
  color: var(--gray-text);
  font-size: var(--font-size-giant);
  font-weight: 300;
}
</style>
