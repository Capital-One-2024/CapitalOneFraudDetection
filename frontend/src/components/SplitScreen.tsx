import { Typography } from "@mui/material";
import { Link } from "react-router-dom";

interface SplitScreenProps {
    leftContent: React.ReactNode;
    cta: {
        title: string;
        subtitle: string;
        buttonText: string;
        buttonLink: string;
    };
}

export default function SplitScreen({ leftContent, cta }: SplitScreenProps) {
    return (
        <div className="flex flex-row flex-1">
            {/* Left Section */}
            <div className="flex flex-col flex-1 items-center justify-center p-5 gap-10">
                {leftContent}
                <div className="flex flex-row items-center gap-1 lg:hidden">
                    <Typography variant="subtitle1">
                        {cta.subtitle}
                        <Link to={cta.buttonLink} className="ml-2 underline text-c1-red">
                            {cta.buttonText}
                        </Link>
                    </Typography>
                </div>
            </div>
            {/* Right Section - CTA */}
            <div className="hidden lg:flex flex-1 bg-c1-red items-center justify-center text-white p-5">
                <div className="flex flex-col items-center gap-10">
                    <Typography variant="h3" textAlign="center">{cta.title}</Typography>
                    <div className="flex flex-col items-center gap-1">
                        <Typography variant="h6">{cta.subtitle}</Typography>
                        <Link to={cta.buttonLink} className="btn btn-white btn-wide">
                            {cta.buttonText}
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
