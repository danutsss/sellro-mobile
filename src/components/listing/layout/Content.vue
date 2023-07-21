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
            <h1 class="font-bold font-sans text-3xl flex items-center">
                {{ formatPrice(listing.result.price) }}

                <small
                    v-if="listing.result.negotiable"
                    class="ml-1 text-xs uppercase bg-[#2ecc71] p-[0.15rem] rounded">
                    Negociabil
                </small>
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

    <HorizontalLine />

    <div id="optionsListing" class="p-3">
        <div id="popoverOptions">
            <ion-button fill="outline" class="w-full" id="showOptions"
                >Optiuni anunt</ion-button
            >
            <ion-popover trigger="showOptions">
                <ion-list v-on:click="dismissPopover">
                    <ion-item button @click="archiveListing(listing.result.id)">
                        <ion-label>Arhiveaza anuntul</ion-label>
                    </ion-item>
                    <ion-item
                        button
                        :router-link="`/listing/${listing.result.id}/edit`">
                        <ion-label>Editeaza anuntul</ion-label>
                    </ion-item>
                </ion-list>
            </ion-popover>
        </div>
        <ion-button @click="share" color="primary" class="w-full">
            Distribuie anuntul
        </ion-button>
    </div>

    <HorizontalLine />

    <Footer />
</template>

<script setup lang="ts">
import {
    IonIcon,
    IonChip,
    IonButton,
    IonList,
    IonPopover,
    IonLabel,
    IonItem,
} from "@ionic/vue";
import { request } from "@/composables/api";
import { ref } from "vue";
import { API_ENDPOINT_POSTS, API_URL } from "@/constants";
import { requestOptions } from "@/composables/requestOptions";
import { Listing } from "@/interfaces/listing";
import { Options } from "@/interfaces/options";
import { Swiper, SwiperSlide } from "swiper/vue";
import { Pagination } from "swiper/modules";
import { formatDate, formatPrice } from "@/composables/format";
import { useAuthStore } from "@/store/authStore";
import { folderOpen, time, location, eye } from "ionicons/icons";
import { Share } from "@capacitor/share";

import HorizontalLine from "@/components/layout/HorizontalLine.vue";
import Footer from "./Footer.vue";

import "swiper/css";
import "swiper/css/pagination";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});
const authStore = useAuthStore();
console.log(import.meta.env);
let listing = ref(null) as any;

const listingReqParams: any = {
    belongLoggedUser: 0,
    detailed: 1,
};

const listingReqOpts: Options = requestOptions();
const archiveOptions: Options = requestOptions(
    authStore.currentUser?.extra.authToken,
    "PUT"
);

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

const share = async () => {
    await Share.share({
        title: `${listing.result.title} - ${listing.result.price} RON`,
        text: listing.result.description,
        url: listing.result.url,
        dialogTitle: `Distribuie anuntul ${listing.result.title}`,
    });
};

const dismissPopover = async () => {
    const popover = document.querySelector("ion-popover");
    return await popover?.dismiss();
};
</script>

<style scoped>
ion-chip {
    cursor: auto;
}
</style>
