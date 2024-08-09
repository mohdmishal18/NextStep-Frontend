import { useState } from 'react';
import { IconButton } from '@mui/material';
import Brightness4Icon from '@mui/icons-material/Brightness4';
import Brightness7Icon from '@mui/icons-material/Brightness7';

const ThemeToggle = () => {
  const [darkMode, setDarkMode] = useState(false);

  const handleDarkMode = () => {
    setDarkMode(!darkMode);
    document.body.classList.toggle('dark');
  };

  return (
    <IconButton onClick={handleDarkMode} color="inherit">
      <div className="bg-primary rounded-lg p-3 flex items-center justify-center">
        {darkMode ? (
          <Brightness7Icon className="text-white" style={{ fontSize: '40px' }} />
        ) : (
          <Brightness4Icon className="text-white" style={{ fontSize: '40px' }} />
        )}
      </div>
    </IconButton>
  );
};

export default ThemeToggle;
