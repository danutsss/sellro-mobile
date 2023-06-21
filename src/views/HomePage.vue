<template>
    <ion-page>
        <ion-header :translucent="true">
            <ion-toolbar>
                <ion-title>Blank</ion-title>
            </ion-toolbar>
        </ion-header>

        <ion-content :fullscreen="true">
            <ion-header collapse="condense">
                <ion-toolbar>
                    <ion-title size="large">Blank</ion-title>
                </ion-toolbar>
            </ion-header>

            <div id="container">
                <strong>Ready to create an app?</strong>
                <p>
                    Start with Ionic
                    <a
                        target="_blank"
                        rel="noopener noreferrer"
                        href="https://ionicframework.com/docs/components"
                        >UI Components</a
                    >
                </p>
            </div>
        </ion-content>
    </ion-page>
</template>

<script setup lang="ts">
import {
    IonContent,
    IonHeader,
    IonPage,
    IonTitle,
    IonToolbar,
} from "@ionic/vue";
import { onMounted, ref } from "vue";
import { fetchData } from "@/composables/api";
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
        responseData = await fetchData(apiUrl, options);
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
