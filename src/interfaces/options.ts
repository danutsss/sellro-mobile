export interface Options {
    method?: "GET" | "POST" | "PUT" | "DELETE";
    headers?: { [key: string]: string };
    body?: any;
}
