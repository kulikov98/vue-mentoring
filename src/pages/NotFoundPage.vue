<script setup lang="ts">
import AppHeader from '../components/AppHeader.vue';
</script>

<template>
  <AppHeader></AppHeader>
  <div class="text">404 Not Found</div>
</template>

<style>
.header {
  height: 100vh;
}
.text {
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: center;
  height: 100vh;
  color: var(--gray-text);
  background-color: var(--gray-dark);
  font-size: var(--font-size-giant);
  font-weight: 300;
}
</style>
