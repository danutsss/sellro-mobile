<template>
    <ion-page>
        <ion-content :fullscreen="true">
            <div class="p-5">
                <h1
                    v-if="!authStore.isAuthenticated"
                    class="font-sans text-4xl font-bold">
                    Bun venit pe SELL!
                </h1>
                <h1 v-else class="font-sans text-3xl font-bold ml-2">
                    Bine ai venit,
                    {{ authStore.currentUser?.result.name }}!
                </h1>
            </div>

            <div v-if="authStore.isAuthenticated" class="px-5">
                <div id="menu">
                    <div class="mb-4">
                        <span class="font-bold text-xl">Meniu anunturi</span>
                        <ul>
                            <li class="border-b border-gray-300 py-2">
                                <router-link
                                    to="/profile/posts/list"
                                    class="flex items-center">
                                    <ion-icon
                                        :icon="list"
                                        class="mr-2"></ion-icon>
                                    Anunturi active
                                </router-link>
                            </li>
                            <li class="border-b border-gray-300 py-2">
                                <router-link
                                    to="/profile/posts/pending-approval"
                                    class="flex items-center">
                                    <ion-icon
                                        :icon="hourglass"
                                        class="mr-2"></ion-icon>
                                    Anunturi moderate
                                </router-link>
                            </li>
                            <li class="border-b border-gray-300 py-2">
                                <router-link
                                    to="/profile/posts/archived"
                                    class="flex items-center">
                                    <ion-icon
                                        :icon="archive"
                                        class="mr-2"></ion-icon>
                                    Anunturi arhivate
                                </router-link>
                            </li>
                        </ul>
                    </div>

                    <div class="mb-4">
                        <span class="font-bold text-xl">Meniu cont</span>
                        <ul>
                            <li class="border-b border-gray-300 py-2">
                                <router-link
                                    to="/profile/settings"
                                    class="flex items-center">
                                    <ion-icon
                                        :icon="personCircle"
                                        class="mr-2"></ion-icon>
                                    Contul meu
                                </router-link>
                            </li>
                        </ul>
                    </div>
                </div>

                <div class="flex justify-end">
                    <ion-button
                        class="m-3 text-white"
                        fill="outline"
                        @click="authStore.logout">
                        <p class="font-bold">Deconecteaza-te</p>
                    </ion-button>
                </div>
            </div>
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

        <ion-footer class="p-2 bg-[#1f1f1f]">
            <BottomBar />
        </ion-footer>
    </ion-page>
</template>

<script setup lang="ts">
import { IonContent, IonPage, IonFooter, IonButton, IonIcon } from "@ionic/vue";
import { useAuthStore } from "@/store/authStore";
import { archive, hourglass, list, personCircle } from "ionicons/icons";
import { Transition, ref } from "vue";

import BottomBar from "@/components/layout/BottomBar.vue";
import SignIn from "@/components/auth/SignIn.vue";
import SignUp from "@/components/auth/SignUp.vue";
import SocialAuth from "@/components/auth/SocialAuth.vue";

const authStore = useAuthStore();
const showRegister = ref(false);
</script>

<style scoped>
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
