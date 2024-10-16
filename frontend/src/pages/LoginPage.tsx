import { z } from "zod";
import LoginForm from "../components/LoginForm";
import SplitScreen from "../components/SplitScreen";
import { LOGIN_SCHEMA } from "../lib/schemas";
import Page from "../components/Page";

export type LoginInputs = z.infer<typeof LOGIN_SCHEMA>;

function LoginPage() {
    return (
        <Page title="Login">
            <SplitScreen
                leftContent={<LoginForm />}
                cta={{
                    title: "Welcome Back!",
                    subtitle: "Don’t have an account?",
                    buttonText: "Sign Up",
                    buttonLink: "/signup",
                }}
            />
        </Page>
    );
}

export default LoginPage;
