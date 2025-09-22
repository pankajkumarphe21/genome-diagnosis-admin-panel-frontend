import { useState } from 'react';
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  IconButton,
  Chip,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  TextField,
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Alert,
  Snackbar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Article
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock data - in real app this would come from API
const mockBlogs = [
  {
    id: 1,
    title: 'Breakthrough in Cancer Research',
    author: 'Dr. Sarah Johnson',
    category: 'Research',
    status: 'Published',
    publishDate: '2024-01-15',
    views: 1247
  },
  {
    id: 2,
    title: 'New Treatment Methods for Diabetes',
    author: 'Dr. Michael Chen',
    category: 'Treatment',
    status: 'Draft',
    publishDate: '2024-01-10',
    views: 0
  },
  {
    id: 3,
    title: 'Healthcare Technology Trends 2024',
    author: 'Dr. Emily Rodriguez',
    category: 'Technology',
    status: 'Published',
    publishDate: '2024-01-08',
    views: 892
  }
];

const categories = ['Research', 'Treatment', 'Technology', 'Wellness', 'Innovation'];
const statuses = ['Draft', 'Published', 'Archived'];

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState(mockBlogs);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingBlog, setEditingBlog] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    status: 'Draft',
    content: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleOpenDialog = (blog = null) => {
    if (blog) {
      setEditingBlog(blog);
      setFormData({
        title: blog.title,
        author: blog.author,
        category: blog.category,
        status: blog.status,
        content: 'Sample content for ' + blog.title
      });
    } else {
      setEditingBlog(null);
      setFormData({
        title: '',
        author: '',
        category: '',
        status: 'Draft',
        content: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingBlog(null);
    setFormData({
      title: '',
      author: '',
      category: '',
      status: 'Draft',
      content: ''
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.author || !formData.category) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    if (editingBlog) {
      // Update existing blog
      setBlogs(prev => prev.map(blog => 
        blog.id === editingBlog.id 
          ? { ...blog, ...formData, publishDate: formData.status === 'Published' ? new Date().toISOString().split('T')[0] : blog.publishDate }
          : blog
      ));
      setSnackbar({
        open: true,
        message: 'Blog updated successfully',
        severity: 'success'
      });
    } else {
      // Add new blog
      const newBlog = {
        id: Date.now(),
        ...formData,
        publishDate: formData.status === 'Published' ? new Date().toISOString().split('T')[0] : null,
        views: 0
      };
      setBlogs(prev => [newBlog, ...prev]);
      setSnackbar({
        open: true,
        message: 'Blog created successfully',
        severity: 'success'
      });
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      setBlogs(prev => prev.filter(blog => blog.id !== id));
      setSnackbar({
        open: true,
        message: 'Blog deleted successfully',
        severity: 'success'
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Published':
        return 'success';
      case 'Draft':
        return 'warning';
      case 'Archived':
        return 'default';
      default:
        return 'default';
    }
  };

  return (
    <Box sx={{ py: 4, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom color="primary" fontWeight="bold">
              Blog Management
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Create, edit, and manage blog content for your platform
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ py: 1.5, px: 3 }}
          >
            Add New Blog
          </Button>
        </Box>

        {/* Stats Cards */}
        <Box sx={{ mb: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Box sx={{ display: 'flex', gap: 3, flexWrap: 'wrap' }}>
              <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                <Typography variant="h4" color="primary" fontWeight="bold">
                  {blogs.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Blogs
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                <Typography variant="h4" color="success.main" fontWeight="bold">
                  {blogs.filter(b => b.status === 'Published').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Published
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                <Typography variant="h4" color="warning.main" fontWeight="bold">
                  {blogs.filter(b => b.status === 'Draft').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Drafts
                </Typography>
              </Box>
              <Box sx={{ textAlign: 'center', minWidth: 120 }}>
                <Typography variant="h4" color="info.main" fontWeight="bold">
                  {blogs.reduce((sum, b) => sum + b.views, 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Views
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* Blogs Table */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Author</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Category</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Publish Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Views</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {blogs.map((blog) => (
                  <TableRow key={blog.id} hover>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <Article sx={{ color: 'primary.main' }} />
                        <Typography variant="body2" fontWeight={500}>
                          {blog.title}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{blog.author}</TableCell>
                    <TableCell>
                      <Chip label={blog.category} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip 
                        label={blog.status} 
                        color={getStatusColor(blog.status)}
                        size="small"
                      />
                    </TableCell>
                    <TableCell>{blog.publishDate || '-'}</TableCell>
                    <TableCell>{blog.views.toLocaleString()}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton
                          size="small"
                          color="primary"
                          onClick={() => handleOpenDialog(blog)}
                        >
                          <EditIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="error"
                          onClick={() => handleDelete(blog.id)}
                        >
                          <DeleteIcon />
                        </IconButton>
                        <IconButton
                          size="small"
                          color="info"
                          onClick={() => navigate(`/blogs/${blog.id}`)}
                        >
                          <ViewIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* Add/Edit Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingBlog ? 'Edit Blog' : 'Add New Blog'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Blog Title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Author"
                value={formData.author}
                onChange={(e) => handleInputChange('author', e.target.value)}
                required
              />
              <FormControl fullWidth>
                <InputLabel>Category</InputLabel>
                <Select
                  value={formData.category}
                  label="Category"
                  onChange={(e) => handleInputChange('category', e.target.value)}
                >
                  {categories.map((category) => (
                    <MenuItem key={category} value={category}>
                      {category}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <FormControl fullWidth>
                <InputLabel>Status</InputLabel>
                <Select
                  value={formData.status}
                  label="Status"
                  onChange={(e) => handleInputChange('status', e.target.value)}
                >
                  {statuses.map((status) => (
                    <MenuItem key={status} value={status}>
                      {status}
                    </MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Content"
                multiline
                rows={6}
                value={formData.content}
                onChange={(e) => handleInputChange('content', e.target.value)}
                placeholder="Write your blog content here..."
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingBlog ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar for notifications */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          <Alert 
            onClose={() => setSnackbar(prev => ({ ...prev, open: false }))} 
            severity={snackbar.severity}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default Blogs;



