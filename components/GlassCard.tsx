
import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const GlassCard: React.FC<GlassCardProps> = ({ children, className = '', onClick }) => {
  return (
    <div 
      onClick={onClick}
      className={`
        bg-white/5 
        backdrop-blur-xl 
        border border-white/10 
        shadow-2xl 
        rounded-3xl 
        transition-all 
        duration-300
        hover:bg-white/[0.08]
        hover:border-white/20
        ${className}
      `}
    >
      {children}
    </div>
  );
};
