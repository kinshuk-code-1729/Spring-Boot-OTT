import React from 'react';

const LoadingSpinner = ({ size = 'medium', text = 'Loading...' }) => {
  const sizeClasses = {
    small: 'w-4 h-4',
    medium: 'w-8 h-8',
    large: 'w-12 h-12',
  };

  return (
    <div className="flex flex-col items-center justify-center p-8">
      <div className={`${sizeClasses[size]} border-2 border-netflix-red border-t-transparent rounded-full animate-spin`}></div>
      {text && (
        <p className="text-gray-400 text-sm mt-4 animate-pulse">{text}</p>
      )}
    </div>
  );
};

export default LoadingSpinner;
