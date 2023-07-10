<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="p-6">
                <h1 class="font-sans text-4xl font-bold">Bun venit pe SELL!</h1>
            </div>

            <div v-if="authStore.isLoggedIn">content if logged in</div>
            <div v-else class="flex flex-col">
                <SocialAuth />

                <div class="flex items-center justify-center px-2">
                    <div class="border-t border-gray-300 w-full"></div>
                    <div class="px-4 text-gray-500 font-sans uppercase">
                        sau
                    </div>
                    <div class="border-t border-gray-300 w-full"></div>
                </div>

                <ion-button
                    class="m-3 text-white"
                    fill="outline"
                    @click="showRegister = !showRegister">
                    <p class="font-bold" v-if="showRegister">Creeaza un cont</p>
                    <p class="font-bold" v-else>Intra in cont</p>
                </ion-button>

                <Transition name="fade" mode="out-in">
                    <template v-if="showRegister">
                        <SignIn />
                    </template>
                    <template v-else>
                        <SignUp />
                    </template>
                </Transition>
            </div>
        </ion-content>

        <ion-footer style="padding: 6px; background: #1f1f1f">
            <BottomBar />
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonFooter, IonButton } from "@ionic/vue";
import { useAuthStore } from "@/store/authStore";

import { Transition, ref } from "vue";

import BottomBar from "@/components/layout/BottomBar.vue";
import SignIn from "@/components/auth/SignIn.vue";
import SignUp from "@/components/auth/SignUp.vue";
import SocialAuth from "@/components/auth/SocialAuth.vue";

const authStore = useAuthStore();
const showRegister = ref(false);
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

#container a {
    text-decoration: none;
}

.fade-enter-active,
.fade-leave-active {
    transition: opacity 0.5s;
}

.fade-enter,
.fade-leave-to {
    opacity: 0;
}

ion-button {
    --border-color: #fff;
}
</style>
