import React, { useState, useEffect } from 'react';
import {
  Box,
  Container,
  Grid,
  Card,
  CardContent,
  Typography,
  Button,
  Paper,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Divider,
  LinearProgress,
  Chip,
  IconButton,
  Tooltip,
  CircularProgress,
  Alert
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Article,
  Work,
  Event,
  Newspaper,
  Business,
  Group,
  RateReview,
  ContactSupport,
  TrendingUp,
  Science,
  Visibility,
  Edit,
  Delete,
  Add,
  CalendarToday,
  Person,
  Email,
  Refresh
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { fetchDataWithAuth } from '../../../apis/index.js';

const Dashboard = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dashboardData, setDashboardData] = useState(null);
  const [activities, setActivities] = useState([]);

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      setLoading(true);
      setError(null);

      const token = localStorage.getItem('token');
      if (!token) {
        throw new Error('No authentication token found');
      }

      // Fetch dashboard stats
      const statsData = await fetchDataWithAuth('admin/dashboard/stats', token);

      if (!statsData || !statsData.success) {
        throw new Error('Failed to fetch dashboard stats');
      }

      // Fetch recent activities
      const activitiesData = await fetchDataWithAuth('admin/dashboard/activities', token);

      if (!activitiesData || !activitiesData.success) {
        throw new Error('Failed to fetch activities');
      }

      setDashboardData(statsData.data);
      setActivities(activitiesData.data);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCardClick = (link) => {
    navigate(link);
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'completed':
        return 'success';
      case 'pending':
        return 'warning';
      case 'inactive':
        return 'error';
      default:
        return 'default';
    }
  };

  const getActivityIcon = (type) => {
    switch (type) {
      case 'blog':
        return <Article />;
      case 'career':
        return <Work />;
      case 'event':
        return <Event />;
      case 'partner':
        return <Business />;
      case 'team':
        return <Group />;
      default:
        return <Science />;
    }
  };

  if (loading) {
    return (
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center', 
        minHeight: '100vh' 
      }}>
        <CircularProgress size={60} />
      </Box>
    );
  }

  if (error) {
    return (
      <Box sx={{ py: 4, backgroundColor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="xl">
          <Alert 
            severity="error" 
            action={
              <Button color="inherit" size="small" onClick={fetchDashboardData}>
                Retry
              </Button>
            }
            sx={{ mb: 4 }}
          >
            Error loading dashboard: {error}
          </Alert>
        </Container>
      </Box>
    );
  }

  if (!dashboardData) {
    return (
      <Box sx={{ py: 4, backgroundColor: 'background.default', minHeight: '100vh' }}>
        <Container maxWidth="xl">
          <Typography variant="h6" color="text.secondary">
            No dashboard data available
          </Typography>
        </Container>
      </Box>
    );
  }

  const quickStats = [
    { 
      label: 'Total Content', 
      value: dashboardData.blogs.total + dashboardData.news.total, 
      color: '#3b82f6', 
      icon: <Article /> 
    },
    { 
      label: 'Active Events', 
      value: dashboardData.events.upcoming + dashboardData.events.ongoing, 
      color: '#f59e0b', 
      icon: <Event /> 
    },
    { 
      label: 'Open Positions', 
      value: dashboardData.careers.active, 
      color: '#10b981', 
      icon: <Work /> 
    },
    { 
      label: 'New Messages', 
      value: dashboardData.contact.new, 
      color: '#ef4444', 
      icon: <Email /> 
    }
  ];

  return (
    <Box sx={{ py: 4, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Container maxWidth="xl">
        {/* Header */}
        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', mb: 4 }}>
          <Box>
            <Typography variant="h3" component="h1" gutterBottom color="primary" fontWeight="bold">
              Welcome back, {user?.name || 'Administrator'}!
            </Typography>
            <Typography variant="h6" color="text.secondary">
              Here's what's happening with your Crystalis Health platform
            </Typography>
          </Box>
          <Button
            variant="outlined"
            startIcon={<Refresh />}
            onClick={fetchDashboardData}
            sx={{ py: 1.5, px: 3 }}
          >
            Refresh Data
          </Button>
        </Box>

        {/* Quick Stats */}
        <Grid container spacing={3} sx={{ mb: 4 }}>
          {quickStats.map((stat, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}
                onClick={() => handleCardClick('/admin')}
              >
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Avatar
                    sx={{
                      width: 60,
                      height: 60,
                      mx: 'auto',
                      mb: 2,
                      backgroundColor: stat.color,
                      color: 'white'
                    }}
                  >
                    {stat.icon}
                  </Avatar>
                  <Typography variant="h4" component="div" gutterBottom fontWeight="bold">
                    {stat.value}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    {stat.label}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* Main Content Grid */}
        <Grid container spacing={4}>
          {/* Quick Actions */}
          <Grid item xs={12} md={8}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DashboardIcon sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h5" component="h2">
                    Quick Actions
                  </Typography>
                </Box>
                <Chip label="Most Used" color="primary" size="small" />
              </Box>
              
              <Grid container spacing={2}>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => navigate('/admin/blogs')}
                    sx={{ py: 2, mb: 2 }}
                  >
                    New Blog Post
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => navigate('/admin/events')}
                    sx={{ py: 2, mb: 2 }}
                  >
                    Schedule Event
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => navigate('/admin/careers')}
                    sx={{ py: 2, mb: 2 }}
                  >
                    Post Job
                  </Button>
                </Grid>
                <Grid item xs={12} sm={6}>
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<Add />}
                    onClick={() => navigate('/admin/partners')}
                    sx={{ py: 2, mb: 2 }}
                  >
                    Add Partner
                  </Button>
                </Grid>
              </Grid>
            </Paper>
          </Grid>

          {/* Recent Activity */}
          <Grid item xs={12} md={4}>
            <Paper sx={{ p: 3, height: '100%' }}>
              <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', mb: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <TrendingUp sx={{ mr: 2, color: 'primary.main' }} />
                  <Typography variant="h5" component="h2">
                    Recent Activity
                  </Typography>
                </Box>
                <Button size="small" color="primary">
                  View All
                </Button>
              </Box>
              
              <List>
                {activities.map((activity, index) => (
                  <React.Fragment key={activity.id}>
                    <ListItem sx={{ px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 40 }}>
                        <Avatar sx={{ 
                          width: 32, 
                          height: 32, 
                          backgroundColor: 'grey.200',
                          color: 'primary.main'
                        }}>
                          {getActivityIcon(activity.type)}
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        primary={
                          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                            <Typography variant="body2" fontWeight={500}>
                              {activity.action}
                            </Typography>
                            <Chip 
                              label={activity.status} 
                              size="small" 
                              color={getStatusColor(activity.status)}
                            />
                          </Box>
                        }
                        secondary={
                          <Box>
                            <Typography variant="caption" display="block">
                              {activity.time} • {activity.user}
                            </Typography>
                          </Box>
                        }
                      />
                    </ListItem>
                    {index < activities.length - 1 && <Divider />}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </Grid>
        </Grid>

        {/* Content Overview */}
        <Box sx={{ mt: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Content Overview
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} md={6}>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Blogs</Typography>
                    <Typography variant="body2">{dashboardData.blogs.published}/{dashboardData.blogs.total}</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(dashboardData.blogs.published / dashboardData.blogs.total) * 100} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">News</Typography>
                    <Typography variant="body2">{dashboardData.news.published}/{dashboardData.news.total}</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(dashboardData.news.published / dashboardData.news.total) * 100} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
                <Box sx={{ mb: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
                    <Typography variant="body2">Events</Typography>
                    <Typography variant="body2">{dashboardData.events.upcoming}/{dashboardData.events.total}</Typography>
                  </Box>
                  <LinearProgress 
                    variant="determinate" 
                    value={(dashboardData.events.upcoming / dashboardData.events.total) * 100} 
                    sx={{ height: 8, borderRadius: 4 }}
                  />
                </Box>
              </Grid>
              <Grid item xs={12} md={6}>
                <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <CalendarToday color="primary" />
                    <Typography variant="body2">
                      Next event: Healthcare Innovation Summit (in 3 days)
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Person color="primary" />
                    <Typography variant="body2">
                      {dashboardData.contact.new} new contact messages
                    </Typography>
                  </Box>
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <Email color="primary" />
                    <Typography variant="body2">
                      {dashboardData.careers.applications} job applications received
                    </Typography>
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>

        {/* Platform Stats */}
        <Box sx={{ mt: 4 }}>
          <Paper sx={{ p: 3 }}>
            <Typography variant="h5" component="h2" gutterBottom>
              Platform Statistics
            </Typography>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="primary" fontWeight="bold">
                    {dashboardData.blogs.views.toLocaleString()}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Total Blog Views
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="success.main" fontWeight="bold">
                    {dashboardData.events.attendees}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Event Attendees
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="warning.main" fontWeight="bold">
                    {dashboardData.careers.applications}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Job Applications
                  </Typography>
                </Box>
              </Grid>
              <Grid item xs={12} sm={6} md={3}>
                <Box sx={{ textAlign: 'center' }}>
                  <Typography variant="h4" color="info.main" fontWeight="bold">
                    {dashboardData.contact.total}
                  </Typography>
                  <Typography variant="body2" color="text.secondary">
                    Contact Inquiries
                  </Typography>
                </Box>
              </Grid>
            </Grid>
          </Paper>
        </Box>
      </Container>
    </Box>
  );
};

export default Dashboard;

