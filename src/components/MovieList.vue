<script setup lang="ts">
import MovieCard, { MovieCardProps } from './MovieCard.vue';

defineProps<{
    movies: Array<MovieCardProps>;
}>();
</script>

<template>
    <section class="movie-list" v-if="movies.length > 0">
        <MovieCard v-for="movie in movies" :key="movie.name" :="movie" />
    </section>
    <span class="not-found" v-else>No films found</span>
</template>

<style scoped>
.movie-list {
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
    grid-gap: 57px;
}

.not-found {
    min-height: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    color: var(--gray-text);
    font-size: var(--font-size-giant);
    font-weight: 300;
}
</style>
