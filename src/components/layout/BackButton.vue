<template>
    <ion-buttons slot="start">
        <ion-back-button :text="title"></ion-back-button>
    </ion-buttons>
</template>
<script setup lang="ts">
import { IonButtons, IonBackButton } from "@ionic/vue";

defineProps({
    title: {
        type: String,
        required: true,
    },
});
</script>
