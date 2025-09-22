import React, { useEffect } from "react";
import fetchData from "../../../apis/getapis";
import { Typography, Box, Chip, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import { Event, LocationOn, Schedule, Person, Group } from "@mui/icons-material";

export default function Events() {
  const [events, setEvents] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const data = await fetchData("events");
        setEvents(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching events:", error);
        setEvents([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'TBD';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch (error) {
      return 'TBD';
    }
  };

  const formatTime = (timeString) => {
    if (!timeString) return '';
    try {
      return new Date(`2000-01-01T${timeString}`).toLocaleTimeString('en-US', {
        hour: 'numeric',
        minute: '2-digit',
        hour12: true
      });
    } catch (error) {
      return timeString;
    }
  };

  const getEventStatus = (startDate, endDate) => {
    if (!startDate) return 'upcoming';
    const now = new Date();
    const start = new Date(startDate);
    const end = endDate ? new Date(endDate) : null;
    
    if (start > now) return 'upcoming';
    if (end && end < now) return 'past';
    return 'ongoing';
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'upcoming': return 'primary';
      case 'ongoing': return 'success';
      case 'past': return 'default';
      default: return 'default';
    }
  };

  const getStatusText = (status) => {
    switch (status) {
      case 'upcoming': return 'Upcoming';
      case 'ongoing': return 'Ongoing';
      case 'past': return 'Past';
      default: return 'Unknown';
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Loading events...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          Healthcare Events & Conferences
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Join us for cutting-edge healthcare conferences, workshops, and networking events featuring industry experts and thought leaders
        </Typography>
      </Box>
      
      {events.length > 0 ? (
        <Grid container spacing={3}>
          {events.map((event, index) => {
            const status = getEventStatus(event.startDate, event.endDate);
            return (
              <Grid item xs={12} md={6} lg={4} key={event._id || index}>
                <Card 
                  sx={{ 
                    height: '100%', 
                    display: 'flex', 
                    flexDirection: 'column',
                    transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out',
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                    }
                  }}
                >
                  {event.photo && (
                    <CardMedia
                      component="img"
                      height="200"
                      image={event.photo}
                      alt={event.title}
                      sx={{ objectFit: 'cover' }}
                    />
                  )}
                  <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                      <Typography 
                        variant="h6" 
                        component="h3" 
                        sx={{ 
                          fontWeight: 'bold', 
                          color: '#1e3a8a',
                          lineHeight: 1.3,
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          flex: 1,
                          mr: 1
                        }}
                      >
                        {event.title}
                      </Typography>
                      <Chip 
                        label={getStatusText(status)} 
                        color={getStatusColor(status)}
                        size="small"
                        sx={{ minWidth: 80 }}
                      />
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Event sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {event.eventType || 'Event'}
                      </Typography>
                    </Box>
                    
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Schedule sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {formatDate(event.startDate)}
                        {event.endDate && event.endDate !== event.startDate && ` - ${formatDate(event.endDate)}`}
                      </Typography>
                    </Box>
                    
                    {event.startTime && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                        <Schedule sx={{ fontSize: '1rem' }} />
                        <Typography variant="body2">
                          {formatTime(event.startTime)}
                          {event.endTime && ` - ${formatTime(event.endTime)}`}
                        </Typography>
                      </Box>
                    )}
                    
                    {event.venue && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                        <LocationOn sx={{ fontSize: '1rem' }} />
                        <Typography variant="body2">
                          {event.venue}
                        </Typography>
                      </Box>
                    )}
                    
                    {event.manager && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                        <Person sx={{ fontSize: '1rem' }} />
                        <Typography variant="body2">
                          {event.manager}
                        </Typography>
                      </Box>
                    )}
                    
                    {event.description && (
                      <Typography 
                        variant="body2" 
                        color="text.secondary" 
                        sx={{ 
                          mb: 2,
                          lineHeight: 1.6,
                          display: '-webkit-box',
                          WebkitLineClamp: 3,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {event.description}
                      </Typography>
                    )}
                    
                    {event.targetAudience && (
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                        <Group sx={{ fontSize: '1rem' }} />
                        <Typography variant="body2">
                          {Array.isArray(event.targetAudience) 
                            ? event.targetAudience.join(', ') 
                            : event.targetAudience}
                        </Typography>
                      </Box>
                    )}
                    
                    <Box sx={{ mt: 'auto', pt: 2 }}>
                      {event.registrationRequired ? (
                        <Button 
                          variant="contained" 
                          color="primary" 
                          fullWidth
                          sx={{ 
                            backgroundColor: 'primary.main',
                            '&:hover': { backgroundColor: 'primary.dark' }
                          }}
                        >
                          Register Now
                        </Button>
                      ) : (
                        <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                          No registration required
                        </Typography>
                      )}
                    </Box>
                  </CardContent>
                </Card>
              </Grid>
            );
          })}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Event sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No events scheduled
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Check back later for upcoming healthcare events and conferences.
          </Typography>
        </Box>
      )}
    </Box>
  );
}