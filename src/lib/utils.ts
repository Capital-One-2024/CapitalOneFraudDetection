/**
 * Function for short date formatting
 * @param date
 * @returns formatted string of Date object
 * @example
 * new Date() => Nov 20, 11:57 PM
 */
export const FORMATDATE = (date: Date) => {
    return date.toLocaleString("en-US", {
        month: "short",
        day: "numeric",
        hour: "numeric",
        minute: "2-digit",
        hour12: true,
    });
};
