import React, { useEffect } from "react";
import fetchData from "../../../apis/getapis";
import { Typography, Box, Chip, Grid, Card, CardContent, CardMedia, Avatar, Rating } from "@mui/material";
import { Star, Person, Work, Business, Verified, CalendarToday } from "@mui/icons-material";

export default function Testimonials() {
  const [testimonials, setTestimonials] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const data = await fetchData("testimonials");
        setTestimonials(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching testimonials:", error);
        setTestimonials([]);
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
    } catch (error) {
      return 'N/A';
    }
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Loading testimonials...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          Client Success Stories & Testimonials
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Discover how our healthcare solutions have made a positive impact on patients and organizations
        </Typography>
      </Box>
      
      {testimonials.length > 0 ? (
        <Grid container spacing={3}>
          {testimonials.map((testimonial, index) => (
            <Grid item xs={12} md={6} lg={4} key={testimonial._id || index}>
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
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column', p: 3 }}>
                  <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', mb: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, flex: 1 }}>
                      {testimonial.userPhoto ? (
                        <CardMedia
                          component="img"
                          sx={{ 
                            width: 60, 
                            height: 60, 
                            borderRadius: '50%',
                            objectFit: 'cover'
                          }}
                          image={testimonial.userPhoto}
                          alt={testimonial.userName}
                        />
                      ) : (
                        <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main' }}>
                          <Person />
                        </Avatar>
                      )}
                      <Box sx={{ flex: 1 }}>
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
                            overflow: 'hidden'
                          }}
                        >
                          {testimonial.userName}
                        </Typography>
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 0.5 }}>
                          {testimonial.isVerified && (
                            <Chip 
                              label="Verified" 
                              color="success"
                              size="small"
                              icon={<Verified />}
                            />
                          )}
                          {testimonial.isFeatured && (
                            <Chip 
                              label="Featured" 
                              color="primary"
                              size="small"
                              icon={<Star />}
                            />
                          )}
                        </Box>
                      </Box>
                    </Box>
                  </Box>
                  
                  {testimonial.designation && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Work sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {testimonial.designation}
                      </Typography>
                    </Box>
                  )}
                  
                  {testimonial.companyName && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Business sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {testimonial.companyName}
                      </Typography>
                    </Box>
                  )}
                  
                  {testimonial.serviceType && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Star sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {testimonial.serviceType}
                      </Typography>
                    </Box>
                  )}
                  
                  {testimonial.rating && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
                      <Rating 
                        value={testimonial.rating} 
                        readOnly 
                        precision={0.5}
                        size="small"
                      />
                      <Typography variant="body2" color="text.secondary">
                        ({testimonial.rating}/5)
                      </Typography>
                    </Box>
                  )}
                  
                  {testimonial.testimonial && (
                    <Typography 
                      variant="body2" 
                      color="text.secondary" 
                      sx={{ 
                        mb: 2,
                        lineHeight: 1.6,
                        fontStyle: 'italic',
                        display: '-webkit-box',
                        WebkitLineClamp: 4,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden'
                      }}
                    >
                      "{testimonial.testimonial}"
                    </Typography>
                  )}
                  
                  {testimonial.patientOutcome && (
                    <Box sx={{ mb: 2 }}>
                      <Typography variant="body2" fontWeight={500} color="primary" gutterBottom>
                        Patient Outcome:
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {testimonial.patientOutcome}
                      </Typography>
                    </Box>
                  )}
                  
                  {testimonial.testimonialDate && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mt: 'auto', pt: 2, color: 'text.secondary' }}>
                      <CalendarToday sx={{ fontSize: '1rem' }} />
                      <Typography variant="caption">
                        {formatDate(testimonial.testimonialDate)}
                      </Typography>
                    </Box>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Star sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No testimonials available
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Client testimonials will be available soon.
          </Typography>
        </Box>
      )}
    </Box>
  );
}


