import React from 'react';

interface LogoProps {
  className?: string;
  size?: 'sm' | 'md' | 'lg';
}

export default function Logo({ className = '', size = 'md' }: LogoProps) {
  const sizeClasses = {
    sm: 'h-6',
    md: 'h-8',
    lg: 'h-12'
  };

  return (
    <img
      src="/assets/generated/notflix-logo.dim_300x100.png"
      alt="Notflix"
      className={`${sizeClasses[size]} w-auto ${className}`}
    />
  );
}
