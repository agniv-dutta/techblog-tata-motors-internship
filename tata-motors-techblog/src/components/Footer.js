import React from 'react';
import { Box, Container, Typography, Grid, Link, IconButton } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import LinkedInIcon from '@mui/icons-material/LinkedIn';
import TwitterIcon from '@mui/icons-material/Twitter';
import YouTubeIcon from '@mui/icons-material/YouTube';

const Footer = () => {
  return (
    <Box
      component="footer"
      sx={{
        bgcolor: '#1a1a1a',
        color: 'white',
        py: 6,
        mt: 'auto'
      }}
    >
      <Container maxWidth="lg">
        <Grid container spacing={4}>
          <Grid item xs={12} md={4}>
            <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
              <DirectionsCarIcon sx={{ mr: 1, fontSize: 32 }} />
              <Typography variant="h6" component="div">
                Tata Motors Tech Blog
              </Typography>
            </Box>
            <Typography variant="body2" color="text.secondary" sx={{ color: '#aaa' }}>
              Exploring innovation, technology, and sustainability in the automotive industry.
            </Typography>
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Categories
            </Typography>
            {['Electric Vehicles', 'Autonomous Driving', 'Sustainability', 'Connectivity', 'Safety'].map((category) => (
              <Typography key={category} variant="body2" sx={{ mb: 0.5 }}>
                <Link 
                  href={`/category/${category}`} 
                  color="inherit"
                  sx={{ 
                    color: '#aaa',
                    textDecoration: 'none',
                    '&:hover': { color: 'white' }
                  }}
                >
                  {category}
                </Link>
              </Typography>
            ))}
          </Grid>
          
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ color: 'white' }}>
              Connect With Us
            </Typography>
            <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
              <IconButton 
                sx={{ 
                  color: '#aaa',
                  '&:hover': { color: '#0a66c2' }
                }}
                href="https://linkedin.com/company/tatamotors"
                target="_blank"
              >
                <LinkedInIcon />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: '#aaa',
                  '&:hover': { color: '#1da1f2' }
                }}
                href="https://twitter.com/TataMotors"
                target="_blank"
              >
                <TwitterIcon />
              </IconButton>
              <IconButton 
                sx={{ 
                  color: '#aaa',
                  '&:hover': { color: '#ff0000' }
                }}
                href="https://youtube.com/user/TataMotors"
                target="_blank"
              >
                <YouTubeIcon />
              </IconButton>
            </Box>
            <Typography variant="body2" sx={{ color: '#aaa', mt: 2 }}>
              © {new Date().getFullYear()} Tata Motors Limited
            </Typography>
            <Typography variant="body2" sx={{ color: '#666', fontSize: '0.8rem' }}>
              All trademarks belong to their respective owners.
            </Typography>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;