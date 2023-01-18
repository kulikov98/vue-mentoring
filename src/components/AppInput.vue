<script setup lang="ts">
/* eslint-disable vuejs-accessibility/label-has-for */
import { ref, watch } from 'vue';

interface Props {
  initValue?: string;
  placeholder?: string;
  suggestions?: string[];
}

const props = withDefaults(defineProps<Props>(), {
  initValue: '',
  placeholder: '',
});

const text = ref(props.initValue);
const emit = defineEmits(['input', 'keydown-enter']);

watch(text, () => emit('input', text.value));
</script>

<template>
  <label>
    <input
      class="input"
      type="text"
      v-model="text"
      :placeholder="placeholder"
      @keydown.enter="emit('keydown-enter')"
    />
    <ul
      class="suggestions"
      v-if="suggestions?.length"
    >
      <li
        class="suggestion"
        v-for="suggestion in suggestions"
        :key="suggestion"
        @click="text = suggestion"
        @keydown.enter="text = suggestion"
      >
        {{ suggestion }}
      </li>
    </ul>
  </label>
  <!-- <span style="color: white">{{ suggestions }}</span> -->
</template>

<style scoped>
label {
  position: relative;
  width: 100%;
}
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
  box-sizing: border-box;
}

.input::placeholder {
  color: var(--gray-light);
  font-size: var(--font-size-large);
}

.suggestions {
  position: absolute;
  background: white;
  top: 55px;
  margin: 0;
  padding: 0;
  width: 100%;
  list-style: none;
}

.suggestion {
  padding: 10px 20px;
}

.suggestion:hover {
  cursor: pointer;
  background-color: grey;
}
</style>
