import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate, Link } from 'react-router-dom';
import { register, reset } from '../state/authSlice';
import { motion } from 'framer-motion';
import { ArrowLeft, User, Mail, Lock, Loader2 } from 'lucide-react';

const RegisterPage = () => {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    confirmPassword: '',
  });

  const { name, email, password, confirmPassword } = formData;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { user, isLoading, isError, isSuccess, message } = useSelector(
    (state) => state.auth
  );

  useEffect(() => {
    if (isError) {
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
    if (password !== confirmPassword) {
      alert('Passwords do not match');
      return;
    }
    const userData = { fullname: name, email, password, role: 'buyer' };
    dispatch(register(userData));
  };

  return (
    <div className="register-container" style={{ display: 'flex', minHeight: '100vh' }}>
      {/* Form Side */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="register-form-side"
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
          <Link to="/login" style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--color-text-secondary)', marginBottom: '32px', fontSize: '0.9rem' }}>
            <ArrowLeft size={16} /> Back to Sign In
          </Link>
          
          <header style={{ marginBottom: '40px' }}>
            <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Create Account</h1>
            <p style={{ color: 'var(--color-text-secondary)', fontSize: '0.9rem' }}>
              Join The DARK Store. Experience curation like never before.
            </p>
          </header>

          <form onSubmit={onSubmit}>
             <div style={{ marginBottom: '24px' }}>
              <div style={{ position: 'relative' }}>
                <User size={18} style={{ position: 'absolute', left: '0', top: '12px', color: 'var(--color-gold)' }} />
                <input
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Full Name"
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

            <div style={{ marginBottom: '32px' }}>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '0', top: '12px', color: 'var(--color-gold)' }} />
                <input
                  type="password"
                  name="confirmPassword"
                  value={confirmPassword}
                  placeholder="Confirm Password"
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
                cursor: isLoading ? 'not-allowed' : 'pointer'
              }}
            >
              {isLoading ? <Loader2 className="animate-spin" /> : 'JOIN NOW'}
            </button>
          </form>
        </div>
      </motion.div>

      {/* Visual Side */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="register-visual" 
        style={{ 
          flex: 1, 
          background: 'url("https://images.unsplash.com/photo-1445205170230-053b83016050?w=1200&auto=format&fit=crop&q=80") center/cover no-repeat',
          display: 'none', 
        }}
      >
         <div style={{ 
          width: '100%', 
          height: '100%', 
          background: 'rgba(0,0,0,0.1)', 
          padding: '60px', 
          display: 'flex', 
          flexDirection: 'column', 
          justifyContent: 'flex-start',
          color: 'white'
        }}>
          <h2 style={{ fontSize: '3rem', margin: 0, letterSpacing: '0.1em' }}>JOIN THE CLUB</h2>
        </div>
      </motion.div>

      <style>{`
        @media (min-width: 1024px) {
          .register-visual { display: flex !important; }
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

export default RegisterPage;
