<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div id="container">
                <strong>Profile</strong>
            </div>
        </ion-content>

        <ion-footer style="padding: 6px; background: #1f1f1f">
            <BottomBar />
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonFooter } from "@ionic/vue";
import { useAuthStore } from "@/store/authStore";

import BottomBar from "@/components/layout/BottomBar.vue";

const authStore = useAuthStore();
</script>
