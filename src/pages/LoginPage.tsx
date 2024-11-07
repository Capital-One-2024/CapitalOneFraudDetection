import LoginForm from "../components/LoginForm";
import Page from "../components/Page";
import SplitScreen from "../components/SplitScreen";

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
