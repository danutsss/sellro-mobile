<template>
    <ListingContent :id="id.toString()" />
</template>

<script setup lang="ts">
import ListingContent from "./layout/Content.vue";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});
</script>
