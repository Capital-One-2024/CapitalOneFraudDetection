import { z } from "zod";
import Page from "../components/Page";
import SignUpForm from "../components/SignUpForm";
import SplitScreen from "../components/SplitScreen";
import { SIGN_UP_SCHEMA } from "../lib/schemas";

export type SignUpInputs = z.infer<typeof SIGN_UP_SCHEMA>;

function SignUpPage() {
    return (
        <Page title="Sign Up">
            <SplitScreen
                leftContent={<SignUpForm />}
                cta={{
                    title: "Create an Account!",
                    subtitle: "Already have an account?",
                    buttonText: "Sign In",
                    buttonLink: "/login",
                }}
            />
        </Page>
    );
}

export default SignUpPage;
