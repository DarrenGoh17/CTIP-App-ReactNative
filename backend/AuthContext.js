import React, { createContext, useState } from 'react';

// Create the context
export const AuthContext = createContext();

// Create the provider component
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState(null);
  const [username, setUsername] = useState(null);
  const [userId, setUserId] = useState(null);

  // Login function that accepts the user's role and username
  const login = (role, username, id) => {
    setUserId(id);
    setIsAuthenticated(true);
    setUserRole(role);
    setUsername(username);
  };

  // Logout function to clear authentication, role, and username
  const logout = () => {
    setUserId(null);
    setIsAuthenticated(false);
    setUserRole(null);
    setUsername(null);
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, userRole, username, userId, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
