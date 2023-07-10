import { createRouter, createWebHistory } from "@ionic/vue-router";
import {
    RouteRecordRaw,
    RouteLocationNormalized,
    NavigationGuardNext,
} from "vue-router";
import { useAuthStore } from "@/store/authStore";

const authGuard = (
    to: RouteLocationNormalized,
    from: RouteLocationNormalized,
    next: NavigationGuardNext
) => {
    const authStore = useAuthStore();

    if (authStore.isLoggedIn) {
        // User is authenticated, allow access to the route
        next();
    } else {
        // User is not authenticated, redirect to the login page
        next("/auth");
    }
};

const routes: Array<RouteRecordRaw> = [
    {
        path: "/",
        redirect: "/home",
    },
    {
        path: "/home",
        name: "Home",
        component: () => import("../views/HomePage.vue"),
    },
    {
        path: "/favorites",
        name: "Favorites",
        component: () => import("../views/FavoritesPage.vue"),
    },
    {
        path: "/profile",
        name: "Profile",
        component: () => import("../views/ProfilePage.vue"),
        // meta: {
        //     requiresAuth: true,
        // },
        // beforeEnter: authGuard,
    },
];

const router = createRouter({
    history: createWebHistory(import.meta.env.BASE_URL),
    routes,
});

router.beforeEach((to, from, next) => {
    if (to.meta.requiresAuth) {
        // The route requires authentication, apply the authGuard
        authGuard(to, from, next);
    } else {
        // The route does not require authentication, allow access
        next();
    }
});

export default router;
