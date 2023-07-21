<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <ion-title class="font-sans">Anunturi</ion-title>
                <ion-buttons slot="end">
                    <ion-button fill="clear" router-link="/search">
                        <ion-icon slot="icon-only" :icon="searchOutline" />
                    </ion-button>
                </ion-buttons>
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div id="container">
                <strong>Home page</strong>
            </div>
        </ion-content>

        <ion-footer class="p-2 bg-[#1f1f1f]">
            <BottomBar />
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonContent,
    IonToolbar,
    IonIcon,
    IonPage,
    IonFooter,
    IonHeader,
    IonButtons,
    IonButton,
    IonTitle,
} from "@ionic/vue";
import { searchOutline } from "ionicons/icons";

import BottomBar from "@/components/layout/BottomBar.vue";
</script>

<style scoped>
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
}
</style>
