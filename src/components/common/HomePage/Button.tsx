import React from 'react';

interface ButtonProps {
  children: React.ReactNode;
  variant: 'light' | 'primary';
}

const Button: React.FC<ButtonProps> = ({ children, variant }) => {
  const baseClasses = "px-4 py-3.5 rounded-[60px]";
  const variantClasses = {
    light: "bg-white",
    primary: "bg-blue"
  };

  return (
    <button className={`${baseClasses} ${variantClasses[variant]}`}>
      {children}
    </button>
  );
};

export default Button;