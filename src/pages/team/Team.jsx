import React, { useEffect } from "react";
import fetchData from "../../../apis/getapis";
import { Typography, Box, Chip, Grid, Card, CardContent, CardMedia, Avatar, Link } from "@mui/material";
import { Person, Work, School, Star, LinkedIn, Twitter, Facebook, Instagram } from "@mui/icons-material";

export default function Team() {
  const [team, setTeam] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const data = await fetchData("team");
        setTeam(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching team:", error);
        setTeam([]);
      } finally {
        setLoading(false);
      }
    };
    fetchDataAsync();
  }, []);

  const renderSocialLinks = (socialMediaLinks) => {
    if (!socialMediaLinks) return null;
    
    const links = [];
    if (socialMediaLinks.linkedin) {
      links.push(
        <Link key="linkedin" href={socialMediaLinks.linkedin} target="_blank" rel="noopener noreferrer">
          <LinkedIn sx={{ color: '#0077b5', fontSize: '1.5rem' }} />
        </Link>
      );
    }
    if (socialMediaLinks.x) {
      links.push(
        <Link key="x" href={socialMediaLinks.x} target="_blank" rel="noopener noreferrer">
          <Twitter sx={{ color: '#1DA1F2', fontSize: '1.5rem' }} />
        </Link>
      );
    }
    if (socialMediaLinks.facebook) {
      links.push(
        <Link key="facebook" href={socialMediaLinks.facebook} target="_blank" rel="noopener noreferrer">
          <Facebook sx={{ color: '#1877F2', fontSize: '1.5rem' }} />
        </Link>
      );
    }
    if (socialMediaLinks.insta) {
      links.push(
        <Link key="instagram" href={socialMediaLinks.insta} target="_blank" rel="noopener noreferrer">
          <Instagram sx={{ color: '#E4405F', fontSize: '1.5rem' }} />
        </Link>
      );
    }
    
    return links.length > 0 ? (
      <Box sx={{ display: 'flex', gap: 1, mt: 1 }}>
        {links}
      </Box>
    ) : null;
  };

  const renderArrayField = (field, icon) => {
    if (!field || field.length === 0) return null;
    
    const fieldArray = Array.isArray(field) ? field : field.split(',').map(item => item.trim());
    
    return (
      <Box sx={{ mb: 1 }}>
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 0.5, color: 'text.secondary' }}>
          {icon}
          <Typography variant="body2" fontWeight={500}>
            {icon.type.displayName === 'School' ? 'Education' : 
             icon.type.displayName === 'Star' ? 'Achievements' : 'Certifications'}
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
          Loading team...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          Our Healthcare Innovation Team
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Meet our dedicated team of healthcare professionals, researchers, and innovators committed to advancing medical care
        </Typography>
      </Box>
      
      {team.length > 0 ? (
        <Grid container spacing={3}>
          {team.map((member, index) => (
            <Grid item xs={12} md={6} lg={4} key={member._id || index}>
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
                      {member.userPhoto ? (
                        <CardMedia
                          component="img"
                          sx={{ 
                            width: 80, 
                            height: 80, 
                            borderRadius: '50%',
                            objectFit: 'cover'
                          }}
                          image={member.userPhoto}
                          alt={member.name}
                        />
                      ) : (
                        <Avatar sx={{ width: 80, height: 80, bgcolor: 'primary.main' }}>
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
                          {member.name}
                        </Typography>
                        <Chip 
                          label={member.isActive ? 'Active' : 'Inactive'} 
                          color={member.isActive ? 'success' : 'default'}
                          size="small"
                          sx={{ mt: 0.5 }}
                        />
                      </Box>
                    </Box>
                  </Box>
                  
                  {member.designation && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Work sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2" fontWeight={500}>
                        {member.designation}
                      </Typography>
                    </Box>
                  )}
                  
                  {member.department && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Work sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {member.department}
                      </Typography>
                    </Box>
                  )}
                  
                  {member.specialization && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Star sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {member.specialization}
                      </Typography>
                    </Box>
                  )}
                  
                  {member.experience && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
                      <strong>Experience:</strong> {member.experience}
                    </Typography>
                  )}
                  
                  {member.bio && (
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
                      {member.bio}
                    </Typography>
                  )}
                  
                  {renderArrayField(member.education, <School sx={{ fontSize: '1rem' }} />)}
                  {renderArrayField(member.certifications, <Star sx={{ fontSize: '1rem' }} />)}
                  {renderArrayField(member.achievements, <Star sx={{ fontSize: '1rem' }} />)}
                  
                  <Box sx={{ mt: 'auto', pt: 2 }}>
                    {renderSocialLinks(member.socialMediaLinks)}
                  </Box>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Person sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No team members available
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Our team information will be available soon.
          </Typography>
        </Box>
      )}
    </Box>
  );
}


