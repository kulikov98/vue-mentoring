<script setup lang="ts">
/* eslint-disable camelcase, vuejs-accessibility/alt-text */
import { computed } from 'vue';
import MovieParam from './MovieParam.vue';

/*
 * Cannot use IMovie interface because of https://github.com/vuejs/core/issues/4294
 * it works in Vue with 'unplugin-vue-macros' as suggested here:
 * https://github.com/vuejs/core/issues/4294#issuecomment-1316097560
 * but I wansn't able to make it work with storybook
 */
const props = defineProps<{
    adult: boolean;
    backdrop_path: string | null;
    genre_ids: number[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
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
    <article>
        <img v-image:poster="{ path: poster_path, title }">
        <div class="description">
            <header>
                <h1 class="title">{{ title }}</h1>
                <span class="rating"></span>
            </header>
            <span class="genre">{{ genre }}</span>
            <div class="params">
                <MovieParam unit="year" :value="year" />
                <!-- <MovieParam unit="min" :value="duration" /> -->
            </div>
            <p>{{ overview }}</p>
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
