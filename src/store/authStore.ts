import { defineStore } from "pinia";
import { request } from "@/composables/api";
import { User } from "@/interfaces/user";
import { API_URL, API_ENDPOINT_AUTH } from "@/constants";
import { Options } from "@/interfaces/options";

export const useAuthStore = defineStore({
    id: "auth",
    state: () => ({
        isLoggedIn: false,
        user: null as User | null,
    }),
    getters: {
        isAuthenticated: (state) => state.isLoggedIn,
        currentUser: (state) => state.user,
    },
    actions: {
        initialize() {
            // Retrieve authentication status and user data from the persistence mechanism
            const isLoggedIn = localStorage.getItem("isLoggedIn");
            const userData = localStorage.getItem("user");

            if (isLoggedIn === "true" && userData) {
                // Update the authentication status and user data in the store
                this.isLoggedIn = true;
                this.user = JSON.parse(userData);
            }
        },
        async login(email: string, password: string) {
            const apiUrl: string = `${API_URL}/${API_ENDPOINT_AUTH}/login`;
            const body: object = {
                email: email,
                password: password,
            };
            const options: Options = {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-AppApiToken":
                        "UGt0TnB4TkRUWXdvbFAxME5zWlc2SHQ3bEtDU1diODA=",
                    "X-AppType": "docs",
                },
                body: JSON.stringify(body),
            };

            const data: User = await request<User>(apiUrl, options);

            this.user = data;
            this.isLoggedIn = true;

            localStorage.setItem("user", JSON.stringify(data));
            localStorage.setItem("isLoggedIn", "true");
        },

        async logout() {
            const apiUrl: string = `${API_URL}/${API_ENDPOINT_AUTH}/logout/${this.currentUser?.result.id}`;
            const options: Options = {
                method: "GET",
                headers: {
                    Authorization: `Bearer ${this.currentUser?.extra.authToken}`,
                    "Content-Type": "application/json",
                    Accept: "application/json",
                    "X-AppApiToken":
                        "UGt0TnB4TkRUWXdvbFAxME5zWlc2SHQ3bEtDU1diODA=",
                    "X-AppType": "docs",
                },
            };

            await request(apiUrl, options);

            this.user = null;
            this.isLoggedIn = false;

            localStorage.removeItem("user");
            localStorage.removeItem("isLoggedIn");
        },
    },
});
