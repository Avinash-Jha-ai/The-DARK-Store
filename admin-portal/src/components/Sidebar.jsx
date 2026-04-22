import React from 'react';
import { NavLink } from 'react-router-dom';
import { Package, ShoppingCart, LogOut, Plus } from 'lucide-react';
import { useDispatch } from 'react-redux';
import { logout } from '../features/auth/state/adminAuthSlice';

const Sidebar = () => {
  const dispatch = useDispatch();
  const menuItems = [
    { icon: <Package size={20} />, label: 'Inventory', path: '/inventory' },
    { icon: <Plus size={20} />, label: 'Launch Product', path: '/inventory/add' },
    { icon: <ShoppingCart size={20} />, label: 'Orders', path: '/orders' },
  ];

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <div className="sidebar" style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '60px', padding: '0 10px' }}>
        <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.5rem', letterSpacing: '0.2em' }}>The DARK Store</h1>
        <p style={{ fontSize: '0.6rem', color: 'var(--admin-primary)', letterSpacing: '0.1em' }}>ADMIN PORTAL</p>
      </div>

      <nav style={{ flex: 1 }}>
        <ul style={{ listStyle: 'none' }}>
          {menuItems.map((item) => (
            <li key={item.path} style={{ marginBottom: '8px' }}>
              <NavLink 
                to={item.path} 
                className={({ isActive }) => isActive ? 'active-link' : ''}
                style={({ isActive }) => ({
                  display: 'flex',
                  alignItems: 'center',
                  gap: '16px',
                  padding: '12px 16px',
                  color: isActive ? 'var(--admin-primary)' : '#94a3b8',
                  textDecoration: 'none',
                  fontSize: '0.9rem',
                  fontWeight: isActive ? '600' : '400',
                  transition: 'all 0.2s',
                  backgroundColor: isActive ? 'rgba(212, 175, 55, 0.1)' : 'transparent',
                })}
              >
                {item.icon}
                <span>{item.label}</span>
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>

      <div style={{ borderTop: '1px solid #334155', paddingTop: '20px' }}>
        <button 
          onClick={handleLogout}
          style={{ 
            display: 'flex', 
            alignItems: 'center', 
            gap: '16px', 
            width: '100%', 
            padding: '12px 16px', 
            color: '#ef4444', 
            background: 'none', 
            border: 'none', 
            cursor: 'pointer',
            fontSize: '0.9rem'
          }}
        >
          <LogOut size={20} />
          <span>Sign Out</span>
        </button>
      </div>

      <style>{`
        .active-link {
          border-right: 3px solid var(--admin-primary);
        }
      `}</style>
    </div>
  );
};

export default Sidebar;
