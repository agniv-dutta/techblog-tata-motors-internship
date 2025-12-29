import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const savedUser = localStorage.getItem('currentUser');
    return savedUser ? JSON.parse(savedUser) : null;
  });

  const [users, setUsers] = useState(() => {
    const savedUsers = localStorage.getItem('users');
    return savedUsers
      ? JSON.parse(savedUsers)
      : [
          {
            id: 1,
            email: 'employee@tatamotors.com',
            password: 'password123', // Demo only - never store plaintext in production
            name: 'Tata Employee',
            role: 'employee',
          },
          {
            id: 2,
            email: 'admin@tatamotors.com',
            password: 'admin123',
            name: 'Tata Admin',
            role: 'admin',
          },
        ];
  });

  const signup = (email, password, name) => {
    const userExists = users.find((u) => u.email === email);
    if (userExists) {
      throw new Error('Email already registered');
    }

    const newUser = {
      id: users.length + 1,
      email,
      password,
      name,
      role: 'employee',
    };

    const updatedUsers = [...users, newUser];
    setUsers(updatedUsers);
    localStorage.setItem('users', JSON.stringify(updatedUsers));

    setUser(newUser);
    localStorage.setItem('currentUser', JSON.stringify(newUser));

    return newUser;
  };

  const login = (email, password) => {
    const foundUser = users.find((u) => u.email === email && u.password === password);
    if (!foundUser) {
      throw new Error('Invalid email or password');
    }

    setUser(foundUser);
    localStorage.setItem('currentUser', JSON.stringify(foundUser));

    return foundUser;
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('currentUser');
  };

  const isAuthenticated = !!user;
  const isEmployee = user && (user.role === 'employee' || user.role === 'admin');
  const isAdmin = user && user.role === 'admin';

  return (
    <AuthContext.Provider value={{ user, login, signup, logout, isAuthenticated, isEmployee, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within AuthProvider');
  }
  return context;
};
