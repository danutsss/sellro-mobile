<template>
    <ion-buttons>
        <ion-button shape="round" router-link="/home">
            <ion-icon slot="icon-only" :icon="home"></ion-icon>
        </ion-button>

        <ion-button shape="round" router-link="/favorites">
            <ion-icon slot="icon-only" :icon="heart"></ion-icon>
        </ion-button>

        <ion-button shape="round" class="add" router-link="/post/add">
            <ion-icon slot="icon-only" :icon="add"></ion-icon>
        </ion-button>

        <ion-button shape="round" router-link="/messages">
            <ion-icon slot="icon-only" :icon="chatbubble"></ion-icon>
        </ion-button>

        <ion-button router-link="/profile">
            <ion-icon slot="icon-only" :icon="person"></ion-icon>
        </ion-button>
    </ion-buttons>
</template>

<script setup lang="ts">
import { IonButtons, IonButton, IonIcon } from "@ionic/vue";
import { add, person, home, heart, chatbubble } from "ionicons/icons";
import FavoritesPage from "@/views/FavoritesPage.vue";

const component = FavoritesPage;
</script>

<style scoped>
.add {
    background: var(--ion-color-primary);
    border-radius: 50%;
    width: 54px;
    height: 54px;
}
ion-buttons {
    justify-content: space-between;
}
</style>
