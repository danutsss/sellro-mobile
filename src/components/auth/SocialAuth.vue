<template>
    <div class="flex flex-col p-3">
        <ion-button class="font-bold" type="submit" color="dark">
            <ion-icon
                class="mr-1 text-blue-500"
                slot="icon-only"
                :icon="logoFacebook"></ion-icon>
            Continua cu Facebook
        </ion-button>
        <ion-button class="font-bold" type="submit" color="dark">
            <ion-icon
                class="mr-1 text-red-500"
                slot="icon-only"
                :icon="logoGoogle"></ion-icon>
            Continua cu Google
        </ion-button>
    </div>
</template>

<script setup lang="ts">
import { IonButton, IonIcon } from "@ionic/vue";
import { logoFacebook, logoGoogle } from "ionicons/icons";
</script>
