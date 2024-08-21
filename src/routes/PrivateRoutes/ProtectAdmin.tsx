import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

// Define the type for the props
interface ProtectLoginProps {
  children: ReactNode;
}

const ProtectLogin: React.FC<ProtectLoginProps> = ({ children }) => {
  const isLoggedIn = useSelector((state: rootState) => state.admin.adminLogin);
  const navigate = useNavigate();

  useEffect(() => {
    if (!isLoggedIn) {
      navigate('/admin/login');  // Redirect to login if not logged in
    }
  }, [isLoggedIn, navigate]);

  // If the user is logged in, render the children components
  if (isLoggedIn) {
    return <>{children}</>;
  }

  // If not logged in, render nothing (the user is being redirected)
  return null;
};

export default ProtectLogin;
