import React, { useRef, useEffect, useState } from "react";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Grid2, Button, Typography, Link } from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { OTP_SCHEMA } from "../lib/schemas";

type OTPFormData = z.infer<typeof OTP_SCHEMA>;

const OTPInputWithZod = () => {
    const { control, handleSubmit, setValue, watch } = useForm<OTPFormData>({
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

    const inputRefs = useRef<HTMLInputElement[]>([]);

    const [focusIndex, setFocusIndex] = useState<number | null>(null);

    // Automatically focus the first input when the component mounts
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    // Function to handle input change
    const handleInputChange = (value: string, index: number) => {
        const newValue = value.replace(/[^0-9]/g, ""); // Allow only numbers
        setValue(`otp${index}` as keyof OTPFormData, newValue);

        // Move to the next input if there is a digit
        if (newValue && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Function to handle key events
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        // If backspace pressed
        if (e.key === "Backspace") {
            // If we have a value in the curr cell, clear it before moving to the previous cell
            e.currentTarget.value && setValue(`otp${index}` as keyof OTPFormData, "");

            // If we are at the first cell, do nothing
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    // Function to handle pasting values
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, _index: number) => {
        const pastedData = e.clipboardData.getData("text");

        // Only process if the pasted data is 6 digits long
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split("");
            digits.forEach((digit, i) => {
                setValue(`otp${i}` as keyof OTPFormData, digit);
                if (inputRefs.current[i]) {
                    inputRefs.current[i].value = digit; // Update the input value directly
                }
            });
            // Focus the last input after pasting
            inputRefs.current[5]?.focus();
        }

        e.preventDefault(); // Prevent the default paste action
    };

    const onSubmit = (data: OTPFormData) => {
        const otp = Object.values(data).join("");
        console.log("OTP submitted: ", otp);

        const regex = /^\d{6}$/;

        // Additional validation
        if (!regex.test(otp)) {
            console.error("OTP must be 6 digits");
            return; // Stop submission if OTP is invalid
        }
    };

    // Watching the values to enable/disable the submit button
    const isFilled = Object.values(watch()).every((value) => value);

    return (
        <Grid2
            container
            direction="column" // Ensure items stack vertically
            justifyContent="center" // Center horizontally
            alignItems="center" // Center vertically
            sx={{
                background: "#D22E1E",
                height: "100vh",
                width: "100vw",
                gap: "16px", // Adjust gap value for overall spacing
                padding: "20px", // Add padding to the container
            }}
        >
            {/* Back Button Positioned Absolutely in Top Right Corner */}
            <Link
                href="/login"
                sx={{
                    color: "white",
                    position: "absolute",
                    top: 25,
                    left: 25,
                    display: "flex", // Use flex to align icon and text
                    alignItems: "center", // Center vertically
                    textTransform: "none",
                    fontSize: "2.5vh",
                    textDecoration: "none",
                    transition: "transform 0.3s ease", // Smooth transition for scaling
                    ":hover": {
                        transform: "scale(1.05)", // Scale on hover
                        background: "none",
                        color: "white",
                        textDecoration: "none",
                    },
                }}
            >
                <ArrowBackIcon sx={{ mr: 1 }} fontSize="small" />{" "}
                {/* Add margin to the right of the icon */}
                Back
            </Link>
            <Grid2 sx={{ textAlign: "center", mb: 12 }}>
                <Grid2>
                    {/*
                    <img
                        src={logo} // Use the imported image
                        alt="Capital One Logo"
                        style={{
                            width: '200px',
                            height: 'auto', // Maintain aspect ratio
                        }}
                    />
                    */}
                </Grid2>
                <Grid2 sx={{ mt: 6 }}>
                    <Typography
                        variant="h1"
                        sx={{
                            fontSize: "5vh",
                            fontWeight: 600,
                            color: "white",
                            mb: 1,
                        }}
                    >
                        Account Verification
                    </Typography>
                    <Typography
                        variant="body1"
                        sx={{
                            color: "white",
                        }}
                    >
                        Enter the code sent to your phone below.
                    </Typography>
                </Grid2>

                {/* Form with submit button */}
                <form
                    onSubmit={handleSubmit(onSubmit)}
                    style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                        gap: "16px",
                    }}
                >
                    <Grid2 sx={{ my: 4 }}>
                        <Grid2 container justifyContent="center" gap="2vw">
                            {[0, 1, 2, 3, 4, 5].map((index) => (
                                <Controller
                                    key={index}
                                    name={`otp${index}` as keyof OTPFormData}
                                    control={control}
                                    render={({ field }) => (
                                        <div>
                                            <input
                                                {...field}
                                                type="text"
                                                maxLength={1}
                                                onChange={(e) =>
                                                    handleInputChange(e.target.value, index)
                                                }
                                                onKeyUp={(e) => handleKeyUp(e, index)}
                                                onPaste={(e) => handlePaste(e, index)}
                                                ref={(el) =>
                                                    (inputRefs.current[index] =
                                                        el as HTMLInputElement)
                                                }
                                                onFocus={() => setFocusIndex(index)} // Set the focus index on focus
                                                onBlur={() => setFocusIndex(null)} // Reset focus index on blur
                                                style={{
                                                    width: "10vw", // Use viewport width to make it responsive
                                                    maxWidth: "70px", // Set max width for larger screens
                                                    minWidth: "50px", // Set min width for smaller screens
                                                    height: "10vw",
                                                    maxHeight: "70px",
                                                    minHeight: "50px",
                                                    textAlign: "center",
                                                    fontSize: "30px",
                                                    backgroundColor: "#FFFFFF",
                                                    color: "#004878",
                                                    fontWeight: 600,
                                                    borderRadius: "10px",
                                                    caretColor: "transparent", // Hide the cursor
                                                    border: "none",
                                                    //outline: focusIndex === index ? '#004878' : 'none', // Remove default outline
                                                }}
                                            />
                                        </div>
                                    )}
                                />
                            ))}
                        </Grid2>
                    </Grid2>
                    <Grid2 sx={{ mt: 2, width: "100%" }}>
                        <Button
                            type="submit"
                            disabled={!isFilled}
                            variant="outlined"
                            sx={{
                                background: "white",
                                borderRadius: "10px",
                                px: 4,
                                border: "none",
                                color: "#004878",
                                textTransform: "none",
                                width: "90%",
                                boxShadow: !isFilled ? "none" : "0 0 10px rgba(255, 255, 255, 0.5)",
                                fontSize: "2.5vh",
                                fontWeight: 600,
                                transition:
                                    "box-shadow 0.3s ease, background 0.3s ease, color 0.3s ease",
                                ":hover": {
                                    color: "#004878",
                                    background: "white",
                                    boxShadow: "0 0 20px rgba(255, 255, 255, 0.7)",
                                },
                                ":focus": {
                                    outline: "none",
                                },
                                // Styles for the disabled state
                                "&.Mui-disabled": {
                                    background: "rgba(255, 255, 255, 0.2)",
                                    color: "rgba(255, 255, 255, 0.5)",
                                    cursor: "not-allowed",
                                    boxShadow: "none",
                                },
                            }}
                        >
                            Continue
                        </Button>
                    </Grid2>
                </form>

                {/* Resend code text */}
                <Grid2 sx={{ mt: 2 }}>
                    <Typography
                        sx={{
                            color: "white",
                            fontSize: "2vh",
                        }}
                    >
                        Didn't receive a code?{" "}
                        <Typography
                            component="span"
                            onClick={() => console.log("Resend Code!")}
                            sx={{
                                cursor: "pointer",
                                textDecoration: "underline",
                                color: "#fff",
                            }}
                        >
                            Click to resend.
                        </Typography>
                    </Typography>
                </Grid2>
            </Grid2>
        </Grid2>
    );
};

export default OTPInputWithZod;
