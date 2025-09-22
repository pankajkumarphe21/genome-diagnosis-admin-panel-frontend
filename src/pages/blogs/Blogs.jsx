import React, { useEffect } from "react";
import { fetchData } from "../../../apis/index.js";
import { Typography, Box, Chip, Grid, Card, CardContent, CardMedia, Avatar } from "@mui/material";
import { Article, AccessTime, Person, Category } from "@mui/icons-material";

export default function Blogs() {
  const [blogs, setBlogs] = React.useState([]);
  const [loading, setLoading] = React.useState(true);

  useEffect(() => {
    const fetchDataAsync = async () => {
      try {
        setLoading(true);
        const data = await fetchData("blogs");
        // Ensure data is always an array
        setBlogs(Array.isArray(data) ? data : []);
      } catch (error) {
        console.error("Error fetching blogs:", error);
        setBlogs([]); // Set empty array on error
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
          Loading blogs...
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3, backgroundColor: 'background.default', minHeight: '100vh' }}>
      <Box sx={{ mb: 4, textAlign: 'center' }}>
        <Typography variant="h3" sx={{ fontWeight: 'bold', color: 'primary.main', mb: 2 }}>
          Healthcare Insights & Research
        </Typography>
        <Typography variant="h6" color="text.secondary" sx={{ maxWidth: 600, mx: 'auto' }}>
          Stay updated with the latest healthcare research, treatment methods, and industry insights from our expert team
        </Typography>
      </Box>
      
      {blogs.length > 0 ? (
        <Grid container spacing={3}>
          {blogs.map((blog, index) => (
            <Grid item xs={12} md={6} lg={4} key={blog._id || index}>
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
                {blog.photo && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={blog.photo}
                    alt={blog.title}
                    sx={{ objectFit: 'cover' }}
                  />
                )}
                <CardContent sx={{ flexGrow: 1, display: 'flex', flexDirection: 'column' }}>
                  <Typography 
                    variant="h6" 
                    component="h3" 
                    sx={{ 
                      fontWeight: 'bold', 
                      color: 'primary.main',
                      mb: 1,
                      lineHeight: 1.3,
                      display: '-webkit-box',
                      WebkitLineClamp: 2,
                      WebkitBoxOrient: 'vertical',
                      overflow: 'hidden'
                    }}
                  >
                    {blog.title}
                  </Typography>
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                    <Person sx={{ fontSize: '1rem' }} />
                    <Typography variant="body2">
                      {blog.author || 'Anonymous'}
                    </Typography>
                  </Box>
                  
                  {blog.authorCredentials && (
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 1, fontStyle: 'italic' }}>
                      {blog.authorCredentials}
                    </Typography>
                  )}
                  
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                    <Category sx={{ fontSize: '1rem' }} />
                    <Typography variant="body2">
                      {blog.category || 'Uncategorized'}
                    </Typography>
                  </Box>
                  
                  {blog.readTime && (
                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 1, color: 'text.secondary' }}>
                      <AccessTime sx={{ fontSize: '1rem' }} />
                      <Typography variant="body2">
                        {blog.readTime} min read
                      </Typography>
                    </Box>
                  )}
                  
                  {blog.description && (
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
                      {blog.description}
                    </Typography>
                  )}
                  
                  {blog.publicationDate && (
                    <Typography variant="caption" color="text.secondary" sx={{ mt: 'auto' }}>
                      Published: {formatDate(blog.publicationDate)}
                    </Typography>
                  )}
                  
                  {renderTags(blog.tags)}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      ) : (
        <Box sx={{ textAlign: 'center', py: 8 }}>
          <Article sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
          <Typography variant="h5" color="text.secondary" gutterBottom>
            No blogs available
          </Typography>
          <Typography variant="body1" color="text.secondary">
            Check back later for new healthcare insights and research updates.
          </Typography>
        </Box>
      )}
    </Box>
  );
}


