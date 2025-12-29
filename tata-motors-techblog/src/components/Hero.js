import React from 'react';
import { Box, Container, Typography, Button, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import TrendingUpIcon from '@mui/icons-material/TrendingUp';
import SecurityIcon from '@mui/icons-material/Security';

const Hero = () => {
  return (
    <Paper
      sx={{
        position: 'relative',
        bgcolor: '#001E3C',
        color: '#fff',
        mb: 8,
        pt: { xs: 8, md: 12 },
        pb: { xs: 8, md: 12 },
        borderRadius: 2,
        overflow: 'hidden',
        backgroundImage: 'linear-gradient(rgba(0, 30, 60, 0.9), rgba(0, 30, 60, 0.9))',
      }}
    >
      <Container maxWidth="lg">
        <Box sx={{ position: 'relative', zIndex: 1 }}>
          <Typography
            component="h1"
            variant="h2"
            align="center"
            gutterBottom
            sx={{ 
              fontWeight: 800,
              fontSize: { xs: '2.5rem', md: '3.5rem' }
            }}
          >
            Tata Motors Technology Blog
          </Typography>
          
          <Typography variant="h5" align="center" paragraph sx={{ mb: 4, opacity: 0.9 }}>
            Innovation, Sustainability, and Excellence in Automotive Technology
          </Typography>
          
          <Box sx={{ display: 'flex', justifyContent: 'center', gap: 2, mb: 6 }}>
            <Button
              component={Link}
              to="/article/tata-motors-ev-revolution"
              variant="contained"
              size="large"
              sx={{ 
                bgcolor: '#00a86b',
                '&:hover': { bgcolor: '#008f5c' }
              }}
            >
              Explore EV Technology
            </Button>
            <Button
              component={Link}
              to="/category/Electric Vehicles"
              variant="outlined"
              size="large"
              sx={{ 
                borderColor: 'white',
                color: 'white',
                '&:hover': { 
                  borderColor: 'white',
                  bgcolor: 'rgba(255,255,255,0.1)'
                }
              }}
            >
              View All Articles
            </Button>
          </Box>
          
          <Box sx={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: 4, mt: 6 }}>
            <Box sx={{ textAlign: 'center', maxWidth: 200 }}>
              <ElectricCarIcon sx={{ fontSize: 48, color: '#00a86b', mb: 1 }} />
              <Typography variant="h6" gutterBottom>EV Innovation</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Leading India's electric vehicle revolution
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center', maxWidth: 200 }}>
              <TrendingUpIcon sx={{ fontSize: 48, color: '#ff5722', mb: 1 }} />
              <Typography variant="h6" gutterBottom>Sustainable Growth</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Green manufacturing and circular economy
              </Typography>
            </Box>
            
            <Box sx={{ textAlign: 'center', maxWidth: 200 }}>
              <SecurityIcon sx={{ fontSize: 48, color: '#2196f3', mb: 1 }} />
              <Typography variant="h6" gutterBottom>Advanced Safety</Typography>
              <Typography variant="body2" sx={{ opacity: 0.8 }}>
                Protecting every journey with cutting-edge technology
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>
    </Paper>
  );
};

export default Hero;