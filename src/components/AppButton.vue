<script setup lang="ts">
import { computed } from 'vue';

const props = defineProps<{
  label: string,
  primary?: boolean,
  backgroundColor?: string,
  size?: 'medium' | 'large',
}>();

const emit = defineEmits(['click']);

const classes = computed(() => ({
  button: true,
  'button--primary': props.primary,
  'button--secondary': !props.primary,
  [`button--${props.size || 'medium'}`]: true,
}));

const style = computed(() => ({
  backgroundColor: props.backgroundColor,
}));
</script>

<template>
  <button type="button" :class="classes" @click="emit('click')" :style="style">{{ label }}</button>
</template>

<style scoped>
.button {
  border: 0;
  border-radius: var(--form-radius);
  cursor: pointer;
  display: inline-block;
  line-height: 1;
}

.button:hover {
  opacity: 0.95;
}

.button--primary {
  color: var(--white);
  background-color: var(--pink);
}

.button--medium {
  font-size: var(--font-size-medium);
  padding: 14px 41px;
}

.button--large {
  font-size: var(--font-size-large);
  padding: 18px 82px;
}
</style>
