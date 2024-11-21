import { z } from "zod";

export const AUTH_PAGE_ACTIONS_SCHEMA = z.enum(["signIn", "signUp"]).optional().default("signIn");

// extract the type of the AUTH_PAGE_ACTIONS_SCHEMA
export type AuthPageAction = z.infer<typeof AUTH_PAGE_ACTIONS_SCHEMA>;

export const DOLLAR_SCHEMA = z.coerce
    .number({ message: "Value must be a number" })
    .positive({ message: "Amount must be greater than 0" })
    .max(999999999, { message: "Amount cannot exceed 999,999,999" })
    .refine(
        (num: number) => {
            // Convert number to string and check for decimal places using regex
            const NUMSTR = num.toString();
            return /^\d+(\.\d{0,2})?$/.test(NUMSTR); // Check for at most 2 decimal places
        },
        {
            message: "Invalid dollar amount, only two decimal places allowed",
        }
    );

export const TRANSACTION_SCHEMA = z.object({
    amount: DOLLAR_SCHEMA, // Reusing the existing dollar schema
    vendor: z.string().min(1, "Vendor is required"), // Ensure vendor is selected
});
