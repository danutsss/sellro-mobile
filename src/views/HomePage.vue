<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div id="container">
                <strong>Home page</strong>
            </div>
        </ion-content>

        <ion-footer class="p-2 bg-[#1f1f1f]">
            <BottomBar />
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonFooter } from "@ionic/vue";
import { onMounted, ref } from "vue";
import { request } from "@/composables/api";
import { API_URL, API_ENDPOINT_POSTS } from "@/constants";
import { Listing } from "@/interfaces/listing";
import { requestOptions } from "@/composables/requestOptions";

import BottomBar from "@/components/layout/BottomBar.vue";

let responseData = ref(null) as any;

onMounted(async () => {
    const url = `${API_URL}/${API_ENDPOINT_POSTS}`;

    try {
        responseData = await request<Listing>(url, requestOptions("", "GET"));
        console.log(responseData);
    } catch (error: any) {
        console.log(error);
    }
});
</script>

<style scoped>
#container {
    text-align: center;

    position: absolute;
    left: 0;
    right: 0;
    top: 50%;
    transform: translateY(-50%);
}

#container strong {
    font-size: 20px;
    line-height: 26px;
}

#container p {
    font-size: 16px;
    line-height: 22px;

    color: #8c8c8c;

    margin: 0;
}

#container a {
    text-decoration: none;
}
</style>
