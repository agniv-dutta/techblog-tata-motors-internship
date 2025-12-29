import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Container,
  Box,
  IconButton,
  Menu,
  MenuItem
} from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import { Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const Header = () => {
  const { user, logout, isEmployee } = useAuth();
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    window.location.href = '/';
  };

  const categories = [
    { name: 'Electric Vehicles', slug: 'Electric Vehicles' },
    { name: 'Autonomous Driving', slug: 'Autonomous Driving' },
    { name: 'Sustainability', slug: 'Sustainability' },
    { name: 'Connectivity', slug: 'Connectivity' },
    { name: 'Safety', slug: 'Safety' }
  ];

  return (
    <AppBar position="sticky" sx={{ bgcolor: '#0066cc', mb: 4 }}>
      <Container maxWidth="lg">
        <Toolbar disableGutters>
          <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="logo"
            sx={{ mr: 2 }}
            component={Link}
            to="/"
          >
            <DirectionsCarIcon sx={{ fontSize: 32 }} />
          </IconButton>
          
          <Typography
            variant="h5"
            noWrap
            component={Link}
            to="/"
            sx={{
              mr: 4,
              fontWeight: 700,
              color: 'inherit',
              textDecoration: 'none',
              flexGrow: { xs: 1, md: 0 }
            }}
          >
            Tata Motors Tech Blog
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {categories.map((category) => (
              <Button
                key={category.slug}
                component={Link}
                to={`/category/${category.slug}`}
                sx={{ 
                  color: 'white', 
                  mx: 1,
                  '&:hover': {
                    bgcolor: 'rgba(255,255,255,0.1)'
                  }
                }}
              >
                {category.name}
              </Button>
            ))}
          </Box>

          <Button 
            component={Link} 
            to="/about" 
            color="inherit"
            sx={{ 
              mr: 2,
              '&:hover': {
                bgcolor: 'rgba(255,255,255,0.1)'
              }
            }}
          >
            About
          </Button>

          {isEmployee && (
            <Button 
              component={Link} 
              to="/publish" 
              variant="contained"
              sx={{ 
                bgcolor: '#28a745',
                mr: 2,
                '&:hover': {
                  bgcolor: '#218838'
                }
              }}
            >
              + Publish
            </Button>
          )}

          {user ? (
            <>
              <IconButton
                onClick={handleMenuOpen}
                color="inherit"
                sx={{ ml: 1 }}
              >
                <AccountCircleIcon sx={{ fontSize: 32 }} />
              </IconButton>
              <Menu
                anchorEl={anchorEl}
                open={Boolean(anchorEl)}
                onClose={handleMenuClose}
              >
                <MenuItem disabled sx={{ fontWeight: 600 }}>
                  {user.name}
                </MenuItem>
                <MenuItem divider sx={{ fontSize: '0.85rem', color: '#666' }}>
                  {user.email}
                </MenuItem>
                {isEmployee && (
                  <MenuItem component={Link} to="/my-blogs" onClick={handleMenuClose}>
                    My Blogs
                  </MenuItem>
                )}
                <MenuItem onClick={handleLogout} sx={{ color: '#d32f2f' }}>
                  Logout
                </MenuItem>
              </Menu>
            </>
          ) : (
            <Button 
              component={Link} 
              to="/login" 
              color="inherit"
              sx={{ 
                border: '1px solid rgba(255,255,255,0.5)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              Login
            </Button>
          )}
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default Header;