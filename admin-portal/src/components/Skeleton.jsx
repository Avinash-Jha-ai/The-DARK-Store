import React from 'react';

const Skeleton = ({ width, height, borderRadius, className = "" }) => {
  return (
    <div 
      className={`skeleton ${className}`}
      style={{ 
        width: width || '100%', 
        height: height || '1rem', 
        borderRadius: borderRadius || '0px'
      }}
    />
  );
};

export const TableRowSkeleton = ({ columns = 5 }) => (
  <tr>
    {Array(columns).fill(0).map((_, i) => (
      <td key={i} style={{ padding: '16px' }}>
        <Skeleton height="20px" width={i === 0 ? "40px" : "100%"} />
      </td>
    ))}
  </tr>
);

export const OrderCardSkeleton = () => (
  <div style={{ backgroundColor: '#1e293b', borderRadius: '20px', border: '1px solid #334155', padding: '24px', display: 'flex', flexDirection: 'column', gap: '20px' }}>
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
      <div style={{ display: 'flex', gap: '15px', alignItems: 'center' }}>
        <Skeleton width="40px" height="40px" borderRadius="12px" />
        <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
          <Skeleton width="120px" height="16px" />
          <Skeleton width="80px" height="12px" />
        </div>
      </div>
      <Skeleton width="100px" height="30px" borderRadius="12px" />
    </div>
    <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
       <div style={{ display: 'flex', flexDirection: 'column', gap: '15px' }}>
          <Skeleton width="100px" height="14px" />
          <Skeleton height="80px" borderRadius="14px" />
          <Skeleton height="50px" borderRadius="14px" />
       </div>
       <div style={{ display: 'flex', flexDirection: 'column', gap: '20px', borderLeft: '1px solid #334155', paddingLeft: '30px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Skeleton width="80px" height="12px" />
            <Skeleton width="120px" height="16px" />
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
            <Skeleton width="100px" height="12px" />
            <Skeleton height="40px" />
          </div>
       </div>
    </div>
  </div>
);

export default Skeleton;
