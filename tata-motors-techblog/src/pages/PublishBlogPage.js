import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  TextField,
  Button,
  Typography,
  Paper,
  Alert,
  MenuItem,
  Toolbar,
  IconButton,
  Divider,
} from '@mui/material';
import FormatBoldIcon from '@mui/icons-material/FormatBold';
import FormatItalicIcon from '@mui/icons-material/FormatItalic';
import FormatUnderlinedIcon from '@mui/icons-material/FormatUnderlined';
import FormatListBulletedIcon from '@mui/icons-material/FormatListBulleted';
import FormatListNumberedIcon from '@mui/icons-material/FormatListNumbered';
import CodeIcon from '@mui/icons-material/Code';
import FormatIndentIncreaseIcon from '@mui/icons-material/FormatIndentIncrease';
import FormatIndentDecreaseIcon from '@mui/icons-material/FormatIndentDecrease';
import FormatAlignLeftIcon from '@mui/icons-material/FormatAlignLeft';
import FormatAlignCenterIcon from '@mui/icons-material/FormatAlignCenter';
import FormatAlignRightIcon from '@mui/icons-material/FormatAlignRight';
import StrikethroughSIcon from '@mui/icons-material/StrikethroughS';
import { useAuth } from '../contexts/AuthContext';

const PublishBlogPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    title: '',
    excerpt: '',
    content: '',
    category: 'Electric Vehicles',
    image: '',
    featured: false,
  });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  // Redirect to login if not authenticated
  React.useEffect(() => {
    if (!isAuthenticated || !user) {
      setError('Please log in to publish a blog');
    }
  }, [isAuthenticated, user]);

  const categories = [
    'Electric Vehicles',
    'Autonomous Driving',
    'Sustainability',
    'Connectivity',
    'Safety',
  ];

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === 'checkbox' ? checked : value,
    });
  };

  const handlePaste = (e) => {
    e.preventDefault();
    
    const items = e.clipboardData?.items || [];
    for (let i = 0; i < items.length; i++) {
      const item = items[i];
      
      // Handle image files
      if (item.type.indexOf('image') !== -1) {
        const file = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (event) => {
          const img = `<img src="${event.target.result}" style="max-width: 100%; height: auto; margin: 10px 0; border-radius: 4px;" />`;
          document.execCommand('insertHTML', false, img);
        };
        reader.readAsDataURL(file);
      } else {
        // Handle plain text
        const text = e.clipboardData?.getData('text/plain') || '';
        if (text) {
          document.execCommand('insertText', false, text);
        }
      }
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!user || !isAuthenticated) {
      setError('Please log in to publish a blog');
      return;
    }

    if (!formData.title.trim() || !formData.content.trim()) {
      setError('Title and content are required');
      return;
    }

    // Get existing blogs from localStorage
    const existingBlogs = JSON.parse(localStorage.getItem('publishedBlogs')) || [];

    // Create new blog post
    const newBlog = {
      id: existingBlogs.length + 1,
      slug: formData.title
        .toLowerCase()
        .trim()
        .replace(/[^\w\s-]/g, '')
        .replace(/[\s_]+/g, '-')
        .replace(/^-+|-+$/g, ''),
      title: formData.title,
      excerpt: formData.excerpt,
      content: formData.content,
      category: formData.category,
      image: formData.image || '/images/default-blog.jpg',
      featured: formData.featured,
      author: user.name,
      authorEmail: user.email,
      date: new Date().toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'short',
        day: 'numeric',
      }),
      views: 0,
      readTime: Math.ceil(formData.content.split(/\s+/).length / 200), // Estimate read time
    };

    // Save to localStorage
    existingBlogs.push(newBlog);
    localStorage.setItem('publishedBlogs', JSON.stringify(existingBlogs));

    setSuccess('Blog published successfully!');
    setFormData({
      title: '',
      excerpt: '',
      content: '',
      category: 'Electric Vehicles',
      image: '',
      featured: false,
    });

    setTimeout(() => {
      navigate('/');
    }, 2000);
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Typography variant="h3" gutterBottom sx={{ fontWeight: 800, mb: 4 }}>
          Publish a New Blog
        </Typography>

        {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
        {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

        <Paper elevation={2} sx={{ p: 4 }}>
          <Box component="form" onSubmit={handleSubmit}>
            <TextField
              fullWidth
              label="Blog Title"
              name="title"
              value={formData.title}
              onChange={handleChange}
              margin="normal"
              required
              placeholder="e.g., The Future of Electric Vehicles"
            />

            <TextField
              fullWidth
              label="Category"
              name="category"
              select
              value={formData.category}
              onChange={handleChange}
              margin="normal"
            >
              {categories.map((cat) => (
                <MenuItem key={cat} value={cat}>
                  {cat}
                </MenuItem>
              ))}
            </TextField>

            <TextField
              fullWidth
              label="Brief Excerpt"
              name="excerpt"
              value={formData.excerpt}
              onChange={handleChange}
              margin="normal"
              multiline
              rows={2}
              placeholder="A short summary of your blog post"
            />

            <TextField
              fullWidth
              label="Featured Image URL"
              name="image"
              value={formData.image}
              onChange={handleChange}
              margin="normal"
              placeholder="https://example.com/image.jpg (optional)"
            />

            <Typography variant="h6" sx={{ mt: 3, mb: 1, fontWeight: 600 }}>
              Blog Content
            </Typography>
            <Box sx={{ 
              border: '1px solid #ccc', 
              borderRadius: 1,
              overflow: 'hidden'
            }}>
              <Toolbar variant="dense" sx={{ bgcolor: '#f5f5f5', display: 'flex', gap: 0, flexWrap: 'wrap' }}>
                {/* Text Formatting */}
                <IconButton 
                  size="small" 
                  onClick={() => document.execCommand('bold')}
                  title="Bold (Ctrl+B)"
                >
                  <FormatBoldIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => document.execCommand('italic')}
                  title="Italic (Ctrl+I)"
                >
                  <FormatItalicIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => document.execCommand('underline')}
                  title="Underline (Ctrl+U)"
                >
                  <FormatUnderlinedIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => document.execCommand('strikethrough')}
                  title="Strikethrough"
                >
                  <StrikethroughSIcon fontSize="small" />
                </IconButton>
                <Divider orientation="vertical" sx={{ mx: 0.5 }} />

                {/* Lists */}
                <IconButton 
                  size="small" 
                  onClick={() => document.execCommand('insertUnorderedList')}
                  title="Bullet List"
                >
                  <FormatListBulletedIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => document.execCommand('insertOrderedList')}
                  title="Numbered List"
                >
                  <FormatListNumberedIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => document.execCommand('indent')}
                  title="Indent (Tab)"
                >
                  <FormatIndentIncreaseIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => document.execCommand('outdent')}
                  title="Outdent (Shift+Tab)"
                >
                  <FormatIndentDecreaseIcon fontSize="small" />
                </IconButton>
                <Divider orientation="vertical" sx={{ mx: 0.5 }} />

                {/* Alignment */}
                <IconButton 
                  size="small" 
                  onClick={() => document.execCommand('justifyLeft')}
                  title="Align Left"
                >
                  <FormatAlignLeftIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => document.execCommand('justifyCenter')}
                  title="Align Center"
                >
                  <FormatAlignCenterIcon fontSize="small" />
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => document.execCommand('justifyRight')}
                  title="Align Right"
                >
                  <FormatAlignRightIcon fontSize="small" />
                </IconButton>
                <Divider orientation="vertical" sx={{ mx: 0.5 }} />

                {/* Headings & Links */}
                <IconButton 
                  size="small" 
                  onClick={() => document.execCommand('formatBlock', false, 'h2')}
                  title="Heading"
                >
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>H</Typography>
                </IconButton>
                <IconButton 
                  size="small" 
                  onClick={() => {
                    const url = prompt('Enter URL:');
                    if (url) document.execCommand('createLink', false, url);
                  }}
                  title="Insert Link"
                >
                  <Typography variant="caption" sx={{ fontWeight: 700 }}>Link</Typography>
                </IconButton>
              </Toolbar>
              <Box
                contentEditable
                onInput={(e) => setFormData({ ...formData, content: e.currentTarget.innerHTML })}
                onPaste={handlePaste}
                suppressContentEditableWarning
                sx={{
                  p: 2,
                  minHeight: 300,
                  bgcolor: '#fff',
                  outline: 'none',
                  color: '#000',
                  '& h1, & h2, & h3': { mt: 2, mb: 1, fontWeight: 600 },
                  '& p': { mb: 1, lineHeight: 1.6 },
                  '& ul, & ol': { mb: 1, pl: 3 },
                  '& li': { mb: 0.5 },
                  '& blockquote': { borderLeft: '4px solid #0066cc', pl: 2, ml: 0, my: 1 },
                  '& code': { bgcolor: '#f5f5f5', p: '2px 4px', borderRadius: '4px', fontFamily: 'monospace' },
                  '& img': { maxWidth: '100%', height: 'auto', borderRadius: '4px', my: 1 }
                }}
              >
                {formData.content ? '' : 'Start typing your blog content here...'}
              </Box>
            </Box>

            <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
              <Button
                type="submit"
                variant="contained"
                color="primary"
                size="large"
                sx={{ flex: 1 }}
              >
                Publish Blog
              </Button>
              <Button
                variant="outlined"
                color="primary"
                size="large"
                onClick={() => navigate('/')}
              >
                Cancel
              </Button>
            </Box>
          </Box>
        </Paper>
      </Box>
    </Container>
  );
};

export default PublishBlogPage;
