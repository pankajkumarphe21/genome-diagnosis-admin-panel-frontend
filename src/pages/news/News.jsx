
import React, { useEffect } from "react";
import fetchData from "../../../apis/getapis";
import { Typography, Box, Chip, Grid, Card, CardContent, CardMedia, Avatar } from "@mui/material";
import { Article, Person, Category, Source, TrendingUp, AccessTime } from "@mui/icons-material";

export default function News() {
  const [news, setNews] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const data = await fetchData("news");
        setNews(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching news:", error);
        setNews([]);
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

  const getImpactColor = (impactLevel) => {
    switch (impactLevel?.toLowerCase()) {
      case 'high': return 'error';
      case 'medium': return 'warning';
      case 'low': return 'success';
      default: return 'default';
    }
  };

  const renderTags = (tags) => {
    if (!tags || tags.length === 0) return null;
    
    const tagArray = Array.isArray(tags) ? tags : tags.split(',').map(tag => tag.trim());
    
    return (
      <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap', mt: 1 }}>
        {tagArray.map((tag, index) => (
          <Chip
            key={index}
            label={tag}
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
          Loading news...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          Latest Healthcare News & Updates
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 700, mx: 'auto' }}>
          Stay informed with the latest developments in healthcare, medical research, and industry innovations
        </Typography>
      </Box>
      
      {news.length > 0 ? (
        <Grid container spacing={3}>
          {news.map((article, index) => (
            <Grid item xs={12} md={6} lg={4} key={article._id || index}>
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
                {article.photo && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={article.photo}
                    alt={article.headline}
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
                      {article.headline}
                    </Typography>
                    {article.impactLevel && (
                      <Chip 
                        label={article.impactLevel} 
                        color={getImpactColor(article.impactLevel)}
                        size="small"
                        icon={<TrendingUp />}
                      />
                    )}
                  </Box>
                  
                  {article.author && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Person sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {article.author}
                      </Typography>
                    </Box>
                  )}
                  
                  {article.category && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Category sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {article.category}
                      </Typography>
                    </Box>
                  )}
                  
                  {article.source && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <Source sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {article.source}
                      </Typography>
                    </Box>
                  )}
                  
                  {article.description && (
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
                      {article.description}
                    </Typography>
                  )}
                  
                  {article.publicationDate && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <AccessTime sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {formatDate(article.publicationDate)}
                      </Typography>
                    </Box>
                  )}
                  
                  {renderTags(article.tags)}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Article sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No news available
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Check back later for the latest healthcare news and updates.
          </Typography>
        </Box>
      )}
    </Box>
  );
}


