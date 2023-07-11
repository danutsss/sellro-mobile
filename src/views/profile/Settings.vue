<template>
    <ion-page>
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
import { IonContent, IonPage, IonFooter } from "@ionic/vue";
import BottomBar from "@/components/layout/BottomBar.vue";
</script>
