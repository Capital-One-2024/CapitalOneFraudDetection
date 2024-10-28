import classNames from "classnames";
import OtpResendButton from "./OtpResendButton";
import { FormProvider, useForm } from "react-hook-form";
import { z } from "zod";
import { OTP_SCHEMA } from "../lib/schemas";
import { zodResolver } from "@hookform/resolvers/zod";
import OtpInput from "./OtpInput";
import { Divider } from "@mui/material";

export default function OtpForm() {
    type OTPFormData = z.infer<typeof OTP_SCHEMA>;

    const METHODS = useForm<OTPFormData>({
        resolver: zodResolver(OTP_SCHEMA),
        defaultValues: {
            otp0: "",
            otp1: "",
            otp2: "",
            otp3: "",
            otp4: "",
            otp5: "",
        },
    });

    function onSubmit(data: OTPFormData) {
        const OTP = Object.values(data).join("");
        console.log("OTP:", OTP);
    }

    const IS_FORM_VALID = METHODS.formState.isValid;
    const SHOW_ERRORS = METHODS.formState.isDirty && !IS_FORM_VALID;

    return (
        <div className="flex flex-1 flex-col gap-10 max-w-96 mx-auto">
            {/* Form Heading */}
            <div className="flex flex-col gap-1 text-white items-center">
                <h1 className="text-xl font-semibold text-center md:text-2xl">
                    Account Verification
                </h1>
                <p className="text-sm text-center md:text-base">
                    Enter the 6 digit OTP we sent you
                </p>
            </div>
            {/* OTP Inputs */}
            <FormProvider {...METHODS}>
                <form className="flex flex-col gap-6" onSubmit={METHODS.handleSubmit(onSubmit)}>
                    <div className="grid grid-cols-6 gap-2">
                        {[0, 1, 2, 3, 4, 5].map((i) => (
                            <OtpInput key={i} name={`otp${i}`} />
                        ))}
                    </div>
                    {/* Error Message */}
                    {SHOW_ERRORS && (
                        <p className="text-white text-sm">
                            * Your one-time password must be 6 digits.
                        </p>
                    )}
                    {/* Submit OTP Button */}
                    <button type="submit" disabled={!IS_FORM_VALID} className="btn btn-white">
                        Continue
                    </button>
                </form>
            </FormProvider>
            {/* Divider */}
            <Divider className="bg-white" />
            {/* OTP Resend */}
            <div
                className={classNames(
                    "flex flex-col items-center text-white gap-1 text-sm",
                    "md:flex-row md:justify-between md:text-base"
                )}
            >
                <p>Didn&apos;t receive a code?</p>
                <OtpResendButton />
            </div>
        </div>
    );
}
