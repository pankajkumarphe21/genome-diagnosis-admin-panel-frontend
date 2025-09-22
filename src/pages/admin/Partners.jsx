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
  Business,
  LocationOn,
  People
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock data - in real app this would come from API
const mockPartners = [
  {
    id: 1,
    name: 'Global Health Org',
    type: 'NGO',
    location: 'Geneva, Switzerland',
    status: 'Active',
    contact: 'Dr. Sarah Johnson',
    collaborations: 5
  },
  {
    id: 2,
    name: 'MediTech Inc.',
    type: 'Corporate',
    location: 'San Francisco, USA',
    status: 'Active',
    contact: 'Michael Chen',
    collaborations: 3
  },
  {
    id: 3,
    name: 'Wellness Foundation',
    type: 'Non-profit',
    location: 'London, UK',
    status: 'Inactive',
    contact: 'Emily Rodriguez',
    collaborations: 2
  }
];

const partnerTypes = ['Corporate', 'NGO', 'Non-profit', 'Government'];
const statuses = ['Active', 'Inactive', 'Pending'];

const Partners = () => {
  const navigate = useNavigate();
  const [partners, setPartners] = useState(mockPartners);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingPartner, setEditingPartner] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    type: '',
    location: '',
    status: 'Active',
    contact: '',
    collaborations: 0
  });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleOpenDialog = (partner = null) => {
    if (partner) {
      setEditingPartner(partner);
      setFormData(partner);
    } else {
      setEditingPartner(null);
      setFormData({ name: '', type: '', location: '', status: 'Active', contact: '', collaborations: 0 });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingPartner(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.type || !formData.location) {
      setSnackbar({ open: true, message: 'Please fill in all required fields', severity: 'error' });
      return;
    }

    if (editingPartner) {
      setPartners(prev => prev.map(p => p.id === editingPartner.id ? { ...p, ...formData } : p));
      setSnackbar({ open: true, message: 'Partner updated successfully', severity: 'success' });
    } else {
      const newPartner = { id: Date.now(), ...formData };
      setPartners(prev => [newPartner, ...prev]);
      setSnackbar({ open: true, message: 'Partner added successfully', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this partner?')) {
      setPartners(prev => prev.filter(p => p.id !== id));
      setSnackbar({ open: true, message: 'Partner deleted successfully', severity: 'success' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'error';
      case 'Pending':
        return 'warning';
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
            <Business sx={{ color: 'primary.main', fontSize: 40 }} />
            <Box>
              <Typography variant="h3" component="h1" gutterBottom color="primary" fontWeight="bold">
                Partner Management
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Manage healthcare partnerships and collaborations
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ py: 1.5, px: 3 }}
          >
            Add Partner
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'primary.main' }}>
                  <Business />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">{partners.length}</Typography>
                <Typography variant="body2" color="text.secondary">Total Partners</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'success.main' }}>
                  <People />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">
                  {partners.filter(p => p.status === 'Active').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">Active Partners</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'error.main' }}>
                  <LocationOn />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">
                  {partners.filter(p => p.status === 'Inactive').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">Inactive</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Partners Table */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Type</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Location</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Contact</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Collaborations</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {partners.map(partner => (
                  <TableRow key={partner.id} hover>
                    <TableCell>{partner.name}</TableCell>
                    <TableCell>{partner.type}</TableCell>
                    <TableCell>{partner.location}</TableCell>
                    <TableCell>{partner.contact}</TableCell>
                    <TableCell>
                      <Chip label={partner.status} color={getStatusColor(partner.status)} size="small" />
                    </TableCell>
                    <TableCell>{partner.collaborations}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="primary" onClick={() => handleOpenDialog(partner)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(partner.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton size="small" color="info" onClick={() => navigate(`/partners/${partner.id}`)}>
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
          <DialogTitle>{editingPartner ? 'Edit Partner' : 'Add Partner'}</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Partner Name"
                value={formData.name}
                onChange={(e) => handleInputChange('name', e.target.value)}
                required
              />
              <FormControl fullWidth>
                <InputLabel>Type</InputLabel>
                <Select
                  value={formData.type}
                  label="Type"
                  onChange={(e) => handleInputChange('type', e.target.value)}
                >
                  {partnerTypes.map(type => (
                    <MenuItem key={type} value={type}>{type}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Contact Person"
                value={formData.contact}
                onChange={(e) => handleInputChange('contact', e.target.value)}
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
              <TextField
                fullWidth
                type="number"
                label="Collaborations"
                value={formData.collaborations}
                onChange={(e) => handleInputChange('collaborations', e.target.value)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingPartner ? 'Update' : 'Create'}
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

export default Partners;