<template>
    <div id="shareButtons">
        <div class="flex flex-col justify-center items-center mt-2">
            <h3 class="text-xs font-bold mr-2">Distribuie anuntul</h3>
            <div class="flex flex-row">
                <ion-button
                    fill="outline"
                    color="secondary"
                    @click="copyLink()">
                    <ion-icon :icon="link"></ion-icon>
                </ion-button>
                <ion-button fill="outline" color="primary">
                    <ion-icon :icon="logoFacebook"></ion-icon>
                </ion-button>
                <ion-button fill="outline" color="success">
                    <ion-icon :icon="logoWhatsapp"></ion-icon>
                </ion-button>
            </div>
        </div>
    </div>
</template>

<script setup lang="ts">
import { IonIcon, IonButton } from "@ionic/vue";
import { useRoute } from "vue-router";
import { link, logoFacebook, logoWhatsapp } from "ionicons/icons";

const route = useRoute();
const copyLink = () => {
    const url = `${window.location.origin}${route.path}`;
    navigator.clipboard.writeText(url);
    console.log(url);
};
</script>
