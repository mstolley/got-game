export const saveToLocalStorage = (key: string, value: unknown) => {
    if (typeof window !== 'undefined') {
        localStorage.setItem(key, JSON.stringify(value));
    }
};

export const loadFromLocalStorage = (key: string) => {
    if (typeof window !== 'undefined') {
        const storedValue = localStorage.getItem(key);

        return storedValue ? JSON.parse(storedValue) : null;
    }

    return null;
};
