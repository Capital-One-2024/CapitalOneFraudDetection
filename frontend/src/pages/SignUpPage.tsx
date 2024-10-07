import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../index.css";

// Zod schema for validation
const PHONE_SCHEMA = z.object({
    firstName: z
        .string()
        .min(1, "First Name is required"),
    lastName: z
        .string()
        .min(1, "Last Name is required"),
    phoneNumber: z
        .string()
        .min(1, "Phone number is required")
        .regex(
            /^(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{10})$/,
            "Invalid phone number format. Please enter a valid US phone number"
        ),
});

type phoneFormInputs = z.infer<typeof PHONE_SCHEMA>;

function SignUpPage() {
    // this block I will temporarily disable esline
    // because UPPER_CASE conflicts with react hook form
    // syntax
    /* eslint-disable @typescript-eslint/naming-convention */
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<phoneFormInputs>({
        resolver: zodResolver(PHONE_SCHEMA),
    });
    /* eslint-enable @typescript-eslint/naming-convention */
    const ON_SUBMIT = (data: phoneFormInputs) => {
        console.log(data);
    };

    return (
        <div className="w-screen h-screen grid grid-cols-1 md:grid-cols-2 gap-0 overflow-hidden">
            {/* Left side (Sign In form) */}
            <div className="flex flex-col justify-center h-full 
            bg-[#D22E1E]
            text-white">
                <Box className="mx-auto max-w-sm">
                    <Typography
                        variant="h4"
                        className="mb-4 md:mb-8 text-center font-bold text-2xl md:text-3xl"
                    >
                        Sign Up
                    </Typography>
                    <form onSubmit={handleSubmit(ON_SUBMIT)}>
                        <Typography className="mb-8 md:mb-10 text-left">
                            First Name
                        </Typography>
                        <TextField
                            {...register("firstName")}
                            fullWidth
                            error={!!errors.firstName}
                            helperText={errors.firstName?.message}
                            className="mb-4 md:mb-6"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                    background: "white",
                                },
                                ".MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white !important"
                                },
                                "& .Mui-errors": {
                                    color: "white !important"
                                },
                                "& .MuiFormHelperText-root": {
                                    color: "white !important"
                                },
                            }}
                        />
                        <Typography className="mb-8 md:mb-10 text-left">
                            Last Name
                        </Typography>
                        <TextField
                            {...register("lastName")}
                            fullWidth
                            error={!!errors.lastName}
                            helperText={errors.lastName?.message}
                            className="mb-4 md:mb-6"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                    background: "white",
                                },
                                ".MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white !important"
                                },
                                "& .Mui-errors": {
                                    color: "white !important"
                                },
                                "& .MuiFormHelperText-root": {
                                    color: "white !important"
                                },
                            }}
                        />
                        <Typography className="mb-8 md:mb-10 text-left">
                            Phone Number
                        </Typography>
                        
                        <TextField
                            {...register("phoneNumber")}
                            fullWidth
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber?.message}
                            className="mb-4 md:mb-6"
                            placeholder="(XXX) XXX-XXXX"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                    background: "white",
                                },
                                ".MuiOutlinedInput-notchedOutline": {
                                    borderColor: "white !important"
                                },
                                "& .Mui-errors": {
                                    color: "white !important"
                                },
                                "& .MuiFormHelperText-root": {
                                    color: "white !important"
                                },
                            }}
                            
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            className="py-3 rounded-lg bg-white"
                            sx={{
                                backgroundColor: "white",
                                color: "black",
                                fontSize: "16px",
                                padding: "10px 40px",
                                textTransform: "none",
                            }}
                        >
                            Create Account
                        </Button>
                    </form>
                </Box>
            </div>

            {/* Right side (Welcome message) */}

            <div
                className="
                    flex
                    flex-col
                    justify-center
                    items-center
                    h-full
                    bg-white
                    p-6
                    md:p-11
                "
            >
                <Typography
                    variant="h4"
                    className="
                    text-center
                    mb-4 md:mb-6
                    font-bold
                    text-3xl
                    md:text-4xl
                    "
                >
                    Create an Account!
                </Typography>
                <Typography
                    variant="body1"
                    className="
                    text-center
                    mb-6 md:mb-8
                    text-base
                    md:text-lg"
                >
                    Already have an account?
                </Typography>
                <Link to="/login">
                    <Button
                        fullWidth
                        variant="contained"
                        className="mx-auto"
                        sx={{
                            backgroundColor: "#D22E1E",
                            "&:hover": {
                                backgroundColor: "#a52519",
                            },
                            color: "white",
                            fontSize: "16px",
                            padding: "10px 20px",
                            borderRadius: "8px",
                            borderWidth: "2px",
                            textTransform: "none",
                        }}
                    >
                        Sign In
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default SignUpPage;
