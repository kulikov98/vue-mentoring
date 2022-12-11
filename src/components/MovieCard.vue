<script setup lang="ts">
import { computed } from 'vue';
import { genPosterAltText } from '../helpers/functions';

export interface MovieCardProps {
    image: string;
    name: string;
    genre?: string;
    year?: string;
    duration?: string;
    rating?: string;
    description?: string;
}

const props = withDefaults(defineProps<MovieCardProps>(), {
  image: '/path/to/missing/image', // TODO: add image
  name: '',
  genre: '',
  year: '',
});

const altText = computed(() => genPosterAltText(props.name));
</script>

<template>
    <article class="card">
        <img :src="image" :alt="altText">
        <footer>
            <div class="description">
                <span class="name">{{ name }}</span>
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
