import React from 'react';

const Logo: React.FC<{ className?: string; iconOnly?: boolean }> = ({ className = "", iconOnly = false }) => {
  return (
    <div className={`flex items-center ${className}`}>
      <img
        src="/assets/auragram-logo.png"
        alt="AuraGram Logo"
        className={iconOnly ? "w-24 h-24 object-contain" : "h-[120px] w-auto object-contain"}
      />
    </div>
  );
};

export default Logo;