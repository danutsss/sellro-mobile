import { Options } from "@/interfaces/options";

export const requestOptions = (
    authToken: string = "",
    method: "GET" | "POST" | "PUT" | "DELETE" = "GET",
    body?: any
): Options => {
    return {
        method: method,
        headers: {
            Authorization: `Bearer ${authToken}`,
            "Content-Type": "application/json",
            Accept: "application/json",
            "X-AppApiToken": import.meta.env.VITE_API_KEY,
            "X-AppType": "docs",
        },
        body: body,
    };
};
