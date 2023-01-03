<script setup lang="ts">
/* eslint-disable camelcase, vuejs-accessibility/alt-text */
import { computed } from 'vue';

const props = defineProps<{
  adult: boolean;
  backdrop_path: string | null;
  genre_ids: number[];
  id: number;
  original_language: string;
  original_title: string;
  overview: string;
  popularity: number;
  poster_path: string | null;
  release_date: string;
  title: string;
  video: boolean;
  vote_average: number;
  vote_count: number;
}>();

const genre = computed(() => props.genre_ids);
const year = computed(() => props.release_date?.split('-')[0]);
</script>

<template>
  <article class="card">
    <img v-image:poster.lazy="{ path: poster_path, title }" />
    <footer>
      <div class="description">
        <span class="name">{{ title }}</span>
        <span class="genre">{{ genre }}</span>
      </div>
      <div class="year">
        <span>{{ year }}</span>
      </div>
    </footer>
  </article>
</template>

<style scoped>
.card {
  display: flex;
  flex-direction: column;
}

.card:hover {
  transition: opacity 0.2s;
  cursor: pointer;
  opacity: 0.8;
}

footer {
  display: flex;
  margin-top: 20px;
  justify-content: space-between;
  color: var(--gray-text);
}

.description {
  display: flex;
  flex-direction: column;
}

.name {
  font-size: var(--font-size-large);
}

.genre {
  margin-top: 8px;
  font-size: var(--font-size-small);
  color: var(--gray-text-dark);
}

.yaer {
  margin-top: 3px;
}

.year > span {
  padding: 5px 10px;
  border: 1px solid var(--gray-light);
  border-radius: 3px;
  font-size: var(--font-size-small);
}
</style>
