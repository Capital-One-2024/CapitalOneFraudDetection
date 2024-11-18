import { z } from "zod";

export const AUTH_PAGE_ACTIONS_SCHEMA = z.enum(["signIn", "signUp"]).optional().default("signIn");

// extract the type of the AUTH_PAGE_ACTIONS_SCHEMA
export type AuthPageAction = z.infer<typeof AUTH_PAGE_ACTIONS_SCHEMA>;
