import { defineAuth } from "@aws-amplify/backend";

/**
 * Define and configure your auth resource
 * @see https://docs.amplify.aws/gen2/build-a-backend/auth
 */
// eslint-disable-next-line @typescript-eslint/naming-convention
export const auth = defineAuth({
    loginWith: {
        email: true,
    },
});
