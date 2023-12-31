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
        next("/profile");
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
        component: () => import("@/views/HomePage.vue"),
    },
    {
        path: "/favorites",
        name: "Favorites",
        component: () => import("@/views/FavoritesPage.vue"),
    },
    {
        path: "/profile",
        name: "Profile",
        component: () => import("@/views/ProfilePage.vue"),
    },
    {
        path: "/profile/posts/list",
        component: () => import("@/views/profile/ActiveListings.vue"),
        meta: {
            requiresAuth: true,
        },
        beforeEnter: authGuard,
    },
    {
        path: "/profile/posts/pending-approval",
        component: () => import("@/views/profile/PendingApprovalListings.vue"),
        meta: {
            requiresAuth: true,
        },
        beforeEnter: authGuard,
    },
    {
        path: "/profile/posts/archived",
        component: () => import("@/views/profile/ArchivedListings.vue"),
        meta: {
            requiresAuth: true,
        },
        beforeEnter: authGuard,
    },
    {
        path: "/profile/settings",
        component: () => import("@/views/profile/Settings.vue"),
        meta: {
            requiresAuth: true,
        },
        beforeEnter: authGuard,
    },
    {
        path: "/:slug/:id",
        component: () => import("@/views/listing/ListingPage.vue"),
    },
    {
        path: "/messages",
        component: () => import("@/views/messages/Messages.vue"),
        meta: {
            requiresAuth: true,
        },
        beforeEnter: authGuard,
        children: [
            {
                path: ":id",
                component: () => import("@/views/messages/Message.vue"),
            },
        ],
    },
    {
        path: "/listing/:id/edit",
        component: () => import("@/views/listing/EditListing.vue"),
        meta: {
            requiresAuth: true,
        },
        beforeEnter: authGuard,
    },
    {
        path: "/listing/add",
        component: () => import("@/views/listing/AddListing.vue"),
        meta: {
            requiresAuth: true,
        },
        beforeEnter: authGuard,
    },
    {
        path: "/search",
        component: () => import("@/views/search/Search.vue"),
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
