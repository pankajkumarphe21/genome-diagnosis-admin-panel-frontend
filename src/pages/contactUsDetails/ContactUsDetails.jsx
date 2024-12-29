/** @format */

import React, { useState, useEffect } from "react";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Paper,
  CircularProgress,
} from "@mui/material";

export default function ContactUsDetails() {
  const [contactDetails, setContactDetails] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("/api/contact-details")
      .then((response) => response.json())
      .then((data) => {
        setContactDetails(data);
        setFormData({
          name: data.name,
          email: data.email,
          message: data.message,
        });
        setLoading(false);
      });
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
    console.log("Updated Details:", formData);
  };

  if (loading) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container maxWidth="sm">
      <Paper
        elevation={3}
        sx={{ padding: 4, marginTop: 4 }}>
        <Typography
          variant="h4"
          gutterBottom>
          Contact Details
        </Typography>
        <Box sx={{ marginBottom: 2 }}>
          <Typography variant="body1">
            <strong>Name:</strong> {contactDetails.name}
          </Typography>
          <Typography variant="body1">
            <strong>Email:</strong> {contactDetails.email}
          </Typography>
          <Typography variant="body1">
            <strong>Message:</strong> {contactDetails.message}
          </Typography>
        </Box>

        <Typography
          variant="h5"
          gutterBottom>
          Edit Contact Details
        </Typography>
        <form onSubmit={handleSubmit}>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="Name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              variant="outlined"
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="Email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              variant="outlined"
              type="email"
            />
          </Box>
          <Box sx={{ marginBottom: 2 }}>
            <TextField
              fullWidth
              label="Message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              variant="outlined"
              multiline
              rows={4}
            />
          </Box>
          <Box textAlign="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large">
              Save
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}
