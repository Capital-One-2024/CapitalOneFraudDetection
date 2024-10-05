import React, { useRef, useEffect } from 'react';
import { useForm, Controller } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import { Grid2, Button, Typography } from '@mui/material';
import logo from '../assets/C1_Logo_White.png';
import ArrowBackIcon from '@mui/icons-material/ArrowBack';

// Zod schema for validating OTP inputs
const otpSchema = z.object({
    otp0: z.string().regex(/^[0-9]$/, 'Must be a digit').optional(),
    otp1: z.string().regex(/^[0-9]$/, 'Must be a digit').optional(),
    otp2: z.string().regex(/^[0-9]$/, 'Must be a digit').optional(),
    otp3: z.string().regex(/^[0-9]$/, 'Must be a digit').optional(),
    otp4: z.string().regex(/^[0-9]$/, 'Must be a digit').optional(),
    otp5: z.string().regex(/^[0-9]$/, 'Must be a digit').optional(),
});

type OTPFormData = z.infer<typeof otpSchema>;

const OTPInputWithZod = () => {
    const { control, handleSubmit, setValue, watch } = useForm<OTPFormData>({
        resolver: zodResolver(otpSchema),
        defaultValues: {
            otp0: '',
            otp1: '',
            otp2: '',
            otp3: '',
            otp4: '',
            otp5: '',
        },
    });

    const inputRefs = useRef<HTMLInputElement[]>([]);

    // Automatically focus the first input when the component mounts
    useEffect(() => {
        inputRefs.current[0]?.focus();
    }, []);

    // Function to handle input change
    const handleInputChange = (value: string, index: number) => {
        const newValue = value.replace(/[^0-9]/g, ''); // Allow only numbers
        setValue(`otp${index}` as keyof OTPFormData, newValue);

        // Move to the next input if there is a digit
        if (newValue && index < 5) {
            inputRefs.current[index + 1]?.focus();
        }
    };

    // Function to handle key events
    const handleKeyUp = (e: React.KeyboardEvent<HTMLInputElement>, index: number) => {
        if (e.key === 'Backspace' && !e.currentTarget.value) {
            // If the current input is empty and backspace is pressed, focus the previous input
            setValue(`otp${index}` as keyof OTPFormData, '');
            if (index > 0) {
                inputRefs.current[index - 1]?.focus();
            }
        }
    };

    // Function to handle pasting values
    const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>, index: number) => {
        const pastedData = e.clipboardData.getData('text');

        // Only process if the pasted data is 6 digits long
        if (/^\d{6}$/.test(pastedData)) {
            const digits = pastedData.split('');
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
        console.log('OTP submitted: ', Object.values(data).join(''));
    };

    // Watching the values to enable/disable the submit button
    const isFilled = Object.values(watch()).every(value => value);

    return (
        <Grid2
            container
            direction="column" // Ensure items stack vertically
            justifyContent="center" // Center horizontally
            alignItems="center" // Center vertically
            sx={{
                background: '#004878',
                height: '100vh',
                width: '100vw',
                gap: '16px', // Adjust gap value for overall spacing
                padding: '20px' // Add padding to the container
            }}
        >
            {/* Back Button Positioned Absolutely in Top Right Corner */}
            <Button
                sx={{
                    color: 'white',
                    position: 'absolute',
                    top: 25,
                    left: 25,
                    display: 'flex', // Use flex to align icon and text
                    alignItems: 'center', // Center vertically
                    textTransform: 'none',
                    fontSize: '2.5vh',
                    transition: 'transform 0.3s ease', // Smooth transition for scaling
                    ':hover': {
                        transform: 'scale(1.05)', // Scale on hover
                        background: 'none'
                    }
                }}
            >
                <ArrowBackIcon sx={{ mr: 1 }} fontSize='small' /> {/* Add margin to the right of the icon */}
                Back
            </Button>
            <Grid2 alignItems="stretch" sx={{ textAlign: 'center', mb: 8 }}>
                <Grid2>
                    <img
                        src={logo} // Use the imported image
                        alt="Capital One Logo" // Add alt text for accessibility
                        style={{
                            width: '200px', // Set width
                            height: 'auto', // Maintain aspect ratio
                        }}
                    />
                </Grid2>
                <Grid2 sx={{ mt: 6 }}>
                    <Typography variant='h1' sx={{
                        fontSize: '5vh',
                        fontWeight: 600,
                        color: 'white',
                        mb: 1
                    }}>
                        Account Verification
                    </Typography>
                    <Typography variant='body1' sx={{
                        color: 'white',
                    }}>
                        Enter the code sent to your phone below.
                    </Typography>
                </Grid2>
                <Grid2 sx={{ my: 4, mb: 8 }}>
                    <form onSubmit={handleSubmit(onSubmit)} style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
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
                                            onChange={(e) => handleInputChange(e.target.value, index)}
                                            onKeyUp={(e) => handleKeyUp(e, index)}
                                            onPaste={(e) => handlePaste(e, index)}
                                            ref={(el) => (inputRefs.current[index] = el as HTMLInputElement)}
                                            style={{
                                                width: '70px',
                                                height: '70px',
                                                textAlign: 'center',
                                                fontSize: '30px',
                                                border: '1px solid #ccc',
                                                color: '#004878',
                                                fontWeight: 600,
                                                borderRadius: '10px',
                                                caretColor: 'transparent', // Hide the cursor
                                            }}
                                        />
                                    </div>
                                )}
                            />
                        ))}
                    </form>
                </Grid2>
                <Grid2 >
                    <Button type="submit" disabled={!isFilled} variant='outlined' sx={{
                        background: 'white',
                        borderRadius: '10px',
                        px: 4,
                        color: '#004878',
                        textTransform: 'none',
                        width: '90%',
                        boxShadow: !isFilled ? 'none' : '0 0 10px rgba(255, 255, 255, 0.5)',
                        fontSize: '2.5vh',
                        fontWeight: 600,
                        transition: 'box-shadow 0.3s ease, background 0.3s ease, color 0.3s ease',
                        ':hover': {
                            border: '1.5px solid white',
                            color: '#004878',
                            background: 'white',
                            boxShadow: '0 0 20px rgba(255, 255, 255, 0.7)',
                        },
                        // Styles for the disabled state
                        '&.Mui-disabled': {
                            background: 'rgba(255, 255, 255, 0.2)',
                            color: 'rgba(255, 255, 255, 0.5)', 
                            cursor: 'not-allowed', 
                            boxShadow: 'none',
                        },
                    }}>
                        Continue
                    </Button>
                </Grid2>
                <Grid2 sx={{ mt: 2 }}>
                    <Typography sx={{
                        color: 'white',
                        fontSize: '2vh',
                    }}>
                        Didn't receive a code? Resend.
                    </Typography>
                </Grid2>
            </Grid2>
        </Grid2>
    );
};

export default OTPInputWithZod;
