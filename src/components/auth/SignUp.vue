<template>
    <div class="flex flex-col">
        <form @submit.prevent="" class="p-3">
            <div class="mb-2 w-full">
                <ion-input
                    label="Adresa de e-mail"
                    label-placement="floating"
                    fill="solid"
                    v-model="email"
                    placeholder="Adresa de e-mail"></ion-input>
            </div>
            <div class="mb-2 w-full flex items-center">
                <ion-input
                    label="Parola"
                    label-placement="floating"
                    fill="solid"
                    type="password"
                    v-model="password"
                    placeholder="Parola"></ion-input>
            </div>
            <ion-button type="submit" color="dark" class="w-full font-bold">
                Inregistrare
            </ion-button>
        </form>

        <div class="flex flex-col px-3">
            <h3 class="text-center mt-2 text-xs">
                Intrand in cont esti de acord cu
                <span class="font-bold">Termenii si Conditiile</span>
                site-ului nostru!
            </h3>
        </div>
    </div>
</template>

<script setup lang="ts">
import { useAuthStore } from "@/store/authStore";
import { IonInput, IonButton } from "@ionic/vue";
import { ref } from "vue";

const email = ref("");
const password = ref("");
</script>
