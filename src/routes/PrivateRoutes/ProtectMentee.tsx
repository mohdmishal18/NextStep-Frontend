import React, { ReactNode } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

// Define the type for the props
interface ProtectLoginProps {
  children: ReactNode;
}

const ProtectLogin: React.FC<ProtectLoginProps> = ({ children }) => {
  const status = useSelector((prevState: rootState) => prevState.mentee.menteeLogin);
  const navigate = useNavigate();

  React.useEffect(() => {
    if (!status) {
      navigate('/');
    }
  }, [status, navigate]);

  if (!status) {
    return <div>Redirecting...</div>; // You can customize this with a spinner or a more user-friendly message
  }

  return <>{children}</>;
};

export default ProtectLogin;
