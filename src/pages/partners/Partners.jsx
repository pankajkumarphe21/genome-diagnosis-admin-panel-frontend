import React, { useEffect } from "react";
import fetchData from "../../../apis/getapis";
import { Typography, Box, Chip, Grid, Card, CardContent, CardMedia, Avatar, Link } from "@mui/material";
import { Business, Language, Email, Person, Handshake } from "@mui/icons-material";

export default function Partners() {
  const [partners, setPartners] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const data = await fetchData("partners");
        setPartners(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching partners:", error);
        setPartners([]);
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
        month: 'long'
      });
    } catch (error) {
      return 'N/A';
    }
  };

  const getStatusColor = (isActive) => {
    return isActive ? 'success' : 'default';
  };

  const getStatusText = (isActive) => {
    return isActive ? 'Active' : 'Inactive';
  };

  const renderCollaborationAreas = (areas) => {
    if (!areas || areas.length === 0) return null;
    
    const areaArray = Array.isArray(areas) ? areas : areas.split(',').map(area => area.trim());
    
    return (
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
        {areaArray.map((area, index) => (
          <Chip
            key={index}
            label={area}
            size="small"
            variant="outlined"
            sx={{ fontSize: '0.75rem' }}
          />
        ))}
      </Box>
    );
  };

  if (loading) {
    return (
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h6" color="text.secondary">
          Loading partners...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          Strategic Healthcare Partnerships
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          We collaborate with leading healthcare organizations, technology providers, and research institutions to deliver innovative solutions
        </Typography>
      </Box>
      
      {partners.length > 0 ? (
        <Grid container spacing={3}>
          {partners.map((partner, index) => (
            <Grid item xs={12} md={6} lg={4} key={partner._id || index}>
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
                      {partner.partnerLogo ? (
                        <CardMedia
                          component="img"
                          sx={{ 
                            width: 60, 
                            height: 60, 
                            objectFit: 'contain',
                            borderRadius: 1
                          }}
                          image={partner.partnerLogo}
                          alt={`${partner.partnerName} logo`}
                        />
                      ) : (
                        <Avatar sx={{ width: 60, height: 60, bgcolor: 'primary.main' }}>
                          <Business />
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
                          {partner.partnerName}
                        </Typography>
                        <Chip 
                          label={getStatusText(partner.isActive)} 
                          color={getStatusColor(partner.isActive)}
                          size="small"
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  
                  {partner.industry && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Business sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {partner.industry}
                      </Typography>
                    </Box>
                  )}
                  
                  {partner.partnershipType && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Handshake sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {partner.partnershipType}
                      </Typography>
                    </Box>
                  )}
                  
                  {partner.description && (
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
                      {partner.description}
                    </Typography>
                  )}
                  
                  {partner.contactPerson && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Person sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {partner.contactPerson}
                      </Typography>
                    </Box>
                  )}
                  
                  {partner.contactEmail && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Email sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {partner.contactEmail}
                      </Typography>
                    </Box>
                  )}
                  
                  {partner.website && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Language sx={{ fontSize: '1rem' }} />
                      <Link 
                        href={partner.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        sx={{ color: 'primary.main', textDecoration: 'none' }}
                      >
                        Visit Website
                      </Link>
                    </Box>
                  )}
                  
                  {partner.partnershipStartDate && (
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto' }}>
                      Partner since: {formatDate(partner.partnershipStartDate)}
                    </Typography>
                  )}
                  
                  {renderCollaborationAreas(partner.collaborationAreas)}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Handshake sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No partners available
          </Typography>
          <Typography variant="body1" color="text.secondary">
            We're actively building strategic partnerships. Check back soon for updates.
          </Typography>
        </Box>
      )}
    </Box>
  );
}


