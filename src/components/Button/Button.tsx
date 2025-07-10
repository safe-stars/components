import { ReactNode } from 'react';
import { clsx } from 'clsx';
import styles from './styles.module.css';

export interface ButtonCustomStyles {
  'button'?: string;
}

export interface ButtonProps {
  type?: 'button' | 'submit' | 'reset';
  variant?: 'primary' | 'secondary' | 'outlined';
  className?: string;
  disabled?: boolean;
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  onClick?: () => void;
  custom_styles?: ButtonCustomStyles;
}

const Button = ({
  children,
  onClick,
  variant = 'primary',
  className = '',
  type = 'button',
  disabled = false,
  size = 'md',
  custom_styles
}: ButtonProps) => {
  const variantClasses = {
    primary: 'bg-primary hover:bg-accent text-white',
    secondary: 'bg-dark-700 hover:bg-dark-600 text-white',
    outlined: 'border-2 border-accent hover:bg-accent text-white'
  };

  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'py-3 md:py-5 px-6 md:px-10 text-lg md:text-[22px]'
  };

  return (
    <button
      type={type}
      onClick={onClick}
      className={clsx(
        styles.btn,
        variantClasses[variant],
        sizeClasses[size],
        {
          'opacity-50 cursor-not-allowed pointer-events-none': disabled
        },
        className,
        custom_styles?.['button']
      )}
      disabled={disabled}
    >
      {children}
    </button>
  );
};

export default Button;