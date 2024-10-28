import { z } from "zod";

export const EMAIL_SCHEMA = z
    .string()
    .min(1, "Email is required")
    .email("Invalid email format. Please enter a valid email address");

export const LOGIN_SCHEMA = z.object({
    email: EMAIL_SCHEMA,
});

export const SIGN_UP_SCHEMA = z.object({
    firstName: getNameSchema("First name"),
    lastName: getNameSchema("Last name"),
    email: EMAIL_SCHEMA,
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
