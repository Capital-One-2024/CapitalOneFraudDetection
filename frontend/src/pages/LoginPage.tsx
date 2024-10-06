import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import { TextField, Button, Box, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import "../index.css";

// Zod schema for validation
const PHONE_SCHEMA = z.object({
    phoneNumber: z
        .string()
        .min(1, "Phone number is required")
        .regex(
            /^(\(?\d{3}\)?[-.\s]?\d{3}[-.\s]?\d{4}|\d{10})$/,
            "Invalid phone number format. Please enter a valid US phone number"
        ),
});

type phoneFormInputs = z.infer<typeof PHONE_SCHEMA>;

function LoginPage() {
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
            <div className="flex flex-col justify-center h-full bg-white p-6 md:p-11">
                <Box className="mx-auto max-w-sm">
                    <Typography
                        variant="h4"
                        className="mb-4 md:mb-8 text-center font-bold text-2xl md:text-3xl"
                    >
                        Sign In
                    </Typography>
                    <form onSubmit={handleSubmit(ON_SUBMIT)}>
                        <TextField
                            {...register("phoneNumber")}
                            label="Phone Number"
                            variant="outlined"
                            fullWidth
                            error={!!errors.phoneNumber}
                            helperText={errors.phoneNumber?.message}
                            className="mb-4 md:mb-6"
                            placeholder="(XXX) XXX-XXXX"
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    borderRadius: "8px",
                                },
                            }}
                        />
                        <Button
                            type="submit"
                            variant="contained"
                            className="py-3 rounded-lg"
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
                    bg-[#D22E1E]
                    text-white
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
                    Welcome Back!
                </Typography>
                <Typography
                    variant="body1"
                    className="
                  text-center
                   mb-6 md:mb-8
                   text-base
                  md:text-lg
                  "
                >
                    Don’t have an account?
                </Typography>
                <Link to="/signup">
                    <Button
                        fullWidth
                        variant="outlined"
                        className="mx-auto"
                        sx={{
                            backgroundColor: "white",
                            color: "black",
                            borderColor: "#D22E1E",
                            fontSize: "16px",
                            "&:hover": {
                                backgroundColor: "white",
                                color: "black",
                                borderColor: "white",
                            },
                            
                            padding: "10px 20px",
                            borderRadius: "8px",
                            textTransform: "none",
                            borderWidth: "2px",
                        }}
                    >
                        Sign Up
                    </Button>
                </Link>
            </div>
        </div>
    );
}

export default LoginPage;
