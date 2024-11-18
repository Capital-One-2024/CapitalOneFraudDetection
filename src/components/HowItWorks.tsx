import {
    Timeline,
    TimelineConnector,
    TimelineContent,
    TimelineDot,
    TimelineItem,
    TimelineSeparator,
} from "@mui/lab";
import { HOW_IT_WORKS_STEPS } from "../lib/constants";
import classNames from "classnames";

export default function HowItWorks() {
    return (
        <div className="flex flex-col items-center gap-8 py-10">
            <h1
                className={classNames(
                    "text-xl lg:text-4xl font-semibold border-b-4",
                    "border-b-c1-blue py-4 px-20"
                )}
            >
                How It Works
            </h1>
            <Timeline position="alternate">
                {HOW_IT_WORKS_STEPS.map((step, index) => (
                    <TimelineItem key={index}>
                        <TimelineSeparator>
                            <TimelineSeparator />
                            <TimelineDot color="primary" />
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <h2 className="text-lg lg:text-2xl font-semibold">{step.title}</h2>
                            <p className="text-base">{step.description}</p>
                        </TimelineContent>
                    </TimelineItem>
                ))}
            </Timeline>
        </div>
    );
}
