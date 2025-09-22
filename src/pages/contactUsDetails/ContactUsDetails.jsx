/** @format */

import React, { useEffect } from "react";
import fetchData from "../../../apis/getapis";
import { Typography, Box, Grid, Card, CardContent, CircularProgress, Chip, Link } from "@mui/material";
import { Phone, Email, LocationOn, Schedule, Business, LinkedIn, Twitter, Facebook, Instagram } from "@mui/icons-material";

export default function ContactUsDetails() {
  const [loading, setLoading] = React.useState(true);
  const [contactInfo, setContactInfo] = React.useState({});

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const data = await fetchData("contact-us-details");
        // Get the first contact detail or use empty object as fallback
        setContactInfo(Array.isArray(data) && data.length > 0 ? data[0] : {});
      } catch (error) {
        console.error("Error fetching contact details:", error);
        setContactInfo({});
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, []);

  const renderBusinessHours = (businessHours) => {
    if (!businessHours) return null;
    
    const days = ['monday', 'tuesday', 'wednesday', 'thursday', 'friday', 'saturday', 'sunday'];
    
    return (
      <Box>
        {days.map((day) => (
          <Box key={day} sx={{ display: 'flex', justifyContent: 'space-between', mb: 1 }}>
            <Typography variant="body2" sx={{ textTransform: 'capitalize', fontWeight: 500 }}>
              {day}:
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {businessHours[day] || 'Closed'}
            </Typography>
          </Box>
        ))}
      </Box>
    );
  };

  const renderDepartments = (departments) => {
    if (!departments || departments.length === 0) return null;
    
    const deptArray = Array.isArray(departments) ? departments : departments.split(',').map(dept => dept.trim());
    
    return (
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
        {deptArray.map((dept, index) => (
          <Chip
            key={index}
            label={dept}
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.75rem' }}
          />
        ))}
      </Box>
    );
  };

  const renderSocialMedia = (socialMedia) => {
    if (!socialMedia) return null;
    
    const links = [];
    if (socialMedia.linkedin) {
      links.push(
        <Link key="linkedin" href={socialMedia.linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedIn sx={{ color: '#0077b5', fontSize: '2rem' }} />
        </Link>
      );
    }
    if (socialMedia.twitter) {
      links.push(
        <Link key="twitter" href={socialMedia.twitter} target="_blank" rel="noopener noreferrer">
          <Twitter sx={{ color: '#1DA1F2', fontSize: '2rem' }} />
        </Link>
      );
    }
    if (socialMedia.facebook) {
      links.push(
        <Link key="facebook" href={socialMedia.facebook} target="_blank" rel="noopener noreferrer">
          <Facebook sx={{ color: '#1877F2', fontSize: '2rem' }} />
        </Link>
      );
    }
    if (socialMedia.instagram) {
      links.push(
        <Link key="instagram" href={socialMedia.instagram} target="_blank" rel="noopener noreferrer">
          <Instagram sx={{ color: '#E4405F', fontSize: '2rem' }} />
        </Link>
      );
    }
    
    return links.length > 0 ? (
      <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
        {links}
      </Box>
    ) : null;
  };

  if (loading) {
    return (
      <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          Contact Information & Support
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Get in touch with us for any questions, support, or collaboration opportunities
        </Typography>
      </Box>

      {/* Contact Information Display */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Phone />
                Contact Numbers
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Main:</strong> {contactInfo.phoneNumber || 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Emergency:</strong> {contactInfo.emergencyPhone || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
        
        <Grid item xs={12} md={6}>
          <Card sx={{ height: '100%', transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
            <CardContent>
              <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                <Email />
                Email & Address
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Email:</strong> {contactInfo.email || 'N/A'}
              </Typography>
              <Typography variant="body1" sx={{ mb: 1 }}>
                <strong>Address:</strong> {contactInfo.address || 'N/A'}
              </Typography>
            </CardContent>
          </Card>
        </Grid>
      </Grid>

      {/* Additional Information */}
      <Grid container spacing={3} sx={{ mb: 4 }}>
        {contactInfo.city && (
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <LocationOn />
                  Location
                </Typography>
                <Typography variant="body1" sx={{ mb: 1 }}>
                  <strong>City:</strong> {contactInfo.city}
                </Typography>
                {contactInfo.state && (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>State:</strong> {contactInfo.state}
                  </Typography>
                )}
                {contactInfo.zipCode && (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>ZIP Code:</strong> {contactInfo.zipCode}
                  </Typography>
                )}
                {contactInfo.country && (
                  <Typography variant="body1" sx={{ mb: 1 }}>
                    <strong>Country:</strong> {contactInfo.country}
                  </Typography>
                )}
              </CardContent>
            </Card>
          </Grid>
        )}

        {contactInfo.businessHours && (
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Schedule />
                  Business Hours
                </Typography>
                {renderBusinessHours(contactInfo.businessHours)}
              </CardContent>
            </Card>
          </Grid>
        )}

        {contactInfo.departments && (
          <Grid item xs={12} md={4}>
            <Card sx={{ height: '100%', transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
              <CardContent>
                <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold', display: 'flex', alignItems: 'center', gap: 1 }}>
                  <Business />
                  Departments
                </Typography>
                {renderDepartments(contactInfo.departments)}
              </CardContent>
            </Card>
          </Grid>
        )}
      </Grid>

      {/* Social Media */}
      {contactInfo.socialMedia && (
        <Card sx={{ mb: 4, transition: 'transform 0.2s ease-in-out, box-shadow 0.2s ease-in-out', '&:hover': { transform: 'translateY(-4px)', boxShadow: '0 8px 25px rgba(0,0,0,0.15)' } }}>
          <CardContent>
            <Typography variant="h6" sx={{ mb: 2, color: 'primary.main', fontWeight: 'bold' }}>
              Connect With Us
            </Typography>
            {renderSocialMedia(contactInfo.socialMedia)}
          </CardContent>
        </Card>
      )}

      {/* Contact Form CTA */}
      <Card sx={{ textAlign: 'center', p: 4, backgroundColor: 'primary.main', color: 'white' }}>
        <Typography variant="h5" sx={{ mb: 2, fontWeight: 'bold' }}>
          Need Help?
        </Typography>
        <Typography variant="body1" sx={{ mb: 3 }}>
          Can't find what you're looking for? Our team is here to help you with any questions or concerns.
        </Typography>
        <Typography variant="body2">
          <strong>Email us:</strong> {contactInfo.email || 'info@healthcare.com'} | 
          <strong> Call us:</strong> {contactInfo.phoneNumber || '+1 (555) 123-4567'}
        </Typography>
      </Card>
    </Box>
  );
}
