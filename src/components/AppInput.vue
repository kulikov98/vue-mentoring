<script setup lang="ts">
/* eslint-disable vuejs-accessibility/form-control-has-label */
import { ref, watch } from 'vue';

interface Props {
  initValue?: string;
  placeholder?: string;
}

const props = withDefaults(defineProps<Props>(), {
  initValue: '',
  placeholder: '',
});

const text = ref(props.initValue);
const emit = defineEmits(['input', 'keydown.enter']);

watch(text, () => emit('input', text.value));
</script>

<template>
  <input
    class="input"
    type="text"
    v-model="text"
    :placeholder="placeholder"
    @keydown.enter="emit('keydown.enter')"
  />
</template>

<style scoped>
.input {
  width: 100%;
  height: 55px;
  border: none;
  padding: 0 20px;
  border-radius: var(--form-radius);
  font-size: 19px;
  outline: none;
  color: var(--white);
  background-color: var(--transparent-black);
}

.input::placeholder {
  color: var(--gray-light);
  font-size: var(--font-size-large);
}
</style>
