<script setup lang="ts">
import { ref, watch } from 'vue';
import AppHeader from './components/AppHeader.vue';
import AppButtonToggle from './components/AppButtonToggle.vue';

import MovieSearch from './components/MovieSearch.vue';
import MovieList from './components/MovieList.vue';
import MovieDescription from './components/MovieDescription.vue';
import { SearchBy, SortBy } from './helpers/constants';
import { useMovieStore } from './stores/MovieStore';

const store = useMovieStore();
const sortBy = ref(SortBy.ReleaseDate);
const searchBy = ref(SearchBy.Title);
const searchQuery = ref('');
const selectedMovie = ref();

const sortByProps = {
  inputName: 'sort-by',
  buttons: [{ name: SortBy.ReleaseDate }, { name: SortBy.Rating }],
  selected: sortBy.value,
  title: 'sort by',
};
const searchByProps = {
  inputName: 'search-by',
  buttons: [{ name: SearchBy.Title }, { name: SearchBy.Genre }],
  selected: searchBy.value,
  title: 'search by',
};

const search = () => {
  if (searchQuery.value === '') {
    store.getMoviesDiscovery(sortBy.value);
  } else {
    store.getMovies(searchQuery.value);
  }
};

watch(sortBy, search);
watch(searchQuery, search);

// initial load
search();
</script>

<template>
  <!-- Header -->
  <AppHeader
    :withSearch="Boolean(selectedMovie)"
    @show-search="selectedMovie = null"
  >
    <div
      v-if="Boolean(selectedMovie)"
      class="movie-description"
    >
      <MovieDescription :="selectedMovie" />
    </div>
    <div
      v-else
      class="movie-search"
    >
      <MovieSearch
        :searchQuery="searchQuery"
        @search="(v) => (searchQuery = v)"
      />
      <AppButtonToggle
        :="searchByProps"
        @selected="(v) => (searchBy = v)"
      />
    </div>
  </AppHeader>

  <!-- Sort -->
  <section class="sort">
    <AppButtonToggle
      :="sortByProps"
      @selected="(v) => (sortBy = v)"
    ></AppButtonToggle>
  </section>

  <!-- Search results -->
  <section class="search-results">
    <MovieList @select-movie="(movie) => (selectedMovie = movie)" />
  </section>
</template>

<style>
.movie-search {
  max-width: 960px;
  padding: 55px 0 85px 0;
  margin: 0 auto;
}

.movie-description {
  padding: 40px 0;
}

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
