<template>
    <ion-page>
        <ion-header>
            <ion-toolbar>
                <BackButton :title="'Editeaza anunt'" />
            </ion-toolbar>
        </ion-header>
        <ion-content :fullscreen="true"> edit listing {{ id }} </ion-content>

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
import { useRoute } from "vue-router";

import BottomBar from "@/components/layout/BottomBar.vue";
import BackButton from "@/components/layout/BackButton.vue";

const route = useRoute();
const { id } = route.params;
</script>
