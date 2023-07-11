<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <BackButton :title="'Setari profil'" />
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true">
            <div id="container">
                <strong>Settings</strong>
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
    IonPage,
    IonFooter,
    IonHeader,
    IonToolbar,
} from "@ionic/vue";
import BottomBar from "@/components/layout/BottomBar.vue";
import BackButton from "@/components/layout/BackButton.vue";
</script>
