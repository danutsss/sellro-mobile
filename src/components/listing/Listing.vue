<template>
    <ListingContent :id="id.toString()" />
</template>

<script setup lang="ts">
import ListingContent from "./layout/Content.vue";

defineProps({
    id: {
        type: String,
        required: true,
    },
});
</script>
