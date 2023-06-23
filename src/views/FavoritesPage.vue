<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div id="container">
                <strong>Favorites page</strong>
            </div>
        </ion-content>
        <ion-footer style="padding: 6px; background: #1f1f1f">
            <BottomBar />
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonFooter, IonPage } from "@ionic/vue";
import BottomBar from "@/components/layout/BottomBar.vue";
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
