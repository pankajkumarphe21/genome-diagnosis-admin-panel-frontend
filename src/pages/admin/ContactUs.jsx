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
  Alert,
  Snackbar,
  Grid,
  Card,
  CardContent,
  Avatar
} from '@mui/material';
import {
  Add as AddIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  ContactSupport,
  Email,
  Person,
  Message
} from '@mui/icons-material';

// Mock data - in real app this would come from API
const mockContacts = [
  {
    id: 1,
    name: 'John Doe',
    email: 'john.doe@email.com',
    subject: 'Inquiry about services',
    message: 'I would like to know more about your healthcare services.',
    status: 'New',
    date: '2024-01-15'
  },
  {
    id: 2,
    name: 'Jane Smith',
    email: 'jane.smith@email.com',
    subject: 'Support request',
    message: 'Having trouble accessing my account.',
    status: 'In Progress',
    date: '2024-01-12'
  },
  {
    id: 3,
    name: 'Michael Johnson',
    email: 'michael.j@email.com',
    subject: 'Partnership opportunity',
    message: 'Interested in collaborating on healthcare research.',
    status: 'Resolved',
    date: '2024-01-10'
  }
];

const statuses = ['New', 'In Progress', 'Resolved', 'Closed'];

const ContactUs = () => {
  const [contacts, setContacts] = useState(mockContacts);
  const [openDialog, setOpenDialog] = useState(false);
  const [selectedContact, setSelectedContact] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'success' });

  const handleOpenDialog = (contact) => {
    setSelectedContact(contact);
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setSelectedContact(null);
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this inquiry?')) {
      setContacts(prev => prev.filter(c => c.id !== id));
      setSnackbar({ open: true, message: 'Inquiry deleted successfully', severity: 'success' });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'info';
      case 'In Progress':
        return 'warning';
      case 'Resolved':
        return 'success';
      case 'Closed':
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
            <ContactSupport sx={{ color: 'primary.main', fontSize: 40 }} />
            <Box>
              <Typography variant="h3" component="h1" gutterBottom color="primary" fontWeight="bold">
                Contact Management
              </Typography>
              <Typography variant="h6" color="text.secondary">
                Manage inquiries and contact form submissions
              </Typography>
            </Box>
          </Box>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'primary.main' }}>
                  <ContactSupport />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">{contacts.length}</Typography>
                <Typography variant="body2" color="text.secondary">Total Inquiries</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'info.main' }}>
                  <Email />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">
                  {contacts.filter(c => c.status === 'New').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">New</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'warning.main' }}>
                  <Message />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">
                  {contacts.filter(c => c.status === 'In Progress').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">In Progress</Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'success.main' }}>
                  <Person />
                </Avatar>
                <Typography variant="h4" fontWeight="bold">
                  {contacts.filter(c => c.status === 'Resolved').length}
                </Typography>
                <Typography variant="body2" color="text.secondary">Resolved</Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Contacts Table */}
        <Paper sx={{ width: '100%', overflow: 'hidden' }}>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow sx={{ backgroundColor: 'primary.main' }}>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Name</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Email</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Subject</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Date</TableCell>
                  <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {contacts.map(contact => (
                  <TableRow key={contact.id} hover>
                    <TableCell>{contact.name}</TableCell>
                    <TableCell>{contact.email}</TableCell>
                    <TableCell>{contact.subject}</TableCell>
                    <TableCell>
                      <Chip label={contact.status} color={getStatusColor(contact.status)} size="small" />
                    </TableCell>
                    <TableCell>{contact.date}</TableCell>
                    <TableCell>
                      <Box sx={{ display: 'flex', gap: 1 }}>
                        <IconButton size="small" color="info" onClick={() => handleOpenDialog(contact)}>
                          <ViewIcon />
                        </IconButton>
                        <IconButton size="small" color="error" onClick={() => handleDelete(contact.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Paper>

        {/* View Contact Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="sm" fullWidth>
          <DialogTitle>Inquiry Details</DialogTitle>
          <DialogContent>
            {selectedContact && (
              <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 2 }}>
                <Typography variant="body1"><strong>Name:</strong> {selectedContact.name}</Typography>
                <Typography variant="body1"><strong>Email:</strong> {selectedContact.email}</Typography>
                <Typography variant="body1"><strong>Subject:</strong> {selectedContact.subject}</Typography>
                <Typography variant="body1"><strong>Message:</strong> {selectedContact.message}</Typography>
                <Typography variant="body1"><strong>Status:</strong> {selectedContact.status}</Typography>
                <Typography variant="body1"><strong>Date:</strong> {selectedContact.date}</Typography>
              </Box>
            )}
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Close</Button>
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

export default ContactUs;