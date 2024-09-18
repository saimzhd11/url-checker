import debounce from "lodash.debounce";

export const checkUrlExists = async (url: string): Promise<string> => {
    try {
        const response = await fetch("http://localhost:5000/api/check-url", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ url }),
        });

        if (!response.ok) {
            const errorData = await response.json();
            return errorData.message;
        }

        const data = await response.json();
        return data.message;
    } catch (error) {
        return "Error checking the URL.";
    }
};

export const createDebouncedFunction = <T extends (...args: any[]) => void>(func: T, wait: number): T => {
    return debounce(func, wait) as any;
};
