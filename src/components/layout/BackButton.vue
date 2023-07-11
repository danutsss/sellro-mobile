<template>
    <ion-buttons slot="start">
        <ion-back-button></ion-back-button>
    </ion-buttons>
    <ion-title>{{ title }}</ion-title>
</template>
<script setup lang="ts">
import { IonButtons, IonBackButton, IonTitle } from "@ionic/vue";

defineProps({
    title: {
        type: String,
        required: true,
    },
});
</script>
