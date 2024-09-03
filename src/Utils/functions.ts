import debounce from "lodash.debounce";

export const checkUrlExists = async (url: string): Promise<string> => {
    try {
        const response = await fetch(url, { method: 'GET', mode: 'no-cors' });
        if (response.ok) {
            return "URL does not exist.";
        } else {
            return url.endsWith("/") ? "URL exists and it's a folder." :
                   url.includes(".") ? "URL exists and it's a file." :
                   "URL exists.";
        }
    } catch {
        return "URL does not exist.";
    }
};

export const createDebouncedFunction = <T extends (...args: any[]) => void>(func: T, wait: number): T => {
    return debounce(func, wait) as any;
};
