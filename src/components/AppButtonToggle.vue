<script setup lang="ts">
import { ref, watch } from 'vue';

const props = defineProps<{
    inputName: string,
    buttons: Array<{ name: string }>,
    selected?: string,
    title?: string,
}>();

const selected = ref(props.selected
    ? props.selected
    : props.buttons[0].name
);

const emit = defineEmits(['selected']);

watch(selected, () => {
    emit('selected', selected.value);
});
</script>

<template>
    <div class="button-toggle">
        <span class="title" v-if="title">{{ title }}</span>
        <label v-for="btn in buttons" :key="btn.name" :class="{ selected: selected === btn.name }">
            {{ btn.name }}
            <input type="radio" :name="inputName" :value="btn.name" v-model="selected">
        </label>
    </div>
</template>

<style scoped>
.button-toggle {
    display: flex;
    align-items: center;
}

.title {
    margin-right: 15px;
    color: var(--white);
}

input {
    display: none;
}

label {
    padding: 8px 20px;
    font-size: var(--font-size-small);
    text-transform: uppercase;
    background-color: var(--gray-light);
    color: var(--white);
    cursor: pointer;
}

label:first-of-type {
    border-top-left-radius: var(--form-radius);
    border-bottom-left-radius: var(--form-radius);
}

label:last-of-type {
    border-top-right-radius: var(--form-radius);
    border-bottom-right-radius: var(--form-radius);
}

.selected {
    background-color: var(--pink);
}
</style>
