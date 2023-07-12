<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <Suspense>
                <Listing :id="id.toString()" />
            </Suspense>
        </ion-content>

        <ion-footer class="p-2 bg-[#1f1f1f]">
            <BottomBar />
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import { IonPage, IonContent, IonFooter } from "@ionic/vue";
import { useRoute } from "vue-router";

import BottomBar from "@/components/layout/BottomBar.vue";
import Listing from "@/components/listing/Listing.vue";

const route = useRoute();
const { id } = route.params;
</script>
