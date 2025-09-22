import React, { createContext, useContext, useState, useEffect } from 'react';
import { createTheme } from '@mui/material/styles';

const ThemeContext = createContext();

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export const ThemeProvider = ({ children }) => {
  const [isDarkMode, setIsDarkMode] = useState(() => {
    // Check localStorage first, then system preference
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme) {
      return savedTheme === 'dark';
    }
    return window.matchMedia('(prefers-color-scheme: dark)').matches;
  });

  useEffect(() => {
    // Save theme preference to localStorage
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    // Set data-theme attribute for CSS variables
    document.documentElement.setAttribute('data-theme', isDarkMode ? 'dark' : 'light');
  }, [isDarkMode]);

  useEffect(() => {
    // Listen for system theme changes
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = (e) => {
      // Only update if user hasn't manually set a preference
      if (!localStorage.getItem('theme')) {
        setIsDarkMode(e.matches);
      }
    };

    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  const theme = createTheme({
    palette: {
      mode: isDarkMode ? 'dark' : 'light',
      primary: {
        main: isDarkMode ? '#60a5fa' : '#1e3a8a',
        light: isDarkMode ? '#93c5fd' : '#3b82f6',
        dark: isDarkMode ? '#3b82f6' : '#1e40af',
        contrastText: isDarkMode ? '#000' : '#fff',
      },
      secondary: {
        main: isDarkMode ? '#fbbf24' : '#f59e0b',
        light: isDarkMode ? '#fcd34d' : '#fbbf24',
        dark: isDarkMode ? '#d97706' : '#d97706',
        contrastText: isDarkMode ? '#000' : '#fff',
      },
      background: {
        default: isDarkMode ? '#0f172a' : '#ffffff',
        paper: isDarkMode ? '#1e293b' : '#f8fafc',
      },
      text: {
        primary: isDarkMode ? '#f1f5f9' : '#0f172a',
        secondary: isDarkMode ? '#cbd5e1' : '#64748b',
      },
      divider: isDarkMode ? '#334155' : '#e2e8f0',
    },
    typography: {
      fontFamily: '"Inter", "Roboto", "Helvetica", "Arial", sans-serif',
      h1: {
        fontWeight: 700,
        fontSize: '2.5rem',
      },
      h2: {
        fontWeight: 600,
        fontSize: '2rem',
      },
      h3: {
        fontWeight: 600,
        fontSize: '1.5rem',
      },
      h4: {
        fontWeight: 500,
        fontSize: '1.25rem',
      },
      h5: {
        fontWeight: 500,
        fontSize: '1.125rem',
      },
      h6: {
        fontWeight: 500,
        fontSize: '1rem',
      },
    },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: '8px',
            textTransform: 'none',
            fontWeight: 500,
            padding: '8px 16px',
          },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
            boxShadow: isDarkMode 
              ? '0 4px 6px -1px rgba(0, 0, 0, 0.3), 0 2px 4px -1px rgba(0, 0, 0, 0.2)'
              : '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          },
        },
      },
      MuiPaper: {
        styleOverrides: {
          root: {
            borderRadius: '12px',
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: {
            backgroundColor: isDarkMode ? '#1e293b' : '#ffffff',
            color: isDarkMode ? '#f1f5f9' : '#0f172a',
            boxShadow: isDarkMode 
              ? '0 1px 3px 0 rgba(0, 0, 0, 0.3)'
              : '0 1px 3px 0 rgba(0, 0, 0, 0.1)',
          },
        },
      },
    },
  });

  const value = {
    isDarkMode,
    toggleTheme,
    theme,
  };

  return (
    <ThemeContext.Provider value={value}>
      {children}
    </ThemeContext.Provider>
  );
};
