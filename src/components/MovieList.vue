<script setup lang="ts">
/* eslint-disable camelcase */
import { useMovieStore } from '@/stores/MovieStore';
import { storeToRefs } from 'pinia';
import MovieCard from './MovieCard.vue';

const store = useMovieStore();
const { isLoading, hasLoaded, movies } = storeToRefs(store);
</script>

<template>
  <span
    v-if="isLoading"
    class="info"
    >Looking for movies...</span
  >
  <section
    v-else-if="hasLoaded"
    class="movie-list"
  >
    <MovieCard
      v-for="movie in movies"
      :key="movie.id"
      :="movie"
      @click="store.selectMovie(movie)"
      @keypress.enter="store.selectMovie(movie)"
    />
  </section>
  <span
    v-else
    class="info"
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
