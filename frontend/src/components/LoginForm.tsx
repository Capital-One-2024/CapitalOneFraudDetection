import { zodResolver } from "@hookform/resolvers/zod";
import { Box, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";
import { LOGIN_SCHEMA } from "../lib/schemas";
import { LoginInputs } from "../pages/LoginPage";

export default function LoginForm() {
    const {
        register,
        handleSubmit,
        formState: { errors },
    } = useForm<LoginInputs>({
        resolver: zodResolver(LOGIN_SCHEMA),
    });

    const ON_SUBMIT = (data: LoginInputs) => {
        console.log(data);
    };

    return (
        <Box className="form-box">
            <Typography variant="h3">Sign In</Typography>
            <form
                onSubmit={handleSubmit(ON_SUBMIT)}
                className="form"
            >
                <TextField
                    {...register("phoneNumber")}
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
                    Sign In
                </button>
            </form>
        </Box>
    );
}
