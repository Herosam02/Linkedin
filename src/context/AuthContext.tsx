import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { User } from '../types';

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<boolean>;
  signup: (email: string, password: string, name: string, profileImage: string) => Promise<boolean>;
  logout: () => void;
  updateUser: (userData: Partial<User>) => void;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const savedUser = localStorage.getItem('linkedinUser');
    if (savedUser) {
      try {
        setUser(JSON.parse(savedUser));
      } catch (error) {
        console.error('Error parsing saved user:', error);
        localStorage.removeItem('linkedinUser');
      }
    }
  }, []);

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      // Get all users from localStorage
      const users = JSON.parse(localStorage.getItem('linkedinUsers') || '[]');
      
      // Find user by email
      const foundUser = users.find((u: User) => u.email.toLowerCase() === email.toLowerCase());
      
      if (foundUser) {
        // Set user as logged in
        setUser(foundUser);
        localStorage.setItem('linkedinUser', JSON.stringify(foundUser));
        return true;
      }
      
      // If no user found, return false
      return false;
    } catch (error) {
      console.error('Login error:', error);
      return false;
    }
  };

  const signup = async (email: string, password: string, name: string, profileImage: string): Promise<boolean> => {
    try {
      // Get existing users
      const users = JSON.parse(localStorage.getItem('linkedinUsers') || '[]');
      
      // Check if user already exists
      if (users.find((u: User) => u.email.toLowerCase() === email.toLowerCase())) {
        return false;
      }

      // Create new user
      const newUser: User = {
        id: Date.now().toString(),
        name,
        email: email.toLowerCase(),
        headline: 'Professional',
        profileImage,
        location: 'Global',
        connections: 0,
        about: '',
        experience: [],
        education: [],
        skills: []
      };

      // Add to users array
      users.push(newUser);
      localStorage.setItem('linkedinUsers', JSON.stringify(users));
      
      // Set as current user
      setUser(newUser);
      localStorage.setItem('linkedinUser', JSON.stringify(newUser));
      
      return true;
    } catch (error) {
      console.error('Signup error:', error);
      return false;
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('linkedinUser');
  };

  const updateUser = (userData: Partial<User>) => {
    if (user) {
      const updatedUser = { ...user, ...userData };
      setUser(updatedUser);
      localStorage.setItem('linkedinUser', JSON.stringify(updatedUser));
      
      // Update in users array
      try {
        const users = JSON.parse(localStorage.getItem('linkedinUsers') || '[]');
        const userIndex = users.findIndex((u: User) => u.id === user.id);
        if (userIndex !== -1) {
          users[userIndex] = updatedUser;
          localStorage.setItem('linkedinUsers', JSON.stringify(users));
        }
      } catch (error) {
        console.error('Error updating user in users array:', error);
      }
    }
  };

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
};