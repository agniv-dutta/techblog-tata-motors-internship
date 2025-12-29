import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import { Container } from '@mui/material';

// Context
import { AuthProvider } from './contexts/AuthContext';

// Components
import Header from './components/Header';
import Footer from './components/Footer';

// Pages
import HomePage from './pages/HomePage';
import ArticlePage from './pages/ArticlePage';
import AboutPage from './pages/AboutPage';
import AuthPage from './pages/AuthPage';
import PublishBlogPage from './pages/PublishBlogPage';
import MyBlogsPage from './pages/MyBlogsPage';

const theme = createTheme({
  palette: {
    primary: {
      main: '#0066cc', // Tata Motors Blue
    },
    secondary: {
      main: '#ff5722',
    },
    background: {
      default: '#ffffff',
    },
  },
  typography: {
    fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
    },
    h2: {
      fontWeight: 700,
    },
    h3: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          textTransform: 'none',
          fontWeight: 600,
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          borderRadius: 12,
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <AuthProvider>
        <Router>
          <Header />
          <Container maxWidth="xl" sx={{ minHeight: '80vh' }}>
            <Routes>
              <Route path="/" element={<HomePage />} />
              <Route path="/article/:slug" element={<ArticlePage />} />
              <Route path="/category/:category" element={<HomePage />} />
              <Route path="/about" element={<AboutPage />} />
              <Route path="/login" element={<AuthPage />} />
              <Route path="/publish" element={<PublishBlogPage />} />
              <Route path="/my-blogs" element={<MyBlogsPage />} />
            </Routes>
          </Container>
          <Footer />
        </Router>
      </AuthProvider>
    </ThemeProvider>
  );
}

export default App;