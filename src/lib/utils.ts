/**
 * Function for short date formatting
 * @param {Date|undefined} date - Date object to format (optional, default is current date).
 * @returns formatted string of Date object.
 * @example
 * new Date() => Nov 20, 11:57 PM
 */
export const getFormattedDate = (date?: Date) => {
    const dateToFormat = date || new Date();
    return dateToFormat.toLocaleString("en-US", {
        dateStyle: "long",
        timeStyle: "short",
    });
};

/**
 * Function to capitalize the first letter of a string.
 * @param {string} text - Text to capitalize.
 * @returns {string} - Capitalized text.
 * @example
 * capitalize("hello") => "Hello"
 */
export function capitalize(text: string): string {
    return text.charAt(0).toUpperCase() + text.slice(1).toLowerCase();
}

/**
 * Function for currency formatting in USD.
 * @param {number} amount - Amount to format.
 * @returns {string} - Formatted currency string.
 * @example
 * getFormattedCurrency(1000) => "$1,000.00"
 */
export function getFormattedCurrency(amount: number): string {
    return new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
    }).format(amount);
}

export function getFormattedCoordinates(lat: number, lon: number): string {
    return `[${lat}, ${lon}]`;
}
