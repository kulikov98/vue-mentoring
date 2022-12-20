<script setup lang="ts">
import { computed } from 'vue';

interface Props {
  label: string,
  backgroundColor?: string,
  size?: 'medium' | 'large',
}

const props = withDefaults(defineProps<Props>(), {
  size: 'medium',
});

const emit = defineEmits(['click']);

const classes = computed(() => ({
  button: true,
  [`button--${props.size}`]: true,
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
  color: var(--white);
  background-color: var(--pink);
}

.button:hover {
  opacity: 0.95;
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
