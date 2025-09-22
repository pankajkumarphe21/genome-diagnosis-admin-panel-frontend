import React, { useState } from 'react';
import {
  AppBar,
  Box,
  Toolbar,
  IconButton,
  Typography,
  Menu,
  MenuItem,
  Container,
  Avatar,
  Tooltip,
  Button,
  Divider
} from '@mui/material';
import {
  Menu as MenuIcon,
  Dashboard,
  Article,
  Work,
  Event,
  Newspaper,
  Business,
  Group,
  RateReview,
  ContactSupport,
  AccountCircle,
  Settings,
  Logout,
  Science
} from '@mui/icons-material';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import ThemeToggle from '../ThemeToggle';
import { useTheme as useCustomTheme } from '../../context/ThemeContext';

const adminPages = [
  { text: "Dashboard", link: "/admin", icon: <Dashboard /> },
  { text: "Blogs", link: "/admin/blogs" },
  { text: "Careers", link: "/admin/careers" },
  { text: "Events", link: "/admin/events" },
  { text: "News", link: "/admin/news" },
  { text: "Partners", link: "/admin/partners" },
  { text: "Team", link: "/admin/team" },
  { text: "Testimonials", link: "/admin/testimonials" },
  { text: "Contact Us", link: "/admin/contact-us" }
];

const settings = [
  { text: "Profile", icon: <AccountCircle />, action: "profile" },
  { text: "Settings", icon: <Settings />, action: "settings" },
  { text: "Logout", icon: <Logout />, action: "logout" }
];

function AdminHeader() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [anchorElNav, setAnchorElNav] = useState(null);
  const [anchorElUser, setAnchorElUser] = useState(null);

  const handleOpenNavMenu = (event) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleOpenUserMenu = (event) => {
    setAnchorElUser(event.currentTarget);
  };

  const handleCloseNavMenu = (link) => {
    navigate(link);
    setAnchorElNav(null);
  };

  const handleCloseUserMenu = (action) => {
    if (action === 'logout') {
      logout();
      navigate('/');
    } else if (action === 'profile') {
      // Handle profile action
      console.log('Profile clicked');
    } else if (action === 'settings') {
      // Handle settings action
      console.log('Settings clicked');
    }
    setAnchorElUser(null);
  };

  const handleGoToPublic = () => {
    navigate('/');
  };
  const { isDarkMode } = useCustomTheme();

  return (
    <AppBar 
      position="static" 
      sx={{ 
        backgroundColor: 'background.paper',
        color: 'text.primary',
        boxShadow: 2
      }}
    >
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <Science sx={{ display: { xs: "none", md: "flex" }, mr: 1, color: 'secondary.main' }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "none", md: "flex" },
              fontFamily: "Roboto, sans-serif",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
              cursor: 'pointer'
            }}
          >
            Admin
          </Typography>

          {/* Mobile Navigation Menu */}
          <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
            <IconButton
              size="large"
              aria-label="admin navigation menu"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
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
              sx={{ display: { xs: "block", md: "none" } }}
            >
              {adminPages.map((page) => (
                <MenuItem
                  key={page.text}
                  onClick={() => handleCloseNavMenu(page.link)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {page.icon}
                    <Typography>{page.text}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          
          {/* Mobile Logo */}
          <Science sx={{ display: { xs: "flex", md: "none" }, mr: 1, color: 'secondary.main' }} />
          <Typography
            variant="h6"
            noWrap
            component="div"
            sx={{
              mr: 2,
              display: { xs: "flex", md: "none" },
              flexGrow: 1,
              fontFamily: "Roboto, sans-serif",
              fontWeight: 700,
              letterSpacing: ".1rem",
              color: "inherit",
            }}
          >
            ADMIN
          </Typography>
          
          {/* Desktop Navigation */}
          <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
            {adminPages.map((page) => (
              <Button
                key={page.text}
                onClick={() => handleCloseNavMenu(page.link)}
                startIcon={page.icon}
                sx={{ 
                  my: 2, 
                  color: `${isDarkMode ? 'white' : 'black'}`,
                  display: "block",
                  mx: 1,
                  '&:hover': {
                    backgroundColor: 'rgba(255,255,255,0.1)',
                    borderRadius: 1
                  }
                }}
              >
                {page.text}
              </Button>
            ))}
          </Box>
          
          {/* Right Side Actions */}
          <Box sx={{ flexGrow: 0, display: 'flex', alignItems: 'center', gap: 2 }}>
            <ThemeToggle />
            <Button
              variant="outlined"
              onClick={handleGoToPublic}
              sx={{
                color: 'secondary.main',
                borderColor: 'secondary.main',
                '&:hover': {
                  borderColor: '#f59e0b',
                  backgroundColor: 'rgba(251, 191, 36, 0.1)'
                }
              }}
            >
              View Public Site
            </Button>
            
            <Tooltip title="Open settings">
              <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                <Avatar
                  alt={user?.name || 'Admin'}
                  sx={{ 
                    backgroundColor: 'secondary.main',
                    color: 'primary.main',
                    fontWeight: 'bold'
                  }}
                >
                  {user?.avatar || 'A'}
                </Avatar>
              </IconButton>
            </Tooltip>
            
            <Menu
              sx={{ mt: "45px" }}
              id="menu-appbar"
              anchorEl={anchorElUser}
              anchorOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              keepMounted
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
              open={Boolean(anchorElUser)}
              onClose={() => setAnchorElUser(null)}
            >
              <Box sx={{ px: 2, py: 1 }}>
                <Typography variant="subtitle2" color="text.secondary">
                  {user?.name || 'Administrator'}
                </Typography>
                <Typography variant="caption" color="text.secondary">
                  {user?.email || 'admin@crystalis.com'}
                </Typography>
              </Box>
              <Divider />
              {settings.map((setting) => (
                <MenuItem
                  key={setting.text}
                  onClick={() => handleCloseUserMenu(setting.action)}
                >
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    {setting.icon}
                    <Typography>{setting.text}</Typography>
                  </Box>
                </MenuItem>
              ))}
            </Menu>
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default AdminHeader;


