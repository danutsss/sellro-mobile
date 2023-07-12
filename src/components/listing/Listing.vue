<template>
    <ion-card class="p-2" v-for="post in listing.result.data" :key="post.id">
        <ion-card-header class="p-0 flex flex-row">
            <img
                :src="post.picture.url.big"
                alt="listing picture"
                class="h-24 w-24" />
            <div class="px-2">
                <ion-card-title class="text-sm font-bold">
                    {{ post.title }}
                    <!-- truncate the title -->
                </ion-card-title>
                <ion-card-subtitle class="text-xs">
                    {{ formatPrice(post.price) }}
                </ion-card-subtitle>
            </div>
        </ion-card-header>

        <ion-card-content class="p-0 mt-2">
            <div class="flex flex-row justify-end">
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
        </ion-card-content>
    </ion-card>
</template>

<script setup lang="ts">
import {
    IonCard,
    IonCardHeader,
    IonCardTitle,
    IonCardSubtitle,
    IonCardContent,
    IonButton,
    IonIcon,
} from "@ionic/vue";
import { request } from "@/composables/api";
import { Options } from "@/interfaces/options";
import { ref } from "vue";
import { API_URL, API_ENDPOINT_POSTS } from "@/constants";
import { useAuthStore } from "@/store/authStore";
import { eye, location } from "ionicons/icons";
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
    perPage: "2",
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

const formatPrice = (price: number) => {
    return new Intl.NumberFormat("ro-RO", {
        style: "currency",
        currency: "RON",
    }).format(price);
};

listing = await request<Listing>(apiUrl.toString(), options);

console.log(listing);
</script>
