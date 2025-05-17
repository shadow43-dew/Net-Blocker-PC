import React from 'react';
import { Play, Tv } from 'lucide-react';

interface GoLiveLogoProps {
  className?: string;
}

const GoLiveLogo: React.FC<GoLiveLogoProps> = ({ className = 'h-6 w-6' }) => {
  return (
    <div className={`relative flex items-center justify-center bg-gradient-to-br from-purple-600 to-indigo-600 rounded-lg animate-pulse-slow ${className}`}>
      <Tv className="absolute" size={16} />
      <Play className="absolute" size={10} />
    </div>
  );
};

export default GoLiveLogo;