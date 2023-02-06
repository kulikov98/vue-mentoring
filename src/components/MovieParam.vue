<script setup lang="ts">
defineProps<{
    unit?: string;
    value?: string;
}>();
</script>

<template>
    <div v-if="unit && value" data-testid="movie-param">
        <span class="value">{{ value }}</span>
        <span class="unit">{{ unit }}</span>
    </div>
</template>

<style scoped>
    .value {
        margin-right: 5px;
        color: var(--pink);
        font-size: 28px;
        font-weight: 300;
    }
    .unit {
        color: var(--gray-text-dark);
        font-size: var(--font-size-medium);
    }
</style>
