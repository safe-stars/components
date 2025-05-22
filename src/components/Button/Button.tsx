import { ReactNode } from 'react';
import './styles.css';

interface ButtonProps {
  children: ReactNode;
  onClick?: () => void;
  variant?: 'primary' | 'secondary' | 'outlined';
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  disabled?: boolean;
  size?: 'md' | 'lg';
}

const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  size = 'md'
}: ButtonProps) => {
  const variantClasses = {
    primary: 'bg-primary hover:bg-accent text-white',
    secondary: 'bg-dark-700 hover:bg-dark-600 text-white',
    outlined: 'border-2 border-accent hover:bg-accent text-white'
  };

  const sizeClasses = {
    md: 'px-6 py-3',
    lg: 'py-3 md:py-5 px-6 md:px-10 text-lg md:text-[22px]'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={`btn ${variantClasses[variant]} ${className} ${disabled ? 'opacity-50 cursor-not-allowed pointer-events-none' : ''} ${sizeClasses[size]}`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;