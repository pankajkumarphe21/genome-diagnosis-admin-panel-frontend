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
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider
} from '@mui/material';
import {
  Add as AddIcon,
  Edit as EditIcon,
  Delete as DeleteIcon,
  Visibility as ViewIcon,
  Work,
  Business,
  LocationOn,
  Schedule,
  People,
  TrendingUp
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';

// Mock data - in real app this would come from API
const mockCareers = [
  {
    id: 1,
    title: 'Senior Research Scientist',
    department: 'Research & Development',
    location: 'San Francisco, CA',
    type: 'Full-time',
    status: 'Active',
    applications: 12,
    postedDate: '2024-01-10',
    deadline: '2024-02-15',
    salary: '$120,000 - $150,000',
    experience: '5+ years'
  },
  {
    id: 2,
    title: 'Clinical Data Analyst',
    department: 'Data Science',
    location: 'Remote',
    type: 'Full-time',
    status: 'Active',
    applications: 8,
    postedDate: '2024-01-08',
    deadline: '2024-02-10',
    salary: '$80,000 - $100,000',
    experience: '3+ years'
  },
  {
    id: 3,
    title: 'Healthcare Administrator',
    department: 'Operations',
    location: 'New York, NY',
    type: 'Full-time',
    status: 'Closed',
    applications: 25,
    postedDate: '2023-12-15',
    deadline: '2024-01-15',
    salary: '$90,000 - $110,000',
    experience: '4+ years'
  }
];

const mockApplications = [
  {
    id: 1,
    jobTitle: 'Senior Research Scientist',
    applicant: 'Dr. Sarah Johnson',
    email: 'sarah.johnson@email.com',
    experience: '7 years',
    status: 'Under Review',
    appliedDate: '2024-01-12',
    resume: 'resume_sarah_johnson.pdf'
  },
  {
    id: 2,
    jobTitle: 'Clinical Data Analyst',
    applicant: 'Michael Chen',
    email: 'michael.chen@email.com',
    experience: '4 years',
    status: 'Shortlisted',
    appliedDate: '2024-01-10',
    resume: 'resume_michael_chen.pdf'
  }
];

const departments = ['Research & Development', 'Data Science', 'Operations', 'Marketing', 'Finance', 'Human Resources'];
const jobTypes = ['Full-time', 'Part-time', 'Contract', 'Internship'];
const statuses = ['Active', 'Closed', 'Draft', 'Archived'];
const applicationStatuses = ['New', 'Under Review', 'Shortlisted', 'Interviewed', 'Hired', 'Rejected'];

const Careers = () => {
  const navigate = useNavigate();
  const [careers, setCareers] = useState(mockCareers);
  const [applications, setApplications] = useState(mockApplications);
  const [openDialog, setOpenDialog] = useState(false);
  const [editingCareer, setEditingCareer] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    department: '',
    location: '',
    type: 'Full-time',
    status: 'Active',
    salary: '',
    experience: '',
    description: '',
    requirements: '',
    deadline: ''
  });
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success'
  });

  const handleOpenDialog = (career = null) => {
    if (career) {
      setEditingCareer(career);
      setFormData({
        title: career.title,
        department: career.department,
        location: career.location,
        type: career.type,
        status: career.status,
        salary: career.salary,
        experience: career.experience,
        description: 'Detailed job description for ' + career.title,
        requirements: 'Job requirements for ' + career.title,
        deadline: career.deadline
      });
    } else {
      setEditingCareer(null);
      setFormData({
        title: '',
        department: '',
        location: '',
        type: 'Full-time',
        status: 'Active',
        salary: '',
        experience: '',
        description: '',
        requirements: '',
        deadline: ''
      });
    }
    setOpenDialog(true);
  };

  const handleCloseDialog = () => {
    setOpenDialog(false);
    setEditingCareer(null);
    setFormData({
      title: '',
      department: '',
      location: '',
      type: 'Full-time',
      status: 'Active',
      salary: '',
      experience: '',
      description: '',
      requirements: '',
      deadline: ''
    });
  };

  const handleInputChange = (field, value) => {
    setFormData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleSubmit = () => {
    if (!formData.title || !formData.department || !formData.location) {
      setSnackbar({
        open: true,
        message: 'Please fill in all required fields',
        severity: 'error'
      });
      return;
    }

    if (editingCareer) {
      // Update existing career
      setCareers(prev => prev.map(career => 
        career.id === editingCareer.id 
          ? { ...career, ...formData, postedDate: career.postedDate }
          : career
      ));
      setSnackbar({
        open: true,
        message: 'Job posting updated successfully',
        severity: 'success'
      });
    } else {
      // Add new career
      const newCareer = {
        id: Date.now(),
        ...formData,
        postedDate: new Date().toISOString().split('T')[0],
        applications: 0
      };
      setCareers(prev => [newCareer, ...prev]);
      setSnackbar({
        open: true,
        message: 'Job posting created successfully',
        severity: 'success'
      });
    }
    handleCloseDialog();
  };

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this job posting?')) {
      setCareers(prev => prev.filter(career => career.id !== id));
      setSnackbar({
        open: true,
        message: 'Job posting deleted successfully',
        severity: 'success'
      });
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Active':
        return 'success';
      case 'Closed':
        return 'error';
      case 'Draft':
        return 'warning';
      case 'Archived':
        return 'default';
      default:
        return 'default';
    }
  };

  const getApplicationStatusColor = (status) => {
    switch (status) {
      case 'New':
        return 'info';
      case 'Under Review':
        return 'warning';
      case 'Shortlisted':
        return 'primary';
      case 'Interviewed':
        return 'secondary';
      case 'Hired':
        return 'success';
      case 'Rejected':
        return 'error';
      default:
        return 'default';
    }
  };

  const totalApplications = careers.reduce((sum, career) => sum + career.applications, 0);
  const activeJobs = careers.filter(career => career.status === 'Active').length;
  const totalViews = careers.reduce((sum, career) => sum + (career.applications * 10), 0);
  // const { isDarkMode } = useCustomTheme();
  return (
    <Box sx={{ py: 4, backgroundColor: 'background.primary', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom color="primary" fontWeight="bold">
              Career Management
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Manage job postings, track applications, and find the best talent
            </Typography>
          </Box>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => handleOpenDialog()}
            sx={{ py: 1.5, px: 3 }}
          >
            Post New Job
          </Button>
        </Box>

        {/* Stats Cards */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'primary.main' }}>
                  <Work />
                </Avatar>
                <Typography variant="h4" component="div" gutterBottom fontWeight="bold">
                  {careers.length}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Jobs
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'success.main' }}>
                  <TrendingUp />
                </Avatar>
                <Typography variant="h4" component="div" gutterBottom fontWeight="bold">
                  {activeJobs}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Active Jobs
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'info.main' }}>
                  <People />
                </Avatar>
                <Typography variant="h4" component="div" gutterBottom fontWeight="bold">
                  {totalApplications}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Total Applications
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={6} md={3}>
            <Card>
              <CardContent sx={{ textAlign: 'center', p: 3 }}>
                <Avatar sx={{ width: 60, height: 60, mx: 'auto', mb: 2, backgroundColor: 'warning.main' }}>
                  <ViewIcon />
                </Avatar>
                <Typography variant="h4" component="div" gutterBottom fontWeight="bold">
                  {totalViews.toLocaleString()}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  Job Views
                </Typography>
              </CardContent>
            </Card>
          </Grid>
        </Grid>

        {/* Main Content Grid */}
        <Grid container spacing={4}>
          {/* Job Postings */}
          <Grid item xs={12} lg={8}>
            <Paper sx={{ p: 3 }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Typography variant="h5" component="h2">
                  Job Postings
                </Typography>
                <Chip label={`${activeJobs} Active`} color="success" size="small" />
              </Box>
              
              <TableContainer>
                <Table>
                  <TableHead>
                    <TableRow sx={{ backgroundColor: 'primary.main' }}>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Position</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Department</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Location</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Status</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Applications</TableCell>
                      <TableCell sx={{ color: 'white', fontWeight: 'bold' }}>Actions</TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {careers.map((career) => (
                      <TableRow key={career.id} hover>
                        <TableCell>
                          <Box>
                            <Typography variant="body2" fontWeight={500}>
                              {career.title}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {career.type} • {career.experience}
                            </Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip label={career.department} size="small" variant="outlined" />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <LocationOn sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2">{career.location}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Chip 
                            label={career.status} 
                            color={getStatusColor(career.status)}
                            size="small"
                          />
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <People sx={{ fontSize: 16, color: 'text.secondary' }} />
                            <Typography variant="body2">{career.applications}</Typography>
                          </Box>
                        </TableCell>
                        <TableCell>
                          <Box sx={{ display: 'flex', gap: 1 }}>
                            <IconButton
                              size="small"
                              color="primary"
                              onClick={() => handleOpenDialog(career)}
                            >
                              <EditIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="error"
                              onClick={() => handleDelete(career.id)}
                            >
                              <DeleteIcon />
                            </IconButton>
                            <IconButton
                              size="small"
                              color="info"
                              onClick={() => navigate(`/careers/${career.id}`)}
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
          </Grid>

          {/* Recent Applications */}
          <Grid item xs={12} lg={4}>
            <Paper sx={{ p: 3, height: 'fit-content' }}>
              <Typography variant="h6" component="h3" gutterBottom>
                Recent Applications
              </Typography>
              <List>
                {applications.slice(0, 5).map((application, index) => (
                  <React.Fragment key={application.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Avatar sx={{ width: 32, height: 32, backgroundColor: 'grey.200' }}>
                          {application.applicant.charAt(0)}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" fontWeight={500}>
                              {application.applicant}
                            </Typography>
                            <Chip 
                              label={application.status} 
                              size="small" 
                              color={getApplicationStatusColor(application.status)}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="caption" display="block">
                              {application.jobTitle}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              Applied {application.appliedDate}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < applications.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
              <Button
                fullWidth
                variant="outlined"
                onClick={() => navigate('/admin/applications')}
                sx={{ mt: 2 }}
              >
                View All Applications
              </Button>
            </Paper>
          </Grid>
        </Grid>

        {/* Add/Edit Dialog */}
        <Dialog open={openDialog} onClose={handleCloseDialog} maxWidth="md" fullWidth>
          <DialogTitle>
            {editingCareer ? 'Edit Job Posting' : 'Create New Job Posting'}
          </DialogTitle>
          <DialogContent>
            <Box sx={{ pt: 2, display: 'flex', flexDirection: 'column', gap: 3 }}>
              <Grid container spacing={2}>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Job Title"
                    value={formData.title}
                    onChange={(e) => handleInputChange('title', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Department</InputLabel>
                    <Select
                      value={formData.department}
                      label="Department"
                      onChange={(e) => handleInputChange('department', e.target.value)}
                    >
                      {departments.map((dept) => (
                        <MenuItem key={dept} value={dept}>
                          {dept}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Location"
                    value={formData.location}
                    onChange={(e) => handleInputChange('location', e.target.value)}
                    required
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <FormControl fullWidth>
                    <InputLabel>Job Type</InputLabel>
                    <Select
                      value={formData.type}
                      label="Job Type"
                      onChange={(e) => handleInputChange('type', e.target.value)}
                    >
                      {jobTypes.map((type) => (
                        <MenuItem key={type} value={type}>
                          {type}
                        </MenuItem>
                      ))}
                    </Select>
                  </FormControl>
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Salary Range"
                    value={formData.salary}
                    onChange={(e) => handleInputChange('salary', e.target.value)}
                    placeholder="e.g., $80,000 - $100,000"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Experience Required"
                    value={formData.experience}
                    onChange={(e) => handleInputChange('experience', e.target.value)}
                    placeholder="e.g., 3+ years"
                  />
                </Grid>
                <Grid item xs={12} md={6}>
                  <TextField
                    fullWidth
                    label="Application Deadline"
                    type="date"
                    value={formData.deadline}
                    onChange={(e) => handleInputChange('deadline', e.target.value)}
                    InputLabelProps={{ shrink: true }}
                  />
                </Grid>
                <Grid item xs={12} md={6}>
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
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Job Description"
                    multiline
                    rows={4}
                    value={formData.description}
                    onChange={(e) => handleInputChange('description', e.target.value)}
                    placeholder="Detailed job description..."
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    fullWidth
                    label="Requirements"
                    multiline
                    rows={3}
                    value={formData.requirements}
                    onChange={(e) => handleInputChange('requirements', e.target.value)}
                    placeholder="Job requirements and qualifications..."
                  />
                </Grid>
              </Grid>
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCloseDialog}>Cancel</Button>
            <Button onClick={handleSubmit} variant="contained">
              {editingCareer ? 'Update' : 'Create'}
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

export default Careers;

