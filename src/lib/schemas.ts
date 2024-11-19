import { z } from "zod";

export const AUTH_PAGE_ACTIONS_SCHEMA = z.enum(["signIn", "signUp"]).optional().default("signIn");

// extract the type of the AUTH_PAGE_ACTIONS_SCHEMA
export type AuthPageAction = z.infer<typeof AUTH_PAGE_ACTIONS_SCHEMA>;

export const DOLLAR_SCHEMA = z
    .string()
    .regex(/^\d+(\.\d{0,2})?$/, 'Invalid dollar amount') // Validates numeric input with optional 2 decimal places
    .refine((val: any) => {
        const numberValue = parseFloat(val);
        return numberValue > 0; // Ensures the number is greater than 0
    }, {
        message: 'Dollar amount must be greater than zero',
    })
    .transform((val: string) => parseFloat(val)); // Convert to number after validation

export const TRANSACTION_SCHEMA = z.object({
    amount: DOLLAR_SCHEMA, // Reusing the existing dollar schema
    vendor: z
        .string()
        .nonempty("Vendor is required"), // Ensure vendor is selected
    datetime: z
        .string()
        .refine((val: any) => !isNaN(Date.parse(val)), {
            message: "Invalid date and time",
        }) // Validate that the datetime string is a valid date
});