// src/components/ProtectedRoute.jsx

import { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
  const { isLogin, userData } = useContext(AppContext);

  if (!isLogin) {
    return <Navigate to="/login" />;
  }

  if (!userData?.isAccountVerified) {
    return <Navigate to="/verify-email" />;
  }

  return children;
};

export default ProtectedRoute;
