import { defineStore } from "pinia";
import { Listing } from "@/interfaces/listing";

interface ListingState {
    listings: Listing[];
}

export const useListingStore = defineStore({
    id: "listing",
    state: (): ListingState => ({
        listings: [],
    }),
});
