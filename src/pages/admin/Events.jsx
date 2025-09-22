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
  Event as EventIcon,
  LocationOn,
  People,
  Schedule
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';

// Mock data - in real app this would come from API
const mockEvents = [
  {
    id: 1,
    title: 'Healthcare Innovation Summit',
    location: 'New York, NY',
    date: '2024-02-20',
    status: 'Upcoming',
    attendees: 120,
    organizer: 'Dr. Sarah Johnson'
  },
  {
    id: 2,
    title: 'Global Cancer Research Conference',
    location: 'London, UK',
    date: '2024-03-15',
    status: 'Upcoming',
    attendees: 300,
    organizer: 'World Health Org'
  },
  {
    id: 3,
    title: 'AI in Healthcare Workshop',
    location: 'Remote',
    date: '2024-01-10',
    status: 'Completed',
    attendees: 85,
    organizer: 'Michael Chen'
  }
];

const statuses = ['Upcoming', 'Ongoing', 'Completed', 'Cancelled'];

const Events = () => {
  const navigate = useNavigate();
  const [events, setEvents] = useState(mockEvents);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingEvent, setEditingEvent] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    location: '',
    date: '',
    status: 'Upcoming',
    organizer: '',
    attendees: 0
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleOpenDialog = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setFormData(event);
    } else {
      setEditingEvent(null);
      setFormData({
        title: '',
        location: '',
        date: '',
        status: 'Upcoming',
        organizer: '',
        attendees: 0
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingEvent(null);
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.location || !formData.date) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    if (editingEvent) {
      setEvents(prev => prev.map(event =>
        event.id === editingEvent.id ? { ...event, ...formData } : event
      ));
      setSnackbar({ open: true, message: 'Event updated successfully', severity: 'success' });
    } else {
      const newEvent = { id: Date.now(), ...formData };
      setEvents(prev => [newEvent, ...prev]);
      setSnackbar({ open: true, message: 'Event created successfully', severity: 'success' });
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this event?')) {
      setEvents(prev => prev.filter(event => event.id !== id));
      setSnackbar({ open: true, message: 'Event deleted successfully', severity: 'success' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Upcoming':
        return 'info';
      case 'Ongoing':
        return 'success';
      case 'Completed':
        return 'default';
      case 'Cancelled':
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
            <EventIcon sx={{ color: 'primary.main', fontSize: 40 }} />
            <Box>
              <Typography variant="h3" component="h1" gutterBottom color="primary" fontWeight="bold">
                Event Management
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Organize, schedule, and track healthcare events
              </Typography>
            </Box>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ py: 1.5, px: 3 }}
          >
            Add New Event
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'primary.main' }}>
                  <EventIcon />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">{events.length}</Typography>
                <Typography variant="body2" color="text.secondary">Total Events</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'info.main' }}>
                  <Schedule />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">
                  {events.filter(e => e.status === 'Upcoming').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">Upcoming</Typography>
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
                  {events.reduce((sum, e) => sum + e.attendees, 0)}
                </Typography>
                <Typography variant="body2" color="text.secondary">Total Attendees</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Events Table */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Title</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Location</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Organizer</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Attendees</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {events.map(event => (
                  <TableRow key={event.id} hover>
                    <TableCell>{event.title}</TableCell>
                    <TableCell>{event.date}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                        <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                        <Typography variant="body2">{event.location}</Typography>
                      </Box>
                    </TableCell>
                    <TableCell>{event.organizer}</TableCell>
                    <TableCell>
                      <Chip label={event.status} color={getStatusColor(event.status)} size="small" />
                    </TableCell>
                    <TableCell>{event.attendees}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="primary" onClick={() => handleOpenDialog(event)}>
                          <EditIcon />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(event.id)}>
                          <DeleteIcon />
                        </IconButton>
                        <IconButton size="small" color="info" onClick={() => navigate(`/events/${event.id}`)}>
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
          <DialogTitle>{editingEvent ? 'Edit Event' : 'Add New Event'}</DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <TextField
                fullWidth
                label="Event Title"
                value={formData.title}
                onChange={(e) => handleInputChange('title', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Location"
                value={formData.location}
                onChange={(e) => handleInputChange('location', e.target.value)}
                required
              />
              <TextField
                fullWidth
                type="date"
                label="Date"
                InputLabelProps={{ shrink: true }}
                value={formData.date}
                onChange={(e) => handleInputChange('date', e.target.value)}
                required
              />
              <TextField
                fullWidth
                label="Organizer"
                value={formData.organizer}
                onChange={(e) => handleInputChange('organizer', e.target.value)}
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
                label="Attendees"
                value={formData.attendees}
                onChange={(e) => handleInputChange('attendees', e.target.value)}
              />
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingEvent ? 'Update' : 'Create'}
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

export default Events;
