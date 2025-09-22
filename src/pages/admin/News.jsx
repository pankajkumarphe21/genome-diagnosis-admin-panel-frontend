import React, { useState } from 'react';
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
  Snackbar,
  Grid,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Newspaper,
  Category,
  Publish
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock data - in real app this would come from API
const mockNews = [
  {
    id: 1,
    title: 'Breakthrough in Cancer Research Announced',
    category: 'Research',
    status: 'Published',
    publishDate: '2024-01-10',
    author: 'Dr. Emily Johnson'
  },
  {
    id: 2,
    title: 'New Telemedicine Regulations Released',
    category: 'Policy',
    status: 'Draft',
    publishDate: null,
    author: 'Health Ministry'
  },
  {
    id: 3,
    title: 'AI Transforming Healthcare Diagnostics',
    category: 'Technology',
    status: 'Published',
    publishDate: '2024-01-05',
    author: 'Michael Chen'
  }
];

const categories = ['Research', 'Policy', 'Technology', 'Wellness', 'Innovation'];
const statuses = ['Draft', 'Published', 'Archived'];

const News = () => {
  const navigate = useNavigate();
  const [news, setNews] = useState(mockNews);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingNews, setEditingNews] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    author: '',
    category: '',
    status: 'Draft'
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleOpenDialog = (article = null) => {
    if (article) {
      setEditingNews(article);
      setFormData({
        title: article.title,
        author: article.author,
        category: article.category,
        status: article.status
      });
    } else {
      setEditingNews(null);
      setFormData({ title: '', author: '', category: '', status: 'Draft' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingNews(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.author || !formData.category) {
      setSnackbar({ open: true, message: 'Please fill in all required fields', severity: 'error' });
      return;
    }

    if (editingNews) {
      setNews(prev => prev.map(article =>
        article.id === editingNews.id ? { ...article, ...formData } : article
      ));
      setSnackbar({ open: true, message: 'News updated successfully', severity: 'success' });
    } else {
      const newArticle = {
        id: Date.now(),
        ...formData,
        publishDate: formData.status === 'Published' ? new Date().toISOString().split('T')[0] : null
      };
      setNews(prev => [newArticle, ...prev]);
      setSnackbar({ open: true, message: 'News created successfully', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this news article?')) {
      setNews(prev => prev.filter(article => article.id !== id));
      setSnackbar({ open: true, message: 'News deleted successfully', severity: 'success' });
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
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
            <Newspaper sx={{ color: 'primary.main', fontSize: 40 }} />
            <Box>
              <Typography variant="h3" component="h1" gutterBottom color="primary" fontWeight="bold">
                News Management
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Publish and manage healthcare news and updates
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ py: 1.5, px: 3 }}
          >
            Add News
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'primary.main' }}>
                  <Newspaper />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">{news.length}</Typography>
                <Typography variant="body2" color="text.secondary">Total Articles</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'success.main' }}>
                  <Publish />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">
                  {news.filter(n => n.status === 'Published').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">Published</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'warning.main' }}>
                  <Category />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">
                  {news.filter(n => n.status === 'Draft').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">Drafts</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* News Table */}
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
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {news.map(article => (
                  <TableRow key={article.id} hover>
                    <TableCell>{article.title}</TableCell>
                    <TableCell>{article.author}</TableCell>
                    <TableCell>
                      <Chip label={article.category} size="small" variant="outlined" />
                    </TableCell>
                    <TableCell>
                      <Chip label={article.status} color={getStatusColor(article.status)} size="small" />
                    </TableCell>
                    <TableCell>{article.publishDate || '-'}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="primary" onClick={() => handleOpenDialog(article)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(article.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton size="small" color="info" onClick={() => navigate(`/news/${article.id}`)}>
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
          <DialogTitle>{editingNews ? 'Edit News' : 'Add News'}</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Title"
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
                  {categories.map(category => (
                    <MenuItem key={category} value={category}>{category}</MenuItem>
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
                  {statuses.map(status => (
                    <MenuItem key={status} value={status}>{status}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingNews ? 'Update' : 'Create'}
            </Button>
          </DialogActions>
        </Dialog>

        {/* Snackbar */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={6000}
          onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}
        >
          <Alert severity={snackbar.severity} onClose={() => setSnackbar(prev => ({ ...prev, open: false }))}>
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </Box>
  );
};

export default News;
