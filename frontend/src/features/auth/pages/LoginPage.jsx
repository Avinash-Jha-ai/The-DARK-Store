import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { login, reset } from '../state/authSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, Mail, Lock, Loader2 } from 'lucide-react';

const LoginPage = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
  });

  const { email, password } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
      // Handle error (e.g., toast notification)
      console.error(message);
    }

    if (isSuccess || user) {
      navigate('/');
    }

    dispatch(reset());
  }, [user, isError, isSuccess, message, navigate, dispatch]);

  const onChange = (e) => {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const userData = { email, password };
    dispatch(login(userData));
  };

  return (
    <div className="login-container" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Left Side: Visual */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="login-visual" 
        style={{ 
          flex: 1, 
          background: 'url("https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1200&auto=format&fit=crop&q=80") center/cover no-repeat',
          display: 'none', // Hidden on mobile, shown on desktop
        }}
      >
        <div style={{ 
          width: '100%', 
          height: '100%', 
          background: 'rgba(0,0,0,0.2)', 
          padding: '60px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-end',
          color: 'white'
        }}>
          <motion.h2 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.6 }}
            style={{ fontSize: '3rem', margin: 0, letterSpacing: '0.1em' }}
          >
            The DARK Store
          </motion.h2>
          <motion.p
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.6 }}
            style={{ fontSize: '1rem', fontStyle: 'italic', maxWidth: '300px' }}
          >
            Defining the essence of modern luxury since 1994.
          </motion.p>
        </div>
      </motion.div>

      {/* Right Side: Form */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="login-form-side"
        style={{ 
          flex: 1, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center', 
          padding: '40px',
          backgroundColor: 'var(--color-surface-container-lowest)'
        }}
      >
        <div style={{ width: '100%', maxWidth: '400px' }}>
          <header style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Sign In</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              Welcome back. Enter your credentials to access your store.
            </p>
          </header>

          <form onSubmit={onSubmit}>
            <div style={{ marginBottom: '24px' }}>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '0', top: '12px', color: 'var(--color-gold)' }} />
                <input
                  type="email"
                  name="email"
                  value={email}
                  placeholder="Email Address"
                  onChange={onChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 0 12px 32px',
                    border: 'none',
                    borderBottom: '1px solid #ddd',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: '1rem',
                  }}
                />
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '0', top: '12px', color: 'var(--color-gold)' }} />
                <input
                  type="password"
                  name="password"
                  value={password}
                  placeholder="Password"
                  onChange={onChange}
                  required
                  style={{
                    width: '100%',
                    padding: '12px 0 12px 32px',
                    border: 'none',
                    borderBottom: '1px solid #ddd',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: '1rem',
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '32px' }}>
              <label style={{ fontSize: '0.85rem', color: 'var(--color-text-secondary)', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}>
                <input type="checkbox" style={{ accentColor: 'var(--color-gold)' }} />
                Remember me
              </label>
              <a href="#" style={{ fontSize: '0.85rem', color: 'var(--color-gold)' }}>Forgot Password?</a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              style={{
                width: '100%',
                padding: '16px',
                backgroundColor: 'var(--color-on-background)',
                color: 'white',
                fontSize: '1rem',
                fontWeight: '600',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                transition: 'var(--transition-fast)',
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
              onMouseEnter={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = 'var(--color-primary)'; }}
              onMouseLeave={(e) => { if(!isLoading) e.currentTarget.style.backgroundColor = 'var(--color-on-background)'; }}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'SIGN IN'}
              {!isLoading && <ArrowRight size={18} />}
            </button>
          </form>

          <footer style={{ marginTop: '32px', textAlign: 'center', fontSize: '0.9rem' }}>
            <span style={{ color: 'var(--color-text-secondary)' }}>Don't have an account? </span>
            <Link to="/register" style={{ color: 'var(--color-gold)', fontWeight: '600' }}>Create Account</Link>
          </footer>
        </div>
      </motion.div>

      {/* Desktop Responsive styles */}
      <style>{`
        @media (min-width: 1024px) {
          .login-visual { display: flex !important; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default LoginPage;
