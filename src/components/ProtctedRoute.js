import React from 'react';
import {Route, Navigate } from 'react-router-dom';

const ProtectedRoute = ({ element, isAuthenticated, redirectTo = '/login' }) => {
    return isAuthenticated ? element : <Navigate to={redirectTo} />;
  };

export default ProtectedRoute;
