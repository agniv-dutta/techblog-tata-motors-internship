import React from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

const ProtectedRoute = ({ children, requiredRole = 'employee' }) => {
  const { isAuthenticated, isEmployee, isAdmin } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (requiredRole === 'admin' && !isAdmin) {
    return <Navigate to="/" replace />;
  }

  if (requiredRole === 'employee' && !isEmployee) {
    return <Navigate to="/login" replace />;
  }

  return children;
};

export default ProtectedRoute;
