import React from 'react';
import { IconButton, Tooltip, useTheme } from '@mui/material';
import { LightMode, DarkMode } from '@mui/icons-material';
import { useTheme as useCustomTheme } from '../context/ThemeContext';

const ThemeToggle = ({ size = 'medium', showTooltip = true }) => {
  const { isDarkMode, toggleTheme } = useCustomTheme();
  const theme = useTheme();

  const icon = isDarkMode ? <LightMode /> : <DarkMode />;
  const tooltipText = isDarkMode ? 'Switch to light mode' : 'Switch to dark mode';

  const button = (
    <IconButton
      onClick={toggleTheme}
      size={size}
      sx={{
        color: theme.palette.text.primary,
        '&:hover': {
          backgroundColor: theme.palette.action.hover,
        },
        transition: 'all 0.2s ease-in-out',
      }}
      aria-label={tooltipText}
    >
      {icon}
    </IconButton>
  );

  if (showTooltip) {
    return (
      <Tooltip title={tooltipText} arrow>
        {button}
      </Tooltip>
    );
  }

  return button;
};

export default ThemeToggle;
