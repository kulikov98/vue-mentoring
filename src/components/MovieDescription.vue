<script setup lang="ts">
/* eslint-disable camelcase, vuejs-accessibility/alt-text */
import { useMovieStore } from '@/stores/MovieStore';
import { storeToRefs } from 'pinia';
import { computed } from 'vue';
import MovieParam from './MovieParam.vue';

const store = useMovieStore();
const { currentMovie: movie } = storeToRefs(store);

const genre = computed(() => movie?.value?.genres?.join(', '));
const year = computed(() => movie?.value?.release_date?.split('-')[0]);
</script>

<template>
    <article v-if="movie">
        <img v-image:poster="{ path: movie.poster_path, title: movie.title }">
        <div class="description">
            <header>
                <h1 class="title">{{ movie.title }}</h1>
                <span class="rating"></span>
            </header>
            <span class="genre">{{ genre }}</span>
            <div class="params">
                <MovieParam unit="year" :value="year" />
                <!-- <MovieParam unit="min" :value="duration" /> -->
            </div>
            <p>{{ movie.overview }}</p>
        </div>
    </article>
</template>

<style scoped>
article {
    display: grid;
    grid-auto-rows: auto;
    grid-template-columns: 280px minmax(280px, 1fr);
    column-gap: min(60px, 6%);
    color: var(--gray-text);
}

@media screen and (max-width: 620px) {
    article {
        grid-template-columns: 1fr;
    }
}

img {
    width: 100%;
}

.description {
    display: flex;
    flex-direction: column;
}

.title {
    font-size: var(--font-size-giant);
    font-weight: 300;
    margin-top: 30px;
    margin-bottom: 10px;
}

.params {
    margin-top: 27px;
    display: flex;
    gap: 10px
}

p {
    margin-top: 23px;
    line-height: 1.5em;
}
</style>
