import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Container,
  Box,
  Typography,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Button,
  Chip,
  IconButton,
} from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { useAuth } from '../contexts/AuthContext';

const MyBlogsPage = () => {
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const [blogs, setBlogs] = React.useState([]);

  React.useEffect(() => {
    // Only fetch blogs if user is authenticated
    if (!isAuthenticated || !user) {
      setBlogs([]);
      return;
    }
    
    // Get published blogs
    const publishedBlogs = JSON.parse(localStorage.getItem('publishedBlogs')) || [];
    // Filter blogs by current user
    const userBlogs = publishedBlogs.filter((blog) => blog.authorEmail === user.email);
    setBlogs(userBlogs);
  }, [user, isAuthenticated]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      const publishedBlogs = JSON.parse(localStorage.getItem('publishedBlogs')) || [];
      const updatedBlogs = publishedBlogs.filter((blog) => blog.id !== id);
      localStorage.setItem('publishedBlogs', JSON.stringify(updatedBlogs));
      setBlogs(blogs.filter((blog) => blog.id !== id));
    }
  };

  return (
    <Container maxWidth="lg">
      <Box sx={{ my: 4 }}>
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Typography variant="h3" sx={{ fontWeight: 800 }}>
            My Published Blogs
          </Typography>
          <Button
            variant="contained"
            color="primary"
            size="large"
            onClick={() => navigate('/publish')}
          >
            + Publish New Blog
          </Button>
        </Box>

        {blogs.length === 0 ? (
          <Paper sx={{ p: 4, textAlign: 'center' }}>
            <Typography variant="h6" color="text.secondary" gutterBottom>
              You haven't published any blogs yet.
            </Typography>
            <Button
              variant="contained"
              color="primary"
              onClick={() => navigate('/publish')}
              sx={{ mt: 2 }}
            >
              Publish Your First Blog
            </Button>
          </Paper>
        ) : (
          <TableContainer component={Paper}>
            <Table>
              <TableHead sx={{ bgcolor: '#f5f5f5' }}>
                <TableRow>
                  <TableCell sx={{ fontWeight: 700 }}>Title</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Category</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Date</TableCell>
                  <TableCell sx={{ fontWeight: 700 }}>Views</TableCell>
                  <TableCell sx={{ fontWeight: 700 }} align="right">
                    Actions
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.id} hover>
                    <TableCell>
                      <Typography variant="body2" sx={{ fontWeight: 600 }}>
                        {blog.title}
                      </Typography>
                    </TableCell>
                    <TableCell>
                      <Chip label={blog.category} size="small" color="primary" variant="outlined" />
                    </TableCell>
                    <TableCell>{blog.date}</TableCell>
                    <TableCell>{blog.views || 0}</TableCell>
                    <TableCell align="right">
                      <IconButton
                        size="small"
                        onClick={() => navigate(`/article/${blog.slug}`)}
                        color="primary"
                      >
                        <EditIcon />
                      </IconButton>
                      <IconButton
                        size="small"
                        onClick={() => handleDelete(blog.id)}
                        color="error"
                      >
                        <DeleteIcon />
                      </IconButton>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        )}
      </Box>
    </Container>
  );
};

export default MyBlogsPage;
