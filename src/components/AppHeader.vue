<script setup lang="ts">
import { useRoute } from 'vue-router';
import AppLogo from './AppLogo.vue';

const route = useRoute();
</script>

<template>
  <section>
    <header>
      <router-link class="link" to="/">
        <AppLogo />
      </router-link>

      <router-link
        v-if="route.name === 'details'"
        class="search"
        :to="{ path: '/movies', query: route.query }"
      >
        <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
      </router-link>
    </header>
    <article>
      <router-view />
    </article>
  </section>
</template>

<style scoped>
section {
  background: url('../assets/header-bg.jpeg');
  background-size: cover;
  padding: 20px 55px;
}

header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.search {
  padding: 0;
  border: none;
  background: none;
  color: var(--pink);
  cursor: pointer;
  font-size: 22px;
  transform: rotateY(180deg);
}

.link {
  text-decoration: none;
}

button:hover {
  opacity: 0.95;
}
</style>
