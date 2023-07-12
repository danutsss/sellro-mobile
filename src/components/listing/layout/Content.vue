<template>
    <!-- {{ listing.result }} -->
    <swiper :modules="[Pagination]" :slides-per-view="1" :pagination="true">
        <swiper-slide
            v-for="picture in listing.result.pictures"
            :key="picture.id">
            <img
                :src="picture.url.medium"
                alt="listing picture"
                class="object-cover w-screen" />
        </swiper-slide>
    </swiper>

    <div id="listingInfo">
        <div id="listingTitle" class="p-3">
            <div class="flex justify-between">
                <span
                    class="flex items-center text-[0.50rem] leading-[0.7rem] text-gray-400">
                    <ion-icon :icon="time" class="text-white mr-1"></ion-icon>
                    {{ formatDate(listing.result.created_at) }}
                </span>
                <span
                    class="flex items-center text-[0.50rem] leading-[0.7rem] text-gray-400">
                    <ion-icon
                        :icon="folderOpen"
                        class="text-white mr-1"></ion-icon>
                    {{ listing.result.category.name }}
                </span>
                <span
                    class="flex items-center text-[0.50rem] leading-[0.7rem] text-gray-400">
                    <ion-icon
                        :icon="location"
                        class="text-white mr-1"></ion-icon>
                    {{ listing.result.city.name }}
                </span>
                <span
                    class="flex items-center text-[0.50rem] leading-[0.7rem] text-gray-400">
                    <ion-icon :icon="eye" class="text-white mr-1"></ion-icon>
                    Vizualizari: {{ listing.result.visits }}
                </span>
            </div>
            <h1 class="font-sans text-2xl mt-2">
                {{ listing.result.title }}
            </h1>
            <h1 class="font-bold font-sans text-3xl">
                {{ formatPrice(listing.result.price) }}
            </h1>
        </div>
    </div>

    <div id="listingExtraFields" class="px-3 py-3">
        <h1 class="font-sans text-md ml-1">Alte detalii</h1>
        <div id="extraFields" class="flex flex-wrap">
            <div
                v-for="extraField in listing.extra.fieldsValues"
                :key="extraField.id">
                <ion-chip
                    v-if="extraField.name !== 'Features'"
                    color="primary"
                    class="rounded-sm">
                    <ion-label class="text-[0.50rem]">
                        {{ extraField.name }}:
                        <br />
                        <span class="font-bold text-white">{{
                            extraField.value
                        }}</span>
                    </ion-label>
                </ion-chip>

                <div v-if="extraField.name === 'Features'">
                    <ion-chip
                        v-for="(feature, index) in extraField.value"
                        color="primary"
                        class="rounded-sm"
                        :key="index">
                        <ion-label class="text-[0.50rem]">
                            Feature:
                            <br />
                            <span class="font-bold text-white">
                                {{ feature }}
                            </span>
                        </ion-label>
                    </ion-chip>
                </div>
            </div>
        </div>
    </div>

    <HorizontalLine />

    <div id="listingDescription" class="p-3">
        <h1 class="font-sans text-sm uppercase font-bold">Descriere</h1>
        <p class="font-sans text-xs">
            {{ listing.result.description }}
        </p>
    </div>

    <!--<ion-card
        v-if="listing.result.user_id === authStore.currentUser?.result.id">
        <ion-card-header class="border-b text-center">
            Administreaza anuntul
        </ion-card-header>
        <ion-card-content class="flex flex-col mt-3">
            <ion-button
                color="primary"
                class="normal-case"
                :router-link="`/posts/${listing.result.id}/edit`">
                Modifica anunt
            </ion-button>
            <ion-button
                fill="outline"
                color="warning"
                class="normal-case"
                @click="archiveListing(listing.result.id)">
                Arhiveaza anunt
            </ion-button>
        </ion-card-content>
    </ion-card> -->

    <HorizontalLine />

    <ShareButtons />
</template>

<script setup lang="ts">
import {
    IonIcon,
    IonButton,
    IonCard,
    IonCardHeader,
    IonCardContent,
    IonChip,
    IonLabel,
} from "@ionic/vue";
import { request } from "@/composables/api";
import { ref } from "vue";
import { API_ENDPOINT_POSTS, API_URL } from "@/constants";
import { Listing } from "@/interfaces/listing";
import { Options } from "@/interfaces/options";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import { formatDate, formatPrice } from "@/composables/format";
import { useAuthStore } from "@/store/authStore";
import { folderOpen, time, location, eye } from "ionicons/icons";

import HorizontalLine from "@/components/layout/HorizontalLine.vue";
import ShareButtons from "@/components/layout/ShareButtons.vue";

import "swiper/css";
import "swiper/css/pagination";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});
const authStore = useAuthStore();
let listing = ref(null) as any;

const listingReqParams: any = {
    belongLoggedUser: 0,
    detailed: 1,
};

const listingReqOpts: Options = {
    method: "GET",
    headers: {
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-AppApiToken": "UGt0TnB4TkRUWXdvbFAxME5zWlc2SHQ3bEtDU1diODA=",
        "X-AppType": "docs",
    },
};

const archiveOptions: Options = {
    method: "PUT",
    headers: {
        Authorization: `Bearer ${authStore.currentUser?.extra.authToken}`,
        "Content-Type": "application/json",
        Accept: "application/json",
        "X-AppApiToken": "UGt0TnB4TkRUWXdvbFAxME5zWlc2SHQ3bEtDU1diODA=",
        "X-AppType": "docs",
    },
};

const apiUrl = new URL(`${API_URL}/${API_ENDPOINT_POSTS}/${props.id}`);
Object.keys(listingReqParams).forEach((key) =>
    apiUrl.searchParams.append(key, listingReqParams[key])
);

listing = await request<Listing>(apiUrl.toString(), listingReqOpts);
console.log(listing);

const archiveListing = async (listingId: number) => {
    return await request<any>(
        `${API_URL}/${API_ENDPOINT_POSTS}/${listingId}/offline`,
        archiveOptions
    );
};
</script>
