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
  RateReview,
  Person,
  ThumbUp
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock data - in real app this would come from API
const mockTestimonials = [
  {
    id: 1,
    name: 'John Doe',
    role: 'Patient',
    message: 'The healthcare team provided excellent service and care.',
    status: 'Approved',
    date: '2024-01-10'
  },
  {
    id: 2,
    name: 'Jane Smith',
    role: 'Partner',
    message: 'Our collaboration has been extremely beneficial and smooth.',
    status: 'Pending',
    date: '2024-01-12'
  },
  {
    id: 3,
    name: 'Michael Chen',
    role: 'Customer',
    message: 'Impressed with the innovation and dedication to patient care.',
    status: 'Rejected',
    date: '2024-01-08'
  }
];

const statuses = ['Pending', 'Approved', 'Rejected'];

const Testimonials = () => {
  const navigate = useNavigate();
  const [testimonials, setTestimonials] = useState(mockTestimonials);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingTestimonial, setEditingTestimonial] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: '', message: '', status: 'Pending' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleOpenDialog = (testimonial = null) => {
    if (testimonial) {
      setEditingTestimonial(testimonial);
      setFormData(testimonial);
    } else {
      setEditingTestimonial(null);
      setFormData({ name: '', role: '', message: '', status: 'Pending' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingTestimonial(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.message) {
      setSnackbar({ open: true, message: 'Please fill in all required fields', severity: 'error' });
      return;
    }

    if (editingTestimonial) {
      setTestimonials(prev => prev.map(t => t.id === editingTestimonial.id ? { ...t, ...formData } : t));
      setSnackbar({ open: true, message: 'Testimonial updated successfully', severity: 'success' });
    } else {
      const newTestimonial = { id: Date.now(), ...formData, date: new Date().toISOString().split('T')[0] };
      setTestimonials(prev => [newTestimonial, ...prev]);
      setSnackbar({ open: true, message: 'Testimonial added successfully', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this testimonial?')) {
      setTestimonials(prev => prev.filter(t => t.id !== id));
      setSnackbar({ open: true, message: 'Testimonial deleted successfully', severity: 'success' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Approved':
        return 'success';
      case 'Pending':
        return 'warning';
      case 'Rejected':
        return 'error';
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
            <RateReview sx={{ color: 'primary.main', fontSize: 40 }} />
            <Box>
              <Typography variant="h3" component="h1" gutterBottom color="primary" fontWeight="bold">
                Testimonials Management
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Manage customer and partner testimonials
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ py: 1.5, px: 3 }}
          >
            Add Testimonial
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'primary.main' }}>
                  <RateReview />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">{testimonials.length}</Typography>
                <Typography variant="body2" color="text.secondary">Total Testimonials</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'success.main' }}>
                  <ThumbUp />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">
                  {testimonials.filter(t => t.status === 'Approved').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">Approved</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'warning.main' }}>
                  <Person />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">
                  {testimonials.filter(t => t.status === 'Pending').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">Pending</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Testimonials Table */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Message</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {testimonials.map(t => (
                  <TableRow key={t.id} hover>
                    <TableCell>{t.name}</TableCell>
                    <TableCell>{t.role}</TableCell>
                    <TableCell>{t.message}</TableCell>
                    <TableCell>
                      <Chip label={t.status} color={getStatusColor(t.status)} size="small" />
                    </TableCell>
                    <TableCell>{t.date}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="primary" onClick={() => handleOpenDialog(t)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(t.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton size="small" color="info" onClick={() => navigate(`/testimonials/${t.id}`)}>
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
          <DialogTitle>{editingTestimonial ? 'Edit Testimonial' : 'Add Testimonial'}</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Role"
                value={formData.role}
                onChange={(e) => handleInputChange('role', e.target.value)}
              />
              <TextField
                fullWidth
                label="Message"
                multiline
                rows={3}
                value={formData.message}
                onChange={(e) => handleInputChange('message', e.target.value)}
                required
              />
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
              {editingTestimonial ? 'Update' : 'Create'}
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

export default Testimonials;