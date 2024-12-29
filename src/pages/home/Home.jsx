/** @format */

import React from "react";
import { Container, Typography, Box, Button } from "@mui/material";

export default function Home() {
  return (
    <Container
      maxWidth="md"
      sx={{
        textAlign: "center",
        marginTop: 8,
        padding: 4,
        backgroundColor: "#f7faff",
        borderRadius: 4,
        boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.1)",
      }}>
      <Box sx={{ marginBottom: 4 }}>
        <img
          src="https://t4.ftcdn.net/jpg/08/89/42/07/360_F_889420781_UobiEdbMv2MC1VdjKnYSmKsgfY15cnwB.jpg"
          alt="Welcome Illustration"
          style={{ width: "100%", maxWidth: "300px", marginBottom: "20px" }}
        />
        <Typography
          variant="h4"
          sx={{
            fontWeight: "bold",
            marginBottom: 2,
            color: "#003366",
          }}>
          Welcome to The Platform
        </Typography>
        <Typography
          variant="body1"
          sx={{
            color: "gray",
            fontSize: "1.1rem",
          }}>

        </Typography>
      </Box>
      
    </Container>
  );
}
