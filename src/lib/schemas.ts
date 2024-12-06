import { z } from "zod";

export const AUTH_PAGE_ACTIONS_SCHEMA = z.enum(["signIn", "signUp"]).optional().default("signIn");

// extract the type of the AUTH_PAGE_ACTIONS_SCHEMA
export type AuthPageAction = z.infer<typeof AUTH_PAGE_ACTIONS_SCHEMA>;

export const DOLLAR_SCHEMA = z.coerce
    .number({ message: "Value must be a number" })
    .positive({ message: "Amount must be greater than 0" })
    .max(Number.MAX_SAFE_INTEGER, { message: "Amount cannot exceed 999,999,999" })
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
    accountID: z.string().min(1, "Account ID is required"),
});

export const ACCOUNT_SCHEMA = z.object({
    balance: DOLLAR_SCHEMA, // Reusing the existing dollar schema
    accountName: z.string().min(1, "Account Name is required"),
});

export const createProfileDetailValidationSchema = (attributeKey: string) => {
    // Default validation for general attributes
    let schema = z
        .string()
        .min(1, { message: "Attribute cannot be empty." })
        .max(24, { message: "Attribute must be 24 characters or less." });

    // If the attributeKey is 'email', apply email validation
    if (attributeKey === "email") {
        schema = schema.email({ message: "Invalid email format." });
    }

    // Apply transformation (e.g., to lowercase) after all other validations
    schema = schema.transform((s) => s.toLowerCase());

    return schema;
};
