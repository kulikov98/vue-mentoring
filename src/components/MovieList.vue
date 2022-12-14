<script setup lang="ts">
/* eslint-disable camelcase */
import { IMovie } from '@/helpers/types';
import MovieCard from './MovieCard.vue';

defineProps<{
  isLoading: boolean;
  page: number;
  results: IMovie[];
  total_pages: number;
  total_results: number;
}>();

const emit = defineEmits(['select-movie']);
</script>

<template>
  <span
    v-if="isLoading"
    class="info"
    >Looking for movies...</span
  >
  <section
    v-else-if="!isLoading && results.length > 0"
    class="movie-list"
  >
    <MovieCard
      v-for="movie in results"
      :key="movie.id"
      :="movie"
      @click="emit('select-movie', movie)"
      @keypress.enter="emit('select-movie', movie)"
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
