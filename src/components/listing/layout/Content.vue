<template>
    <div>
        {{ listing.result }}
    </div>
</template>

<script setup lang="ts">
import { request } from "@/composables/api";
import { ref } from "vue";
import { API_ENDPOINT_POSTS, API_URL } from "@/constants";
import { Listing } from "@/interfaces/listing";
import { Options } from "@/interfaces/options";

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

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

const apiUrl = new URL(`${API_URL}/${API_ENDPOINT_POSTS}/${props.id}`);
Object.keys(listingReqParams).forEach((key) =>
    apiUrl.searchParams.append(key, listingReqParams[key])
);

listing = await request<Listing>(apiUrl.toString(), listingReqOpts);
console.log(listing);
</script>
