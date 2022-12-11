<script setup lang="ts">
import AppLogo from './AppLogo.vue';

defineProps<{
    withSearch: boolean;
}>();

const emit = defineEmits(['click']);
</script>

<template>
    <header>
        <AppLogo />
        <button v-if="withSearch" @click="emit('click')">
            <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
        </button>
    </header>
</template>

<style scoped>
header {
    display: flex;
    justify-content: space-between;
    align-items: center;
}

button {
    padding: 0;
    border: none;
    background: none;
    color: var(--pink);
    cursor: pointer;
    font-size: 22px;
    transform:rotateY(180deg);
}

button:hover {
    opacity: 0.95;
}
</style>
