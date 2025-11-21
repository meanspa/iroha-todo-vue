<script setup>
    const props = defineProps({
        icon: String,
        alt: String,
        title: String
    });
    const emit = defineEmits(['click'])
</script>

<template>
    <button
        type="button"
        class="button"
        :title="title"
        @click="$emit('click')"
    >
        <img 
            v-if="icon"
            :src="icon" 
            :alt="alt" 
            class="icon" 
        />
        <slot />
    </button>
</template>

<style scoped>
.button {
    padding: 0.5rem 1rem;
    font-size: 1rem;
    background-color: blue;
    color: aliceblue;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.5rem;
}

.button:hover { background-color: darkblue; }

.icon {
    width: 32px;
    height: 32px;
    object-fit: contain;
}
</style>
