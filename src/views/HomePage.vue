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
            <div id="homeSections" class="p-3">
                <div id="appStats" class="mb-2">
                    <h1
                        class="font-sans text-center text-sm uppercase font-bold mb-2">
                        Statistici aplicatie
                    </h1>
                    <HorizontalLine />
                    <div class="flex justify-center gap-10 p-6">
                        <div class="flex flex-row items-center">
                            <ion-icon
                                :icon="megaphoneOutline"
                                class="text-white text-4xl mr-2"></ion-icon>
                            <div class="flex flex-col">
                                <span class="text-md font-bold text-white">
                                    {{ appStats.posts }}
                                </span>
                                <span class="text-xs">Anunturi publicate</span>
                            </div>
                        </div>
                        <div class="flex flex-row items-end">
                            <ion-icon
                                :icon="personOutline"
                                class="text-white mr-2 text-4xl"></ion-icon>
                            <div class="flex flex-col">
                                <span class="text-md font-bold text-white">
                                    {{ appStats.users }}
                                </span>
                                <span class="text-xs">Vanzatori</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="categoriesList">
                    <h1
                        class="font-sans text-center text-sm uppercase font-bold mb-2">
                        Categorii
                    </h1>
                    <HorizontalLine />
                    <CategoriesList />
                </div>

                <div id="latestPosts">
                    <h1
                        class="font-sans text-center text-sm uppercase font-bold mb-2">
                        Cele mai noi anunturi
                    </h1>
                    <HorizontalLine />
                    <div id="gridListings">
                        <ion-card
                            v-for="listing in latestListings"
                            :key="listing.id"
                            :router-link="`/${listing.slug}/${listing.id}`">
                            <ion-card-header class="p-0 flex flex-col">
                                <img
                                    :src="listing.picture.url.big"
                                    alt="Listing picture"
                                    class="h-36" />
                                <div class="p-2">
                                    <ion-card-title class="text-xs mb-1">
                                        {{ listing.title }}
                                    </ion-card-title>
                                    <ion-card-subtitle
                                        class="text-md font-bold text-white">
                                        {{ formatPrice(listing.price) }}
                                    </ion-card-subtitle>
                                </div>
                            </ion-card-header>

                            <ion-card-content>
                                <div class="flex text-xs flex-row items-center">
                                    <ion-icon
                                        :icon="time"
                                        class="text-white mr-1"></ion-icon>
                                    {{ formatDate(listing.created_at) }}
                                </div>
                            </ion-card-content>
                        </ion-card>
                    </div>
                </div>
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
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
} from "@ionic/vue";
import {
    searchOutline,
    time,
    megaphoneOutline,
    personOutline,
} from "ionicons/icons";
import { API_URL, API_ENDPOINT_HOMESECTIONS } from "@/constants";
import { request } from "@/composables/api";
import { requestOptions } from "@/composables/requestOptions";
import { ref } from "vue";
import { formatDate, formatPrice } from "@/composables/format";

import BottomBar from "@/components/layout/BottomBar.vue";
import HorizontalLine from "@/components/layout/HorizontalLine.vue";
import CategoriesList from "@/components/home/CategoriesList.vue";

let latestListings = ref(null) as any;
let appStats = ref(null) as any;

const url = new URL(`${API_URL}/${API_ENDPOINT_HOMESECTIONS}`);
await request(url.toString(), requestOptions("", "GET")).then(
    (response: any) => {
        console.log(response);
        latestListings = response.result.data.getLatestPosts.data.latest.posts;
        appStats = response.result.data.getStats.data.count;
    }
);
</script>

<style scoped>
#gridListings {
    display: grid;
    grid-template-columns: 1fr 1fr;
}
</style>
