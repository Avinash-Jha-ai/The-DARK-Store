import React from 'react';

const Skeleton = ({ width, height, borderRadius, className = "", dark = false }) => {
  const baseClass = dark ? "skeleton-dark" : "skeleton";
  
  return (
    <div 
      className={`${baseClass} ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || '1rem', 
        borderRadius: borderRadius || '0px'
      }}
    />
  );
};

export const ProductCardSkeleton = () => (
  <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
    <Skeleton height="450px" />
    <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
      <Skeleton width="60%" height="20px" />
      <Skeleton width="40%" height="16px" />
    </div>
  </div>
);

export default Skeleton;
