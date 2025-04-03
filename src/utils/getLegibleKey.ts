export const getLegibleKey = (str: string): string => {
    return str
        .split(/(?=[A-Z])/) // Split by capitalized letters
        .map(word => word.toLowerCase()) // Convert each part to lowercase
        .join(' '); // Join the parts with spaces
};
