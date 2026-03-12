import React, { createContext, useContext, useState, useEffect } from 'react';

interface User {
  username: string;
  role: 'farmer' | 'customer' | 'retailer' | 'admin';
  lastLogin: string;
}

interface AuthContextType {
  user: User | null;
  login: (username: string, role: User['role']) => void;
  logout: () => void;
  isAuthenticated: boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);

  useEffect(() => {
    const savedUser = localStorage.getItem('krishi_setu_user');
    if (savedUser) {
      setUser(JSON.parse(savedUser));
      setIsAuthenticated(true);
    }
  }, []);

  const login = (username: string, role: User['role']) => {
    const newUser: User = {
      username,
      role,
      lastLogin: new Date().toISOString(),
    };
    setUser(newUser);
    setIsAuthenticated(true);
    localStorage.setItem('krishi_setu_user', JSON.stringify(newUser));
  };

  const logout = () => {
    setUser(null);
    setIsAuthenticated(false);
    localStorage.removeItem('krishi_setu_user');
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
