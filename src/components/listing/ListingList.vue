<template>
    <ion-card class="p-2" v-for="post in listing.result.data" :key="post.id">
        <ion-card-header class="p-0 flex flex-row">
            <img
                :src="post.picture.url.big"
                alt="listing picture"
                class="h-24 w-24" />
            <div class="px-2">
                <ion-card-subtitle class="flex text-xs mb-1">
                    <div class="flex flex-row items-center">
                        <ion-icon
                            :icon="time"
                            class="text-white mr-1"></ion-icon>
                        Creat la data de {{ formatDate(post.created_at) }}
                    </div>
                </ion-card-subtitle>
                <ion-card-title class="text-xs mb-1">
                    {{ post.title }}
                    <!-- truncate the title -->
                </ion-card-title>
                <ion-card-subtitle class="text-md font-bold text-white">
                    {{ formatPrice(post.price) }}
                </ion-card-subtitle>

                <div class="flex mt-1">
                    <div class="flex flex-row mr-2">
                        <ion-icon
                            :icon="eye"
                            class="text-white text-sm mr-1"></ion-icon>
                        <span class="text-xs">{{ post.visits }}</span>
                    </div>
                    <div class="flex flex-row">
                        <ion-icon
                            :icon="location"
                            class="text-white text-sm mr-1"></ion-icon>
                        <span class="flex text-xs font-bold">
                            {{ post.country_code }}
                            <img
                                :src="post.country_flag_url"
                                alt="country flag"
                                class="ml-1" />
                        </span>
                    </div>
                </div>
            </div>
        </ion-card-header>

        <div class="p-1">
            <ion-button
                color="primary"
                class="w-full normal-case"
                :router-link="`/${post.slug}/${post.id}`">
                Vizualizare anunt
            </ion-button>
            <ion-button
                fill="outline"
                color="primary"
                class="w-full normal-case"
                :router-link="`/listing/${post.id}/edit`">
                Modifica anunt
            </ion-button>
            <ion-button
                color="warning"
                class="w-full normal-case"
                @click="archiveListing(post.id)">
                Pune-l offline
            </ion-button>
        </div>
    </ion-card>
</template>

<script setup lang="ts">
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonButton,
    IonIcon,
} from "@ionic/vue";
import { request } from "@/composables/api";
import { Options } from "@/interfaces/options";
import { formatPrice, formatDate } from "@/composables/format";
import { ref } from "vue";
import { API_URL, API_ENDPOINT_POSTS } from "@/constants";
import { useAuthStore } from "@/store/authStore";
import { eye, location, time } from "ionicons/icons";
import { Listing } from "@/interfaces/listing";

let listing = ref(null) as any;

const authStore = useAuthStore();
const apiUrl: URL = new URL(`${API_URL}/${API_ENDPOINT_POSTS}`);

const params: any = {
    op: "null",
    belongLoggedUser: "1",
    pendingApproval: "0",
    archived: "0",
    embed: "pictures",
    sort: "created_at",
    perPage: "5",
    detailed: "1",
};
Object.keys(params).forEach((key) =>
    apiUrl.searchParams.append(key, params[key])
);

const options: Options = {
    method: "GET",
    headers: {
        Authorization: `Bearer ${authStore.currentUser?.extra.authToken}`,
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

listing = await request<Listing>(apiUrl.toString(), options);

const archiveListing = async (postId: number) => {
    return await request<any>(
        `${API_URL}/${API_ENDPOINT_POSTS}/${postId}/offline`,
        archiveOptions
    );
};
</script>
