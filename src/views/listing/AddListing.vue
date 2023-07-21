<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <BackButton :title="'Adauga anunt'" />
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">adauga anunt</ion-content>

        <ion-footer class="p-2 bg-[#1f1f1f]">
            <BottomBar />
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonHeader,
    IonToolbar,
    IonPage,
    IonFooter,
    IonContent,
} from "@ionic/vue";

import BottomBar from "@/components/layout/BottomBar.vue";
import BackButton from "@/components/layout/BackButton.vue";
</script>
