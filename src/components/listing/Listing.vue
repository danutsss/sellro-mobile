<template>
    <div>
        <template>
            <div>
                <ListingContent :id="id.toString()" />
            </div>
        </template>
    </div>
</template>

<script setup lang="ts">
import { useRoute } from "vue-router";
import ListingContent from "./layout/Content.vue";

const route = useRoute();
const { id } = route.params;
</script>
