/** @format */

import React, { useState } from 'react';
import {
  AppBar,
  Toolbar,
  Typography,
  Button,
  IconButton,
  Box,
  Container,
  useTheme,
  useMediaQuery,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Menu,
  MenuItem
} from '@mui/material';
import Science from "@mui/icons-material/Science";
import {
  Menu as MenuIcon,
  Home,
  Article,
  Work,
  Event,
  Newspaper,
  Business,
  Group,
  RateReview,
  ContactSupport
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import ThemeToggle from '../ThemeToggle';

const pages = [
  { text: "Home", link: "/" },
  { text: "Team", link: "/team" },
  { text: "News", link: "/news" },
  { text: "Events", link: "/events" },
  { text: "Partners", link: "/partners" },
  { text: "Careers", link: "/careers" },
  { text: "Contact", link: "/contact-us" },
  { text: "Blogs", link: "/blogs" }
];

function PublicHeader() {
  const navigate = useNavigate();
  const [anchorElNav, setAnchorElNav] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = (link) => {
    navigate(link);
    setAnchorElNav(null);
  };

  const handleAdminLogin = () => {
    navigate('/login');
  };

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: 1
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Science sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: '#fbbf24' }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Roboto, sans-serif",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            CRYSTALIS HEALTH
          </Typography>

          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit">
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "left",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "left",
              }}
              open={Boolean(anchorElNav)}
              onClose={() => setAnchorElNav(null)}
              sx={{ display: { xs: "block", md: "none" } }}>
              {pages.map((page) => (
                <MenuItem
                  key={page.text}
                  onClick={() => handleCloseNavMenu(page.link)}>
                  <Typography sx={{ textAlign: "center" }}>{page.text}</Typography>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          <Science sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: '#fbbf24' }} />
          <Typography
            variant="h6"
            noWrap
            component="a"
            href="/"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Roboto, sans-serif",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              textDecoration: "none",
              cursor: 'pointer'
            }}
            onClick={() => navigate('/')}
          >
            CRYSTALIS
          </Typography>
          
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {pages.map((page) => (
              <Button
                key={page.text}
                onClick={() => handleCloseNavMenu(page.link)}
                sx={{ 
                  my: 2, 
                  color: "green", 
                  display: "block",
                  mx: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: 1
                  }
                }}>
                {page.text}
              </Button>
            ))}
          </Box>
          
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 1 }}>
            <ThemeToggle />
            <Button
              variant="outlined"
              onClick={handleAdminLogin}
              sx={{
                color: '#fbbf24',
                borderColor: '#fbbf24',
                '&:hover': {
                  borderColor: '#f59e0b',
                  backgroundColor: 'rgba(251, 191, 36, 0.1)'
                }
              }}
            >
              Admin Login
            </Button>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default PublicHeader;


