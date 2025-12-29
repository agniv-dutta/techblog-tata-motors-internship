import React from 'react';
import { useParams } from 'react-router-dom';
import { 
  Container, 
  Typography, 
  Box, 
  Chip, 
  Paper, 
  Avatar, 
  Divider,
  Grid,
  Card,
  CardContent,
  Button
} from '@mui/material';
import { getArticleBySlug, getRelatedArticles } from '../data/articles';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import CalendarTodayIcon from '@mui/icons-material/CalendarToday';
import VisibilityIcon from '@mui/icons-material/Visibility';
import PersonIcon from '@mui/icons-material/Person';
import { Link } from 'react-router-dom';
import ReactMarkdown from 'react-markdown';

const ArticlePage = () => {
  const { slug } = useParams();
  const article = getArticleBySlug(slug);
  const relatedArticles = article ? getRelatedArticles(article.id) : [];

  if (!article) {
    return (
      <Container>
        <Typography variant="h4" align="center" sx={{ mt: 8 }}>
          Article not found
        </Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="lg">
      {/* Article Header */}
      <Paper 
        elevation={0} 
        sx={{ 
          p: { xs: 3, md: 5 }, 
          mb: 4, 
          borderRadius: 2,
          bgcolor: '#f8f9fa'
        }}
      >
        <Chip
          label={article.category}
          sx={{ 
            bgcolor: '#0066cc', 
            color: 'white',
            fontWeight: 600,
            mb: 3
          }}
        />
        
        <Typography variant="h2" gutterBottom sx={{ fontWeight: 700, mb: 3 }}>
          {article.title}
        </Typography>
        
        <Box sx={{ display: 'flex', alignItems: 'center', flexWrap: 'wrap', gap: 3, mb: 3 }}>
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
            <Avatar sx={{ bgcolor: '#0066cc', width: 40, height: 40 }}>
              <PersonIcon />
            </Avatar>
            <Box>
              <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>
                {article.author}
              </Typography>
              <Typography variant="caption" color="text.secondary">
                {article.authorRole}
              </Typography>
            </Box>
          </Box>
          
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 4 }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <CalendarTodayIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {article.date}
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <AccessTimeIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {article.readTime} min read
              </Typography>
            </Box>
            
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
              <VisibilityIcon fontSize="small" sx={{ color: 'text.secondary' }} />
              <Typography variant="body2" color="text.secondary">
                {article.views} views
              </Typography>
            </Box>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1, mb: 3 }}>
          {article.tags.map((tag) => (
            <Chip
              key={tag}
              label={tag}
              size="small"
              variant="outlined"
            />
          ))}
        </Box>
        
        {article.featuredImage && (
          <Box sx={{ mb: 4, borderRadius: 2, overflow: 'hidden' }}>
            <img
              src={article.featuredImage}
              alt={article.title}
              style={{
                width: '100%',
                maxHeight: '500px',
                objectFit: 'cover',
              }}
            />
          </Box>
        )}
        
        <Typography variant="h5" gutterBottom sx={{ color: 'text.secondary', mb: 4 }}>
          {article.excerpt}
        </Typography>
      </Paper>

      {/* Article Content */}
      <Paper elevation={0} sx={{ p: { xs: 3, md: 5 }, mb: 4, borderRadius: 2 }}>
        <ReactMarkdown
          components={{
            h1: ({node, ...props}) => <Typography variant="h3" gutterBottom sx={{ mt: 4, mb: 2, fontWeight: 700 }} {...props} />,
            h2: ({node, ...props}) => <Typography variant="h4" gutterBottom sx={{ mt: 4, mb: 2, fontWeight: 600 }} {...props} />,
            h3: ({node, ...props}) => <Typography variant="h5" gutterBottom sx={{ mt: 3, mb: 1.5, fontWeight: 600 }} {...props} />,
            p: ({node, ...props}) => <Typography variant="body1" paragraph sx={{ lineHeight: 1.8, mb: 2 }} {...props} />,
            ul: ({node, ...props}) => <Box component="ul" sx={{ pl: 3, mb: 2 }} {...props} />,
            li: ({node, ...props}) => <Typography component="li" variant="body1" sx={{ mb: 1, lineHeight: 1.8 }} {...props} />,
            strong: ({node, ...props}) => <Typography component="span" sx={{ fontWeight: 600 }} {...props} />,
          }}
        >
          {article.content}
        </ReactMarkdown>
      </Paper>

      <Divider sx={{ my: 6 }} />

      {/* Author Bio */}
      <Paper elevation={0} sx={{ p: 4, mb: 6, borderRadius: 2, bgcolor: '#f8f9fa' }}>
        <Typography variant="h5" gutterBottom sx={{ fontWeight: 600, mb: 3 }}>
          About the Author
        </Typography>
        <Box sx={{ display: 'flex', alignItems: 'flex-start', gap: 3 }}>
          <Avatar sx={{ bgcolor: '#0066cc', width: 80, height: 80, fontSize: 32 }}>
            {article.author.charAt(0)}
          </Avatar>
          <Box>
            <Typography variant="h6" gutterBottom>
              {article.author}
            </Typography>
            <Typography variant="subtitle1" color="primary" gutterBottom>
              {article.authorRole}
            </Typography>
            <Typography variant="body2" color="text.secondary" sx={{ lineHeight: 1.7 }}>
              Part of Tata Motors' dedicated team of engineers and researchers pushing the boundaries of automotive technology.
              With years of experience in {article.category.toLowerCase()}, contributing to groundbreaking innovations that shape the future of mobility.
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* Related Articles */}
      {relatedArticles.length > 0 && (
        <>
          <Typography variant="h4" gutterBottom sx={{ fontWeight: 600, mb: 4 }}>
            Related Articles
          </Typography>
          <Grid container spacing={3} sx={{ mb: 8 }}>
            {relatedArticles.map((related) => (
              <Grid item xs={12} md={6} key={related.id}>
                <Card sx={{ height: '100%' }}>
                  <CardContent>
                    <Chip
                      label={related.category}
                      size="small"
                      sx={{ 
                        bgcolor: '#0066cc', 
                        color: 'white',
                        mb: 2
                      }}
                    />
                    <Typography variant="h6" gutterBottom>
                      {related.title}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" paragraph>
                      {related.excerpt}
                    </Typography>
                    <Button
                      component={Link}
                      to={`/article/${related.slug}`}
                      variant="outlined"
                      size="small"
                      sx={{ 
                        color: '#0066cc',
                        borderColor: '#0066cc',
                        '&:hover': {
                          borderColor: '#0052a3',
                          bgcolor: 'rgba(0, 102, 204, 0.05)'
                        }
                      }}
                    >
                      Read Article
                    </Button>
                  </CardContent>
                </Card>
              </Grid>
            ))}
          </Grid>
        </>
      )}
    </Container>
  );
};

export default ArticlePage;