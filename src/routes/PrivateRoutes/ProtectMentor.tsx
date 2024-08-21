import React, { ReactNode, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { rootState } from '../../store/store';
import { useNavigate } from 'react-router-dom';

interface ProtectMentorLoginProps {
  children: ReactNode;
}

const ProtectMentorLogin: React.FC<ProtectMentorLoginProps> = ({ children }) => {
  const isMentorLoggedIn = useSelector((state: rootState) => state.mentor.mentorLogin); // Assuming mentorLogin is in state
  const navigate = useNavigate();

  useEffect(() => {
    if (!isMentorLoggedIn) {
      navigate('/mentor-login'); // Redirect to mentor login page if not logged in
    }
  }, [isMentorLoggedIn, navigate]);

  // If the mentor is logged in, render the children components
  if (isMentorLoggedIn) {
    return <>{children}</>;
  }

  // If not logged in, render nothing (the user is being redirected)
  return null;
};

export default ProtectMentorLogin;
