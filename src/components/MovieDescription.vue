<script setup lang="ts">
import { computed } from 'vue';
import { genPosterAltText } from '../helpers/functions';
import MovieParam from './MovieParam.vue';
// eslint-disable-next-line
import { MovieCardProps } from './MovieCard.vue';

/*
 * Cannot use MovieCardProps interface because of https://github.com/vuejs/core/issues/4294
 * It works in Vue with 'unplugin-vue-macros' as suggested here:
 * https://github.com/vuejs/core/issues/4294#issuecomment-1316097560
 * But I wansn't able to make it work with storybook
 */
const props = defineProps<{
    image: string;
    name: string;
    genre?: string;
    year?: string;
    duration?: string;
    rating?: string;
    description?: string;
}>();

const altText = computed(() => genPosterAltText(props.name));
</script>

<template>
    <article>
        <img :src="image" :alt="altText">
        <div class="description">
            <header>
                <h1 class="title">{{ name }}</h1>
                <span class="rating"></span>
            </header>
            <span class="genre">{{ genre }}</span>
            <div class="params">
                <MovieParam unit="year" :value="year" />
                <MovieParam unit="min" :value="duration" />
            </div>
            <p>{{ description }}</p>
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
