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
  Group,
  Work,
  Business
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock data - in real app this would come from API
const mockTeam = [
  {
    id: 1,
    name: 'Dr. Sarah Johnson',
    role: 'Chief Medical Officer',
    department: 'Research & Development',
    status: 'Active',
    email: 'sarah.johnson@email.com'
  },
  {
    id: 2,
    name: 'Michael Chen',
    role: 'Data Scientist',
    department: 'Data Science',
    status: 'Active',
    email: 'michael.chen@email.com'
  },
  {
    id: 3,
    name: 'Emily Rodriguez',
    role: 'Healthcare Administrator',
    department: 'Operations',
    status: 'Inactive',
    email: 'emily.rodriguez@email.com'
  }
];

const departments = ['Research & Development', 'Data Science', 'Operations', 'Marketing', 'Finance', 'Human Resources'];
const statuses = ['Active', 'Inactive', 'On Leave'];

const Team = () => {
  const navigate = useNavigate();
  const [team, setTeam] = useState(mockTeam);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingMember, setEditingMember] = useState(null);
  const [formData, setFormData] = useState({ name: '', role: '', department: '', status: 'Active', email: '' });
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleOpenDialog = (member = null) => {
    if (member) {
      setEditingMember(member);
      setFormData(member);
    } else {
      setEditingMember(null);
      setFormData({ name: '', role: '', department: '', status: 'Active', email: '' });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingMember(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.role || !formData.department || !formData.email) {
      setSnackbar({ open: true, message: 'Please fill in all required fields', severity: 'error' });
      return;
    }

    if (editingMember) {
      setTeam(prev => prev.map(m => m.id === editingMember.id ? { ...m, ...formData } : m));
      setSnackbar({ open: true, message: 'Team member updated successfully', severity: 'success' });
    } else {
      const newMember = { id: Date.now(), ...formData };
      setTeam(prev => [newMember, ...prev]);
      setSnackbar({ open: true, message: 'Team member added successfully', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to remove this team member?')) {
      setTeam(prev => prev.filter(m => m.id !== id));
      setSnackbar({ open: true, message: 'Team member removed successfully', severity: 'success' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Inactive':
        return 'error';
      case 'On Leave':
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
            <Group sx={{ color: 'primary.main', fontSize: 40 }} />
            <Box>
              <Typography variant="h3" component="h1" gutterBottom color="primary" fontWeight="bold">
                Team Management
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Manage team members and organizational structure
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ py: 1.5, px: 3 }}
          >
            Add Member
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'primary.main' }}>
                  <Group />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">{team.length}</Typography>
                <Typography variant="body2" color="text.secondary">Total Members</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'success.main' }}>
                  <Work />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">
                  {team.filter(m => m.status === 'Active').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">Active</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'error.main' }}>
                  <Business />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">
                  {team.filter(m => m.status === 'Inactive').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">Inactive</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Team Table */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Role</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {team.map(member => (
                  <TableRow key={member.id} hover>
                    <TableCell>{member.name}</TableCell>
                    <TableCell>{member.role}</TableCell>
                    <TableCell>{member.department}</TableCell>
                    <TableCell>{member.email}</TableCell>
                    <TableCell>
                      <Chip label={member.status} color={getStatusColor(member.status)} size="small" />
                    </TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="primary" onClick={() => handleOpenDialog(member)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(member.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton size="small" color="info" onClick={() => navigate(`/team/${member.id}`)}>
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
          <DialogTitle>{editingMember ? 'Edit Team Member' : 'Add Team Member'}</DialogTitle>
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
                required
              />
              <FormControl fullWidth>
                <InputLabel>Department</InputLabel>
                <Select
                  value={formData.department}
                  label="Department"
                  onChange={(e) => handleInputChange('department', e.target.value)}
                >
                  {departments.map(dept => (
                    <MenuItem key={dept} value={dept}>{dept}</MenuItem>
                  ))}
                </Select>
              </FormControl>
              <TextField
                fullWidth
                label="Email"
                value={formData.email}
                onChange={(e) => handleInputChange('email', e.target.value)}
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
              {editingMember ? 'Update' : 'Create'}
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

export default Team;