<template>
    {{ listing }}
</template>

<script setup lang="ts">
import { ref } from "vue";
import { Listing } from "@/interfaces/listing";
import { Options } from "@/interfaces/options";
import { API_URL, API_ENDPOINT_POSTS } from "@/constants";
import { request } from "@/composables/api";

let listing = ref(null) as any;

const props = defineProps({
    id: {
        type: String,
        required: true,
    },
});

const listingReqParams: any = {
    belongLoggedUser: "0",
    detailed: "1",
};

const listReqOpts: Options = {
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

listing = await request<Listing>(apiUrl.toString(), listReqOpts);
console.log(listing);
</script>
