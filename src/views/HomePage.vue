<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div id="container">
                <strong>Home page</strong>
            </div>
        </ion-content>

        <ion-footer style="padding: 6px; background: #1f1f1f">
            <BottomBar />
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonFooter } from "@ionic/vue";
import { onMounted, ref } from "vue";

import BottomBar from "@/components/layout/BottomBar.vue";

import { fetchPost } from "@/composables/api";
import { API_URL, API_ENDPOINT_POSTS } from "@/constants";

let responseData = ref(null) as any;

onMounted(async () => {
    const apiUrl: string = `${API_URL}/${API_ENDPOINT_POSTS}`;
    const options: object = {
        method: "GET",
        headers: {
            "X-AppApiToken": "UGt0TnB4TkRUWXdvbFAxME5zWlc2SHQ3bEtDU1diODA=",
            "X-AppType": "docs",
        },
    };

    try {
        responseData = await fetchPost(apiUrl, options);
        console.log(responseData);
    } catch (error: any) {
        console.error(error.message);
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
