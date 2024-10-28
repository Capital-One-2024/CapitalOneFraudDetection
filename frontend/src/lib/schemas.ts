import { z } from "zod";

export const PHONE_SCHEMA = z
    .string()
    .min(1, "Phone number is required")
    .regex(
        /^(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{10})$/,
        "Invalid phone number format. Please enter a valid US phone number"
    );

export const LOGIN_SCHEMA = z.object({
    phoneNumber: PHONE_SCHEMA,
});

export const SIGN_UP_SCHEMA = z.object({
    firstName: getNameSchema("First name"),
    lastName: getNameSchema("Last name"),
    phoneNumber: PHONE_SCHEMA,
});

export const OTP_SCHEMA = z.object({
    otp0: z.string().regex(/^[0-9]$/, "Must be a digit"),
    otp1: z.string().regex(/^[0-9]$/, "Must be a digit"),
    otp2: z.string().regex(/^[0-9]$/, "Must be a digit"),
    otp3: z.string().regex(/^[0-9]$/, "Must be a digit"),
    otp4: z.string().regex(/^[0-9]$/, "Must be a digit"),
    otp5: z.string().regex(/^[0-9]$/, "Must be a digit"),
});

function getNameSchema(name: "First name" | "Last name") {
    return z.string().min(1, `${name} is required`).max(50, `${name} cannot exceed 50 characters`);
}
