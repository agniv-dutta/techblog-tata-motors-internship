import React from 'react';
import { Container, Grid, Typography, Box } from '@mui/material';
import ArticleCard from '../components/ArticleCard';
import Hero from '../components/Hero';
import { getAllArticles, getFeaturedArticles } from '../data/articles';

const HomePage = () => {
  const allArticles = getAllArticles();
  const featuredArticles = getFeaturedArticles();

  return (
    <>
      <Hero />
      
      <Container maxWidth="lg">
        {/* Featured Articles */}
        <Box sx={{ mb: 8 }}>
          <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
            Featured Articles
          </Typography>
          <Grid container spacing={4}>
            {featuredArticles.map((article) => (
              <Grid item key={article.id} xs={12} md={6} lg={4}>
                <ArticleCard article={article} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* All Articles */}
        <Box>
          <Typography variant="h4" gutterBottom sx={{ mb: 4, fontWeight: 600 }}>
            Latest Technology Insights
          </Typography>
          <Grid container spacing={4}>
            {allArticles.map((article) => (
              <Grid item key={article.id} xs={12} md={6} lg={4}>
                <ArticleCard article={article} />
              </Grid>
            ))}
          </Grid>
        </Box>

        {/* Technology Focus */}
        <Box sx={{ mt: 10, mb: 6, textAlign: 'center' }}>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600 }}>
            Technology Focus Areas
          </Typography>
          <Typography variant="body1" color="text.secondary" sx={{ mb: 4, maxWidth: 800, mx: 'auto' }}>
            Tata Motors is pioneering innovation across multiple technology domains to create smarter, safer, and more sustainable mobility solutions.
          </Typography>
          
          <Grid container spacing={3} sx={{ mt: 2 }}>
            {[
              { 
                title: 'Electric Mobility', 
                description: 'Advanced battery systems, charging infrastructure, and efficient powertrains',
                color: '#00a86b'
              },
              { 
                title: 'Autonomous Systems', 
                description: 'AI-driven self-driving technology and advanced sensor fusion',
                color: '#ff5722'
              },
              { 
                title: 'Sustainable Manufacturing', 
                description: 'Green factories, circular economy, and renewable energy',
                color: '#2196f3'
              },
              { 
                title: 'Connected Vehicles', 
                description: 'IoT integration, telematics, and smart mobility solutions',
                color: '#9c27b0'
              }
            ].map((tech, index) => (
              <Grid item xs={12} sm={6} md={3} key={index}>
                <Box 
                  sx={{ 
                    p: 3, 
                    height: '100%',
                    border: `2px solid ${tech.color}20`,
                    borderRadius: 2,
                    bgcolor: `${tech.color}08`,
                    transition: 'transform 0.2s',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      bgcolor: `${tech.color}12`
                    }
                  }}
                >
                  <Typography 
                    variant="h6" 
                    gutterBottom 
                    sx={{ 
                      color: tech.color,
                      fontWeight: 600 
                    }}
                  >
                    {tech.title}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    {tech.description}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </>
  );
};

export default HomePage;