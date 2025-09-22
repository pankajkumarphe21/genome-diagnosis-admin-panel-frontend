/** @format */

import React from "react";
import {
  Container,
  Typography,
  Box,
  Button,
  Grid,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Stack
} from "@mui/material";
import {
  Science,
  HealthAndSafety,
  Biotech,
  Analytics,
  ArrowForward
} from "@mui/icons-material";

export default function Home() {
  const services = [
    {
      icon: <Science sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: "Advanced Diagnostics",
      description: "State-of-the-art laboratory testing and diagnostic services for precise healthcare outcomes."
    },
    {
      icon: <Biotech sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: "Research & Innovation",
      description: "Cutting-edge research in molecular diagnostics and personalized medicine."
    },
    {
      icon: <Analytics sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: "Data Analytics",
      description: "AI-powered diagnostic insights and predictive healthcare analytics."
    },
    {
      icon: <HealthAndSafety sx={{ fontSize: 40, color: '#1976d2' }} />,
      title: "Quality Assurance",
      description: "Rigorous quality standards ensuring accurate and reliable diagnostic results."
    }
  ];

  const stats = [
    { number: "10K+", label: "Tests Performed" },
    { number: "500+", label: "Healthcare Partners" },
    { number: "99.9%", label: "Accuracy Rate" },
    { number: "24/7", label: "Support Available" }
  ];

  return (
    <Box sx={{ backgroundColor: 'background.default' }}>
      {/* Hero Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h2"
              sx={{
                fontWeight: "bold",
                marginBottom: 3,
                color: "primary.main",
                lineHeight: 1.2
              }}>
              Empowering Precise Diagnostics
            </Typography>
            <Typography
              variant="h5"
              sx={{
                color: "text.secondary",
                marginBottom: 4,
                lineHeight: 1.6
              }}>
              Crystalis Health Innovations is revolutionizing healthcare through advanced diagnostic technologies,
              research-driven solutions, and unwavering commitment to precision medicine.
            </Typography>
            <Stack direction="row" spacing={2}>
              <Button
                variant="contained"
                size="large"
                sx={{
                  backgroundColor: "primary.main",
                  "&:hover": { backgroundColor: "primary.dark" },
                  px: 4,
                  py: 1.5
                }}>
                Our Services
              </Button>
              <Button
                variant="outlined"
                size="large"
                sx={{
                  borderColor: "primary.main",
                  color: "primary.main",
                  px: 4,
                  py: 1.5
                }}>
                Learn More
              </Button>
            </Stack>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: 4,
                p: 4,
                textAlign: 'center',
                color: 'white',
                minHeight: 400,
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                alignItems: 'center'
              }}>
              <Science sx={{ fontSize: 80, mb: 2, opacity: 0.8 }} />
              <Typography variant="h4" sx={{ mb: 2, fontWeight: 'bold' }}>
                Next-Gen Diagnostics
              </Typography>
              <Typography variant="body1" sx={{ opacity: 0.9 }}>
                Leveraging cutting-edge technology for accurate, fast, and reliable diagnostic results
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>

      {/* Services Section */}
      <Container maxWidth="lg" sx={{ py: 8 }}>
        <Typography
          variant="h3"
          sx={{
            textAlign: "center",
            fontWeight: "bold",
            marginBottom: 6,
            color: "primary.main"
          }}>
          Our Core Services
        </Typography>
        <Grid container spacing={4}>
          {services.map((service, index) => (
            <Grid item xs={12} sm={6} md={3} key={index}>
              <Card
                sx={{
                  height: '100%',
                  transition: 'transform 0.3s ease-in-out',
                  '&:hover': {
                    transform: 'translateY(-8px)',
                    boxShadow: '0 8px 25px rgba(0,0,0,0.15)'
                  }
                }}>
                <CardContent sx={{ textAlign: 'center', p: 3 }}>
                  <Box sx={{ mb: 2 }}>
                    {service.icon}
                  </Box>
                  <Typography
                    variant="h6"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 2,
                      color: "primary.main"
                    }}>
                    {service.title}
                  </Typography>
                  <Typography
                    variant="body2"
                    sx={{
                      color: "text.secondary",
                      lineHeight: 1.6
                    }}>
                    {service.description}
                  </Typography>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Stats Section */}
      <Box sx={{ backgroundColor: 'primary.main', py: 6 }}>
        <Container maxWidth="lg">
          <Grid container spacing={4}>
            {stats.map((stat, index) => (
              <Grid item xs={6} md={3} key={index}>
                <Box sx={{ textAlign: 'center', color: 'white' }}>
                  <Typography
                    variant="h2"
                    sx={{
                      fontWeight: "bold",
                      marginBottom: 1,
                      color: "white"
                    }}>
                    {stat.number}
                  </Typography>
                  <Typography
                    variant="body1"
                    sx={{
                      opacity: 0.9,
                      fontSize: '1.1rem'
                    }}>
                    {stat.label}
                  </Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* CTA Section */}
      <Container maxWidth="md" sx={{ py: 8, textAlign: 'center' }}>
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: 3,
            color: "primary.main"
          }}>
          Ready to Transform Your Diagnostic Experience?
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "#64748b",
            marginBottom: 4,
            fontSize: '1.1rem',
            lineHeight: 1.6
          }}>
          Join hundreds of healthcare providers who trust Crystalis for accurate,
          reliable, and innovative diagnostic solutions.
        </Typography>
        <Button
          variant="contained"
          size="large"
          endIcon={<ArrowForward />}
          sx={{
            backgroundColor: "primary.main",
            "&:hover": { backgroundColor: "primary.dark" },
            px: 6,
            py: 2,
            fontSize: '1.1rem'
          }}>
          Get Started Today
        </Button>
      </Container>
    </Box>
  );
}
