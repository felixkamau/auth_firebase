import React, { useState } from 'react';
import { Button, TextField, Typography, Container, Box, CssBaseline } from '@mui/material';
import { sendPasswordResetEmail } from 'firebase/auth';
import { auth } from '../firebase/config';
import { useNavigate } from 'react-router-dom';
const ResetPassword = () => {
    const [email, setEmail] = useState('');
    const [message, setMessage] = useState('');
    const [showLoginButton, setShowLoginButton] = useState(false);
    const [isResetting, setIsResetting] = useState(false); // New state to manage button visibility
    const navigate = useNavigate();

    const handleResetPassword = async (event) => {
        event.preventDefault();
        setIsResetting(true);
        try {
            await sendPasswordResetEmail(auth, email);
            setMessage('Password reset email sent! Check your inbox.');
            setShowLoginButton(true);
        } catch (error) {
            setMessage('Error sending password reset email. Please try again.');
            console.error('Error sending password reset email:', error);
        } finally {
            setIsResetting(false);
        }
    };

    const LoginRidirect = () => {
        navigate('/');
    }

    return (
        <Container component="main" maxWidth="xs">
            <CssBaseline />
            <Box
                sx={{
                    marginTop: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                }}
            >
                <Typography component="h1" variant="h5">
                    Reset Password
                </Typography>
                <Box component="form" noValidate onSubmit={handleResetPassword} sx={{ mt: 3 }}>
                    <TextField
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        sx={{ mb: 2 }}
                    />
                    {!isResetting && !showLoginButton && (
                        <Button
                            type="submit"
                            fullWidth
                            variant="contained"
                            color="primary"
                            sx={{ mt: 2 }}
                        >
                            Send Reset Link
                        </Button>
                    )
                    }
                    {message && <Typography sx={{ mt: 2 }}>{message}</Typography>}

                    {showLoginButton && (
                        <Button
                            fullWidth
                            variant='contained'
                            color='primary'
                            sx={{ mt: 2 }}
                            onClick={LoginRidirect}
                        >
                            Go to Login
                        </Button>
                    )}
                </Box>
            </Box>
        </Container>
    );
};

export default ResetPassword;
