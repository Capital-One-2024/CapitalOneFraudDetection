import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SIGN_UP_SCHEMA } from "../lib/schemas";
import { SignUpInputs } from "../pages/SignUpPage";
import { Box, TextField } from "@mui/material";

export default function SignUpForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpInputs>({
        resolver: zodResolver(SIGN_UP_SCHEMA),
    });

    const ON_SUBMIT = (data: SignUpInputs) => {
        console.log(data);
    };

    return (
        <Box className="form-box">
            <h1 className="text-3xl font-semibold">Sign Up</h1>
            <form onSubmit={handleSubmit(ON_SUBMIT)} className="form">
                <TextField
                    {...register("firstName")}
                    type="text"
                    label="First Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors.firstName}
                    helperText={errors.firstName?.message}
                    placeholder="John"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                        },
                    }}
                />

                <TextField
                    {...register("lastName")}
                    type="text"
                    label="Last Name"
                    variant="outlined"
                    fullWidth
                    error={!!errors.lastName}
                    helperText={errors.lastName?.message}
                    placeholder="Doe"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                        },
                    }}
                />

                <TextField
                    {...register("phoneNumber")}
                    type="tel"
                    label="Phone Number"
                    variant="outlined"
                    fullWidth
                    error={!!errors.phoneNumber}
                    helperText={errors.phoneNumber?.message}
                    placeholder="(XXX) XXX-XXXX"
                    sx={{
                        "& .MuiOutlinedInput-root": {
                            borderRadius: "8px",
                        },
                    }}
                />

                <button type="submit" className="btn btn-red btn-wide">
                    Create Account
                </button>
            </form>
        </Box>
    );
}
