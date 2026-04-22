import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { adminLogin, resetAuthState } from '../state/adminAuthSlice';
import { motion } from 'framer-motion';
import { Lock, Mail, Loader2, AlertCircle } from 'lucide-react';

const AdminLoginPage = () => {
  const [formData, setFormData] = useState({ email: '', password: '' });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user, isLoading, isError, isSuccess, message } = useSelector((state) => state.adminAuth);

  useEffect(() => {
    if (isSuccess || (user && user.role === 'admin')) {
      navigate('/');
    }
    return () => {
      dispatch(resetAuthState());
    };
  }, [isSuccess, user, navigate, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = (e) => {
    e.preventDefault();
    dispatch(adminLogin(formData));
  };

  return (
    <div style={{
      height: '100vh',
      display: 'flex',
      alignItems: 'center',
      justifyContent: 'center',
      backgroundColor: '#f5f6f7'
    }}>
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        style={{
          width: '100%',
          maxWidth: '400px',
          padding: '40px',
          backgroundColor: 'white',
          boxShadow: '0 20px 25px -5px rgba(0, 0, 0, 0.1)',
          border: '1px solid #e2e8f0'
        }}
      >
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '1.8rem', letterSpacing: '0.2em', marginBottom: '8px' }}>The DARK Store</h1>
          <p style={{ fontSize: '0.7rem', color: 'var(--admin-primary)', letterSpacing: '0.1em', fontWeight: '700' }}>ADMIN PORTAL</p>
        </div>

        <form onSubmit={onSubmit}>
          <div style={{ marginBottom: '24px' }}>
            <label style={labelStyle}>EMAIL ADDRESS</label>
            <div style={{ position: 'relative' }}>
              <Mail size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="email" 
                name="email" 
                value={formData.email} 
                onChange={onChange} 
                placeholder="admin@thedarkstore.com" 
                required 
                style={inputStyle} 
              />
            </div>
          </div>

          <div style={{ marginBottom: '32px' }}>
            <label style={labelStyle}>PASSWORD</label>
            <div style={{ position: 'relative' }}>
              <Lock size={18} style={{ position: 'absolute', left: '12px', top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
              <input 
                type="password" 
                name="password" 
                value={formData.password} 
                onChange={onChange} 
                placeholder="••••••••" 
                required 
                style={inputStyle} 
              />
            </div>
          </div>

          {isError && (
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              color: '#ef4444', 
              fontSize: '0.8rem', 
              marginBottom: '20px',
              backgroundColor: '#fef2f2',
              padding: '12px',
              border: '1px solid #fee2e2'
            }}>
              <AlertCircle size={16} />
              <span>{message}</span>
            </div>
          )}

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '14px',
              backgroundColor: 'var(--admin-primary)',
              color: 'white',
              border: 'none',
              fontWeight: '700',
              fontSize: '0.9rem',
              letterSpacing: '0.1em',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              transition: 'all 0.2s'
            }}
          >
            {isLoading ? <Loader2 size={20} className="animate-spin" /> : 'SECURE LOGIN'}
          </button>
        </form>

        <p style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.75rem', color: '#94a3b8' }}>
          Restricted access for authorized The DARK Store personnel only.
        </p>
      </motion.div>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  fontSize: '0.65rem',
  fontWeight: '700',
  letterSpacing: '0.1em',
  color: '#64748b',
  marginBottom: '8px'
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px 12px 42px',
  border: '1px solid #e2e8f0',
  outline: 'none',
  fontSize: '0.9rem',
  backgroundColor: '#f8fafc',
  transition: 'all 0.2s',
};

export default AdminLoginPage;
