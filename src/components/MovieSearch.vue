<script setup lang="ts">
import { SearchBy } from '@/helpers/constants';
import { useMovieStore } from '@/stores/MovieStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import AppButton from './AppButton.vue';
import AppInput from './AppInput.vue';

const store = useMovieStore();
const { searchQuery, searchBy, genres } = storeToRefs(store);

const suggestions = ref<string[]>([]);
const text = ref(searchQuery.value);
const onSearch = () => store.search(text.value);

const onInput = (str: string) => {
  text.value = str;

  const isSearchByName = searchBy.value !== SearchBy.Genre;
  const isEqualToSuggestion = !!suggestions.value
    .find((s) => s.toLowerCase() === str.toLowerCase());

  if (str === '' || isSearchByName || isEqualToSuggestion) {
    suggestions.value = [];
    return;
  }

  suggestions.value = genres.value
    .filter((genre) => genre.name.toLowerCase().startsWith(str.toLowerCase()))
    .map((genre) => genre.name);
};
</script>

<template>
  <article>
    <h1>Find your movie</h1>
    <div class="search-block">
      <AppInput
        :init-value="searchQuery"
        :suggestions="suggestions"
        @input="onInput"
        @keydown-enter="onSearch"
        placeholder="Search"
      />
      <AppButton
        class="search-btn"
        size="large"
        label="SEARCH"
        @click="onSearch"
      />
    </div>
  </article>
</template>

<style scoped>
h1 {
  font-size: 44px;
  text-transform: uppercase;
  letter-spacing: 2px;
  font-weight: 300;
  margin: 0 0 37px 0;
  color: var(--white);
}

.search-block {
  display: flex;
  justify-content: space-between;
  margin-bottom: 15px;
}

.search-btn {
  margin-left: 15px;
}
</style>
