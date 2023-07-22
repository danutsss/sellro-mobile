<template>
    <div class="p-6">
        <swiper :slides-per-view="3">
            <swiper-slide
                v-for="category in categories.result.data"
                :key="category.id">
                <div class="flex flex-col items-center justify-center">
                    <img
                        :src="category.picture_url"
                        alt="category picture"
                        class="h-10" />
                    <span class="text-xs mt-1">
                        {{ truncate(category.name, 15) }}
                    </span>
                </div>
            </swiper-slide>
        </swiper>
    </div>
</template>
<script setup lang="ts">
import { API_URL, API_ENDPOINT_CATEGORIES } from "@/constants";
import { request } from "@/composables/api";
import { requestOptions } from "@/composables/requestOptions";
import { Category } from "@/interfaces/categories";
import { Swiper, SwiperSlide } from "swiper/vue";
import { truncate } from "@/composables/format";

import "swiper/css";

const url = `${API_URL}/${API_ENDPOINT_CATEGORIES}`;
const urlWithSearch = new URL(`${API_URL}/${API_ENDPOINT_CATEGORIES}`);

const params: any = {
    nestedIncluded: "1",
};

Object.keys(params).forEach((key) =>
    urlWithSearch.searchParams.append(key, params[key])
);

const categories: any = await request<Category>(url, requestOptions("", "GET"));

console.log(categories);
</script>
