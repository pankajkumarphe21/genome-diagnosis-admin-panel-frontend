/** @format */

import React, { useEffect } from "react";
import fetchData from "../../../apis/getapis";
import { Typography, Box, Chip, Grid, Card, CardContent, CardMedia, Button } from "@mui/material";
import { Work, LocationOn, Business, Schedule, School, AttachMoney, CalendarToday } from "@mui/icons-material";

export default function Careers() {
  const [careers, setCareers] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const data = await fetchData("careers");
        setCareers(Array.isArray(data) ? data : []);
    } catch (err) {
      console.error("Error fetching careers:", err);
      setCareers([]);
    } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) return 'N/A';
    try {
      return new Date(dateString).toLocaleDateString('en-US', {
        year: 'numeric',
        month: 'long',
        day: 'numeric'
      });
    } catch {
      return 'N/A';
    }
  };

  const getJobTypeColor = (jobType) => {
    switch (jobType?.toLowerCase()) {
      case 'full-time': return 'success';
      case 'part-time': return 'warning';
      case 'contract': return 'info';
      case 'internship': return 'secondary';
      default: return 'default';
    }
  };

  const getExperienceColor = (experienceLevel) => {
    switch (experienceLevel?.toLowerCase()) {
      case 'entry': return 'success';
      case 'mid': return 'warning';
      case 'senior': return 'error';
      case 'executive': return 'primary';
      default: return 'default';
    }
  };

  const renderArrayField = (field, icon, label) => {
    if (!field || field.length === 0) return null;
    
    const fieldArray = Array.isArray(field) ? field : field.split(',').map(item => item.trim());
    
    return (
      <Box sx={{ mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, color: 'text.secondary' }}>
          {icon}
          <Typography variant="body2" fontWeight={500}>
            {label}:
          </Typography>
        </Box>
        <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
          {fieldArray.map((item, index) => (
            <Chip
              key={index}
              label={item}
              size="small"
              variant="outlined"
              sx={{ fontSize: '0.75rem' }}
            />
          ))}
        </Box>
      </Box>
    );
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Loading career opportunities...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          Join Our Healthcare Innovation Team
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Be part of a team that&apos;s revolutionizing healthcare through innovation, research, and patient-centered care
        </Typography>
      </Box>
      
      {careers.length > 0 ? (
        <Grid container spacing={3}>
          {careers.map((career, index) => (
            <Grid item xs={12} md={6} lg={4} key={career._id || index}>
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
                {career.thumbnailImage && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={career.thumbnailImage}
                    alt={career.title}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Typography 
                      variant="h6" 
                      component="h3" 
                      sx={{ 
                        fontWeight: 'bold', 
                        color: 'primary.main',
                        lineHeight: 1.3,
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        flex: 1,
                        mr: 1
                      }}
                    >
                      {career.title}
                    </Typography>
                    <Chip 
                      label={career.isActive ? 'Active' : 'Closed'} 
                      color={career.isActive ? 'success' : 'default'}
                      size="small"
                    />
                  </Box>
                  
                  {career.department && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Business sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {career.department}
                      </Typography>
                    </Box>
                  )}
                  
                  {career.jobType && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Work sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {career.jobType}
                      </Typography>
                      <Chip 
                        label={career.jobType} 
                        color={getJobTypeColor(career.jobType)}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  )}
                  
                  {career.location && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <LocationOn sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {career.location}
                      </Typography>
                    </Box>
                  )}
                  
                  {career.experienceLevel && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Schedule sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {career.experienceLevel}
                      </Typography>
                      <Chip 
                        label={career.experienceLevel} 
                        color={getExperienceColor(career.experienceLevel)}
                        size="small"
                        variant="outlined"
                      />
                    </Box>
                  )}
                  
                  {career.salaryRange && career.salaryRange.min && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <AttachMoney sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {career.salaryRange.min} - {career.salaryRange.max} {career.salaryRange.currency}
                      </Typography>
                    </Box>
                  )}
                  
                  {career.applicationDeadline && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2, color: 'text.secondary' }}>
                      <CalendarToday sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        Apply by: {formatDate(career.applicationDeadline)}
                      </Typography>
                    </Box>
                  )}
                  
                  {career.postedDate && (
                    <Typography variant="caption" color="text.secondary" sx={{ mb: 2 }}>
                      Posted: {formatDate(career.postedDate)}
                    </Typography>
                  )}
                  
                  {renderArrayField(career.requirements, <Work sx={{ fontSize: '1rem' }} />, 'Requirements')}
                  {renderArrayField(career.responsibilities, <Work sx={{ fontSize: '1rem' }} />, 'Responsibilities')}
                  {renderArrayField(career.qualifications, <School sx={{ fontSize: '1rem' }} />, 'Qualifications')}
                  {renderArrayField(career.benefits, <AttachMoney sx={{ fontSize: '1rem' }} />, 'Benefits')}
                  
                  <Box sx={{ mt: 'auto', pt: 2 }}>
                    {career.isActive ? (
                      <Button 
                        variant="contained" 
                        color="primary" 
                        fullWidth
                        sx={{ 
                          backgroundColor: 'primary.main',
                          '&:hover': { backgroundColor: 'primary.dark' }
                        }}
                      >
                        Apply Now
                      </Button>
                    ) : (
                      <Typography variant="body2" color="text.secondary" sx={{ textAlign: 'center', fontStyle: 'italic' }}>
                        This position is no longer accepting applications
                      </Typography>
                    )}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Work sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No career opportunities available
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Check back later for new job openings and career opportunities.
          </Typography>
        </Box>
      )}
    </Box>
  );
}
