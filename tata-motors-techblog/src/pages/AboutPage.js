import React from 'react';
import { Container, Typography, Box, Grid, Paper, Avatar } from '@mui/material';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';
import ElectricCarIcon from '@mui/icons-material/ElectricCar';
import SpaIcon from '@mui/icons-material/Spa';  // Changed from EcoIcon to SpaIcon
import SecurityIcon from '@mui/icons-material/Security';
import { getAllArticles } from '../data/articles';

const AboutPage = () => {
  const articles = getAllArticles();

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 8 }}>
        <Typography variant="h2" gutterBottom align="center" sx={{ fontWeight: 800, mb: 4 }}>
          About Tata Motors Tech Blog
        </Typography>
        
        <Typography variant="h5" align="center" color="text.secondary" paragraph sx={{ mb: 8, maxWidth: 800, mx: 'auto' }}>
          A platform dedicated to sharing technological innovations, research insights, and engineering excellence from Tata Motors.
        </Typography>

        <Paper elevation={0} sx={{ p: 5, mb: 8, borderRadius: 3, bgcolor: '#f8f9fa' }}>
          <Grid container spacing={4} alignItems="center">
            <Grid item xs={12} md={6}>
              <Avatar sx={{ bgcolor: '#0066cc', width: 80, height: 80, mb: 3 }}>
                <DirectionsCarIcon sx={{ fontSize: 40 }} />
              </Avatar>
              <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                Our Mission
              </Typography>
              <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                To showcase Tata Motors' technological leadership and innovation in the automotive industry, 
                while educating and inspiring the next generation of engineers, researchers, and automotive enthusiasts.
              </Typography>
              <Typography variant="body1" sx={{ lineHeight: 1.8, fontSize: '1.1rem' }}>
                We believe in transparently sharing our technological journey, challenges, and breakthroughs 
                to foster innovation and collaboration across the industry.
              </Typography>
            </Grid>
            <Grid item xs={12} md={6}>
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: 'repeat(2, 1fr)', 
                gap: 3 
              }}>
                {[
                  { icon: <ElectricCarIcon />, title: `${articles.length}+`, subtitle: 'Technology Articles' },
                  { icon: <SpaIcon />, title: '5', subtitle: 'Technology Domains' },  // Changed from EcoIcon to SpaIcon
                  { icon: <SecurityIcon />, title: '70%', subtitle: 'EV Market Share' },
                  { icon: <DirectionsCarIcon />, title: '75+', subtitle: 'Years of Innovation' },
                ].map((stat, index) => (
                  <Paper 
                    key={index}
                    elevation={0}
                    sx={{ 
                      p: 3, 
                      textAlign: 'center',
                      borderRadius: 2,
                      border: '1px solid #e0e0e0'
                    }}
                  >
                    <Box sx={{ color: '#0066cc', mb: 1, fontSize: 32 }}>
                      {stat.icon}
                    </Box>
                    <Typography variant="h4" gutterBottom sx={{ fontWeight: 700 }}>
                      {stat.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      {stat.subtitle}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        <Typography variant="h3" gutterBottom align="center" sx={{ fontWeight: 700, mb: 6 }}>
          Technology Focus Areas
        </Typography>
        
        <Grid container spacing={4} sx={{ mb: 8 }}>
          {[
            {
              title: 'Electric Mobility',
              description: 'Pioneering India\'s EV revolution with advanced battery technology, efficient powertrains, and charging infrastructure.',
              icon: <ElectricCarIcon />,
              color: '#00a86b'
            },
            {
              title: 'Autonomous Technology',
              description: 'Developing self-driving systems with AI, machine learning, and sensor fusion for safer transportation.',
              icon: <DirectionsCarIcon />,
              color: '#ff5722'
            },
            {
              title: 'Sustainable Manufacturing',
              description: 'Implementing green manufacturing practices, circular economy principles, and renewable energy solutions.',
              icon: <SpaIcon />,  // Changed from EcoIcon to SpaIcon
              color: '#2196f3'
            },
            {
              title: 'Connected Vehicles',
              description: 'Building intelligent vehicles with IoT integration, telematics, and smart mobility solutions.',
              icon: <SecurityIcon />,
              color: '#9c27b0'
            }
          ].map((area, index) => (
            <Grid item xs={12} md={6} key={index}>
              <Paper 
                elevation={0}
                sx={{ 
                  p: 4, 
                  height: '100%',
                  borderRadius: 3,
                  borderLeft: `6px solid ${area.color}`,
                  '&:hover': {
                    boxShadow: '0 8px 25px rgba(0,0,0,0.1)'
                  }
                }}
              >
                <Box sx={{ color: area.color, mb: 2, fontSize: 40 }}>
                  {area.icon}
                </Box>
                <Typography variant="h5" gutterBottom sx={{ fontWeight: 600 }}>
                  {area.title}
                </Typography>
                <Typography variant="body1" color="text.secondary" sx={{ lineHeight: 1.7 }}>
                  {area.description}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>

        <Paper elevation={0} sx={{ p: 5, borderRadius: 3, bgcolor: '#001E3C', color: 'white' }}>
          <Typography variant="h4" gutterBottom align="center" sx={{ fontWeight: 700, mb: 4 }}>
            Our Commitment to Innovation
          </Typography>
          <Typography variant="body1" align="center" sx={{ maxWidth: 800, mx: 'auto', opacity: 0.9, fontSize: '1.1rem' }}>
            Tata Motors is committed to driving innovation that matters. Through this blog, we share our journey 
            of technological advancement, our commitment to sustainability, and our vision for the future of mobility. 
            Join us as we shape the future of transportation.
          </Typography>
          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Typography variant="h6" sx={{ fontWeight: 600 }}>
              Driving Innovation. Powering Progress.
            </Typography>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default AboutPage;