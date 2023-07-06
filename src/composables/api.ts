import { Post } from "@/interfaces/post";
import { User } from "@/interfaces/user";

export const fetchPost = async (
    apiUrl: string,
    options: object
): Promise<Post> => {
    try {
        const response = await fetch(apiUrl, options);

        if (!response.ok) {
            throw new Error(
                `Error fetching data from ${apiUrl}. Status: ${response.status}`
            );
        }

        const data: Post = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(`Error fetching data from ${apiUrl}. ${error.message}`);
    }
};

export const loginUser = async (
    apiUrl: string,
    options: object
): Promise<User> => {
    try {
        const response = await fetch(apiUrl, options);

        if (!response.ok) {
            throw new Error(
                `Error logging in user from ${apiUrl}. Status: ${response.status}`
            );
        }

        const data: User = await response.json();
        return data;
    } catch (error: any) {
        throw new Error(
            `Error logging in user from ${apiUrl}. ${error.message}`
        );
    }
};
