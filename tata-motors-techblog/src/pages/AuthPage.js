import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import {
  Container,
  Box,
  Paper,
  TextField,
  Button,
  Typography,
  Tabs,
  Tab,
  Alert,
} from '@mui/material';
import { useAuth } from '../contexts/AuthContext';

const AuthPage = () => {
  const [tab, setTab] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const { login, signup } = useAuth();
  const navigate = useNavigate();

  // Login state
  const [loginData, setLoginData] = useState({ email: '', password: '' });

  // Signup state
  const [signupData, setSignupData] = useState({ name: '', email: '', password: '', confirmPassword: '' });

  const handleLoginChange = (e) => {
    setLoginData({ ...loginData, [e.target.name]: e.target.value });
  };

  const handleSignupChange = (e) => {
    setSignupData({ ...signupData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      login(loginData.email, loginData.password);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      if (signupData.password !== signupData.confirmPassword) {
        throw new Error('Passwords do not match');
      }

      if (!signupData.email.includes('@tatamotors.com') && !signupData.email.includes('@tata.com')) {
        throw new Error('Please use your Tata Motors corporate email');
      }

      signup(signupData.email, signupData.password, signupData.name);
      navigate('/');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <Container maxWidth="sm">
      <Box sx={{ my: 8 }}>
        <Paper elevation={3} sx={{ p: 4 }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ mb: 4, fontWeight: 700 }}>
            Tata Motors Tech Blog
          </Typography>

          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

          <Tabs value={tab} onChange={(e, newValue) => setTab(newValue)} variant="fullWidth" sx={{ mb: 3 }}>
            <Tab label="Login" />
            <Tab label="Sign Up" />
          </Tabs>

          {tab === 0 ? (
            // Login Form
            <Box component="form" onSubmit={handleLogin}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                margin="normal"
                value={loginData.email}
                onChange={handleLoginChange}
                placeholder="your.email@tatamotors.com"
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                margin="normal"
                value={loginData.password}
                onChange={handleLoginChange}
                required
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Logging in...' : 'Login'}
              </Button>
              <Typography variant="body2" color="text.secondary" align="center">
                Demo credentials: employee@tatamotors.com / password123
              </Typography>
            </Box>
          ) : (
            // Signup Form
            <Box component="form" onSubmit={handleSignup}>
              <TextField
                fullWidth
                label="Full Name"
                name="name"
                margin="normal"
                value={signupData.name}
                onChange={handleSignupChange}
                required
              />
              <TextField
                fullWidth
                label="Corporate Email"
                name="email"
                type="email"
                margin="normal"
                value={signupData.email}
                onChange={handleSignupChange}
                placeholder="your.email@tatamotors.com"
                required
              />
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                margin="normal"
                value={signupData.password}
                onChange={handleSignupChange}
                required
              />
              <TextField
                fullWidth
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                margin="normal"
                value={signupData.confirmPassword}
                onChange={handleSignupChange}
                required
              />
              <Button
                fullWidth
                variant="contained"
                color="primary"
                sx={{ mt: 3, mb: 2 }}
                type="submit"
                disabled={loading}
              >
                {loading ? 'Creating account...' : 'Sign Up'}
              </Button>
              <Typography variant="body2" color="text.secondary" align="center">
                Must use a Tata Motors corporate email (@tatamotors.com or @tata.com)
              </Typography>
            </Box>
          )}

          <Box sx={{ mt: 3, textAlign: 'center' }}>
            <Link to="/" style={{ textDecoration: 'none' }}>
              <Button color="inherit">Back to Home</Button>
            </Link>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AuthPage;
