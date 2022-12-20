<script setup lang="ts">
interface Props {
    placeholder?: string
}

withDefaults(defineProps<Props>(), {
  placeholder: '',
});
</script>

<template>
    <label>
        <input class="input" type="text" :placeholder="placeholder">
    </label>
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
