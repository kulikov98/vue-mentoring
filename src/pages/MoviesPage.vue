<script setup lang="ts">
// eslint-ignore no-unused-vars
import { storeToRefs } from 'pinia';
import AppHeader from '@/components/AppHeader.vue';
import AppButtonToggle from '@/components/AppButtonToggle.vue';

import MovieList from '@/components/MovieList.vue';
import { SearchBy, SortBy } from '@/helpers/constants';
import { useMovieStore } from '@/stores/MovieStore';
import { useRoute, useRouter } from 'vue-router';
import { onMounted, watch } from 'vue';

const route = useRoute();
const router = useRouter();
const store = useMovieStore();
const { searchBy } = storeToRefs(store);

const sortByProps = {
  inputName: 'sort-by',
  buttons: [{ name: SortBy.ReleaseDate }, { name: SortBy.Rating }],
  title: 'sort by',
  selected: route.query['sort-by'] as string ?? SortBy.Rating,
};

const search = () => {
  const sortByQueryParamValue = route.query['sort-by'] as SortBy;
  const searchByQueryParamValue = route.query['search-by'] as SearchBy;

  if (Object.values(SortBy).includes(sortByQueryParamValue)) {
    store.setSortBy(sortByQueryParamValue);
  }
  if (Object.values(SearchBy).includes(searchByQueryParamValue)) {
    store.setSearchBy(searchByQueryParamValue);
  }

  store.search((route.query?.search as string) ?? '');
};

onMounted(async () => {
  await store.getGenres();
  search();
});

watch(() => route.query, (curr, prev) => {
  if (JSON.stringify(curr) !== JSON.stringify(prev)) {
    search();
  }
});
</script>

<template>
  <!-- Header -->
  <AppHeader />

  <!-- Sort -->
  <section class="sort">
    <AppButtonToggle
      v-if="searchBy === SearchBy.Genre"
      :="sortByProps"
      @selected="(v) => router.push({ query: { ...route.query, 'sort-by': v } })"
    ></AppButtonToggle>
  </section>

  <!-- Search results -->
  <section class="search-results">
    <MovieList />
  </section>
</template>

<style>
.sort {
  display: flex;
  justify-content: flex-end;
  padding: 20px 120px;
  background: var(--gray-dark);
}

.search-results {
  display: flex;
  flex-direction: column;
  flex-grow: 1;
  padding: 70px 60px;
  background: var(--black);
}
</style>
