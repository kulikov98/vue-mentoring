<script setup lang="ts">
import AppLogo from './AppLogo.vue';

defineProps<{
    withSearch: boolean;
}>();

const emit = defineEmits(['show-search']);
</script>

<template>
    <section>
        <header>
            <AppLogo />
            <button v-if="withSearch" @click="emit('show-search')">
                <font-awesome-icon icon="fa-solid fa-magnifying-glass" />
            </button>
        </header>
        <article>
            <slot></slot>
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

button {
    padding: 0;
    border: none;
    background: none;
    color: var(--pink);
    cursor: pointer;
    font-size: 22px;
    transform: rotateY(180deg);
}

button:hover {
    opacity: 0.95;
}
</style>
