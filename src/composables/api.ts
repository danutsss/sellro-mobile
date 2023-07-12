import { Options } from "@/interfaces/options";

export const request = async <T>(
    apiUrl: string,
    options: Options
): Promise<T> => {
    try {
        const response = await fetch(apiUrl, options);

        if (!response.ok) {
            throw new Error(
                `Error fetching data from ${apiUrl}\nStatus: ${response.status} | Error: ${response.statusText}`
            );
        }

        const data: T = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(
            `Error fetching data from ${apiUrl}\nError: ${error.message}`
        );
    }
};
