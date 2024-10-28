import classNames from "classnames";
import useTitle from "../hooks/useTitle";

interface PageProps {
    title?: string;
    orientation?: "horizontal" | "vertical";
    children: React.ReactNode;
}

export default function Page({ title, orientation = "vertical", children }: PageProps) {
    useTitle(title);
    return (
        <main
            className={classNames("flex min-h-screen antialiased", {
                "flex-col": orientation === "vertical",
                "flex-row": orientation === "horizontal",
            })}
        >
            {children}
        </main>
    );
}
