import React from 'react';
import { Card, CardContent, CardMedia, Typography, Button, Box, Chip } from '@mui/material';
import { Link } from 'react-router-dom';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import VisibilityIcon from '@mui/icons-material/Visibility';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';

const ArticleCard = ({ article }) => {
  return (
    <Card sx={{ 
      height: '100%', 
      display: 'flex', 
      flexDirection: 'column',
      transition: 'transform 0.3s, box-shadow 0.3s',
      '&:hover': {
        transform: 'translateY(-8px)',
        boxShadow: '0 12px 20px rgba(0,0,0,0.15)'
      }
    }}>
      {article.featuredImage && (
        <CardMedia
          component="img"
          height="200"
          image={article.featuredImage}
          alt={article.title}
          sx={{ objectFit: 'cover' }}
        />
      )}
      <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
        <Box sx={{ mb: 2 }}>
          <Chip 
            label={article.category} 
            size="small" 
            sx={{ 
              bgcolor: '#0066cc', 
              color: 'white',
              fontWeight: 500
            }}
          />
        </Box>
        
        <Typography 
          variant="h6" 
          gutterBottom
          sx={{ 
            fontWeight: 600,
            flexGrow: 1,
            lineHeight: 1.3
          }}
        >
          {article.title}
        </Typography>
        
        <Typography 
          variant="body2" 
          color="text.secondary" 
          paragraph
          sx={{ mb: 2 }}
        >
          {article.excerpt}
        </Typography>
        
        <Box sx={{ mt: 'auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1.5 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <CalendarTodayIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: 16 }} />
              <Typography variant="caption" color="text.secondary">
                {article.date}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <AccessTimeIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: 16 }} />
              <Typography variant="caption" color="text.secondary">
                {article.readTime} min
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 0.5 }}>
              <VisibilityIcon fontSize="small" sx={{ color: 'text.secondary', fontSize: 16 }} />
              <Typography variant="caption" color="text.secondary">
                {article.views}
              </Typography>
            </Box>
          </Box>
          
          <Button
            component={Link}
            to={`/article/${article.slug}`}
            size="small"
            sx={{ 
              color: '#0066cc',
              fontWeight: 600,
              '&:hover': {
                bgcolor: 'rgba(0, 102, 204, 0.05)'
              }
            }}
          >
            Read More
          </Button>
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 0.5, mt: 2 }}>
          {article.tags.slice(0, 3).map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.7rem' }}
            />
          ))}
        </Box>
      </CardContent>
    </Card>
  );
};

export default ArticleCard;