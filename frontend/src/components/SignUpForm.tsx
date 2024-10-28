import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { SIGN_UP_SCHEMA } from "../lib/schemas";
import { Box, TextField } from "@mui/material";
import { z } from "zod";

export default function SignUpForm() {
    type SignUpInputs = z.infer<typeof SIGN_UP_SCHEMA>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<SignUpInputs>({
        resolver: zodResolver(SIGN_UP_SCHEMA),
        defaultValues: {
            firstName: "",
            lastName: "",
            email: "",
        },
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
                    {...register("email")}
                    type="email"
                    label="Email"
                    variant="outlined"
                    fullWidth
                    error={!!errors.email}
                    helperText={errors.email?.message}
                    placeholder="janedoe@example.com"
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
