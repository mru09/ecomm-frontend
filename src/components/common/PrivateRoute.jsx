// src/components/common/PrivateRoute.jsx

import React from 'react';
import { Navigate } from 'react-router-dom';
import { isLoggedIn, getRole } from '../../utils/auth';

export default function PrivateRoute({ children, allowedRoles }) {
  const loggedIn = isLoggedIn();
  const role = getRole();

  if (!loggedIn || !allowedRoles.includes(role)) {
    return <Navigate to="/login" replace />;
  }

  return children;
}
