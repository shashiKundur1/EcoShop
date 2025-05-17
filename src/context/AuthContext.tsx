import React, { createContext, useState, useEffect, useContext } from 'react';
import axios from 'axios';
import toast from 'react-hot-toast';

interface User {
  _id: string;
  name: string;
  email: string;
  isAdmin: boolean;
}

interface AuthContextType {
  user: User | null;
  loading: boolean;
  error: string | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => Promise<void>;
  updateProfile: (userData: { name?: string; email?: string; password?: string }) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

  // Check if user is logged in on initial load
  useEffect(() => {
    const fetchUser = async () => {
      try {
        const { data } = await axios.get(`${API_URL}/users/profile`, {
          withCredentials: true
        });
        setUser(data);
      } catch (err) {
        // User not logged in, that's okay
        console.log('User not logged in');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [API_URL]);

  // Login user
  const login = async (email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await axios.post(
        `${API_URL}/users/login`,
        { email, password },
        { withCredentials: true }
      );
      
      setUser(data);
      toast.success('Login successful!');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Login failed';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Register user
  const register = async (name: string, email: string, password: string) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await axios.post(
        `${API_URL}/users/register`,
        { name, email, password },
        { withCredentials: true }
      );
      
      setUser(data);
      toast.success('Registration successful!');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Registration failed';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Logout user
  const logout = async () => {
    try {
      setLoading(true);
      await axios.post(
        `${API_URL}/users/logout`,
        {},
        { withCredentials: true }
      );
      setUser(null);
      toast.success('Logged out successfully');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Logout failed';
      setError(message);
      toast.error(message);
    } finally {
      setLoading(false);
    }
  };

  // Update user profile
  const updateProfile = async (userData: { name?: string; email?: string; password?: string }) => {
    try {
      setLoading(true);
      setError(null);
      
      const { data } = await axios.put(
        `${API_URL}/users/profile`,
        userData,
        { withCredentials: true }
      );
      
      setUser(data);
      toast.success('Profile updated successfully!');
    } catch (err: any) {
      const message = err.response?.data?.message || 'Profile update failed';
      setError(message);
      toast.error(message);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        error,
        login,
        register,
        logout,
        updateProfile
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};