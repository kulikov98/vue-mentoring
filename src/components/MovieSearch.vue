<script setup lang="ts">
import { SearchBy } from '@/helpers/constants';
import { useMovieStore } from '@/stores/MovieStore';
import { storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import AppButton from './AppButton.vue';
import AppInput from './AppInput.vue';
import AppButtonToggle from './AppButtonToggle.vue';

const store = useMovieStore();
const route = useRoute();
const router = useRouter();
const { genres } = storeToRefs(store);

const searchByProps = {
  inputName: 'search-by',
  buttons: [{ name: SearchBy.Title }, { name: SearchBy.Genre }],
  title: 'search by',
  selected: route.query['search-by'] as string ?? SearchBy.Title,
};

const suggestions = ref<string[]>([]);
const text = ref(route.query.search ?? '');
const onSearch = () => {
  router.push({ query: { ...route.query, search: text.value } });
};

const onInput = (str: string) => {
  text.value = str;

  const isSearchByName = route.query['search-by'] !== SearchBy.Genre;
  const isEqualToSuggestion = !!suggestions.value.find(
    (s) => s.toLowerCase() === str.toLowerCase(),
  );

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
  <div class="movie-search">
    <article>
      <h1>Find your movie</h1>
      <div class="search-block">
        <AppInput
          :init-value="route.query['search'] as string ?? ''"
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
    <AppButtonToggle
      :="searchByProps"
      @selected="(v) => router.push({ query: { ...route.query, 'search-by': v } })"
    />
  </div>
</template>

<style scoped>
.movie-search {
  max-width: 960px;
  padding: 55px 0 85px 0;
  margin: 0 auto;
}

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
