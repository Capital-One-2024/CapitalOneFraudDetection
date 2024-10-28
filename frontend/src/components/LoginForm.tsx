import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import { LOGIN_SCHEMA } from "../lib/schemas";
import { z } from "zod";

export default function LoginForm() {
    type LoginInputs = z.infer<typeof LOGIN_SCHEMA>;

    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>({
        resolver: zodResolver(LOGIN_SCHEMA),
        defaultValues: {
            email: "",
        },
    });

    const ON_SUBMIT = (data: LoginInputs) => {
        console.log(data);
    };

    return (
        <Box className="form-box">
            <h1 className="text-3xl font-semibold">Sign In</h1>
            <form onSubmit={handleSubmit(ON_SUBMIT)} className="form">
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
                    Sign In
                </button>
            </form>
        </Box>
    );
}
