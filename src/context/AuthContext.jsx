import React, { createContext, useContext, useState, useEffect } from 'react';
import { postData, fetchDataWithAuth } from '../../apis/index.js';

const AuthContext = createContext();

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in (from localStorage)
    const savedUser = localStorage.getItem('user');
    const savedToken = localStorage.getItem('token');
    
    if (savedUser && savedToken) {
      // Verify token with backend
      verifyToken(savedToken);
    } else {
      setLoading(false);
    }
  }, []);

  const verifyToken = async (token) => {
    try {
      const data = await fetchDataWithAuth('admin/auth/verify', token);

      if (data && data.success) {
        setUser(data.data.user);
        setIsAuthenticated(true);
        localStorage.setItem('token', token);
      } else {
        // Token is invalid, clear storage
        localStorage.removeItem('user');
        localStorage.removeItem('token');
        setUser(null);
        setIsAuthenticated(false);
      }
    } catch (error) {
      console.error('Token verification failed:', error);
      // Clear storage on error
      localStorage.removeItem('user');
      localStorage.removeItem('token');
      setUser(null);
      setIsAuthenticated(false);
    } finally {
      setLoading(false);
    }
  };

  const login = async (email, password) => {
    try {
      const data = await postData('admin/auth/login', { email, password });

      if (data && data.success) {
        const { user: userData, token } = data.data;
        
        setUser(userData);
        setIsAuthenticated(true);
        
        // Save to localStorage
        localStorage.setItem('user', JSON.stringify(userData));
        localStorage.setItem('token', token);
        
        return { success: true, user: userData };
      } else {
        throw new Error(data?.message || 'Login failed');
      }
    } catch (error) {
      throw error;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('token');
      if (token) {
        // Call backend logout endpoint
        await postData('auth/logout', {}, { Authorization: `Bearer ${token}` });
      }
    } catch (error) {
      console.error('Logout API call failed:', error);
    } finally {
      // Always clear local state regardless of API call success
      setUser(null);
      setIsAuthenticated(false);
      localStorage.removeItem('user');
      localStorage.removeItem('token');
    }
  };

  const value = {
    user,
    isAuthenticated,
    loading,
    login,
    logout
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};

