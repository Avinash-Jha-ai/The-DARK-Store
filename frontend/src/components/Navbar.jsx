import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate, useLocation, useSearchParams } from 'react-router-dom';
import { ShoppingBag, User, Search, Menu, LogOut, X, Heart } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../features/auth/state/authSlice';
import { getKart, clearKartState } from '../features/kart/state/kartSlice';
import { getWishlist } from '../features/wishlist/state/wishlistSlice';
import KartSidebar from '../features/kart/components/KartSidebar';
import CategorySidebar from './CategorySidebar';

const Navbar = () => {
  const { user } = useSelector((state) => state.auth);
  const { kart } = useSelector((state) => state.kart);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [searchParams] = useSearchParams();

  const [isSearchOpen, setIsSearchOpen] = useState(!!searchParams.get('q'));
  const [searchQuery, setSearchQuery] = useState(searchParams.get('q') || '');
  const [isKartOpen, setIsKartOpen] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const rzpPaymentFormRef = useRef(null);

  useEffect(() => {
    if (rzpPaymentFormRef.current && rzpPaymentFormRef.current.children.length === 0) {
      const script = document.createElement('script');
      script.src = 'https://checkout.razorpay.com/v1/payment-button.js';
      script.setAttribute('data-payment_button_id', 'pl_SjMcCHzmcMQgAj');
      script.async = true;
      rzpPaymentFormRef.current.appendChild(script);
    }
  }, []);

  useEffect(() => {
    if (user) {
      dispatch(getKart());
      dispatch(getWishlist());
    }
  }, [user, dispatch]);

  const cartItemsCount = kart?.items?.reduce((total, item) => total + item.quantity, 0) || 0;

  // Sync state with URL changes (e.g. when navigating back/forward or from other pages)
  useEffect(() => {
    const q = searchParams.get('q') || '';
    if (q !== searchQuery && location.pathname === '/search') {
      setSearchQuery(q);
      setIsSearchOpen(!!q);
    }
  }, [searchParams, location.pathname]);

  // Debounced search logic
  useEffect(() => {
    const delayDebounceFn = setTimeout(() => {
      const currentQ = searchParams.get('q') || '';
      if (searchQuery.trim() && searchQuery !== currentQ) {
        navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
      }
    }, 600); // 600ms delay

    return () => clearTimeout(delayDebounceFn);
  }, [searchQuery, navigate, searchParams]);

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearKartState());
  };

  const handleSearch = (e) => {
    if (e.key === 'Enter') {
      if (searchQuery.trim()) {
        const currentQ = searchParams.get('q') || '';
        if (searchQuery !== currentQ) {
          navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
        }
      }
    }
  };


  return (
    <>
      <motion.nav
        initial={{ y: -100 }}
        animate={{ y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        style={{
          position: 'fixed',
          top: 0,
          left: 0,
          width: '100%',
          padding: '16px 60px',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          zIndex: 1000,
          backgroundColor: 'rgba(255, 255, 255, 0.8)',
          backdropFilter: 'blur(20px)',
          borderBottom: '1px solid rgba(0,0,0,0.05)'
        }}
      >
        <div style={{ display: 'flex', gap: '40px', alignItems: 'center' }}>
          <Menu size={20} style={{ cursor: 'pointer' }} onClick={() => setIsMenuOpen(true)} />
          <div style={{ display: 'flex', gap: '32px', fontSize: '0.8rem', fontWeight: '500', letterSpacing: '0.1em' }} className="nav-links">
            <Link to="/">HOME</Link>
            <Link to="/products">PRODUCTS</Link>
            {user && <Link to="/my-orders">MY ORDERS</Link>}
          </div>
        </div>

        <Link to="/" className="logo-text" style={{ fontFamily: 'var(--font-headline)', fontSize: '1.8rem', fontWeight: '700', letterSpacing: '0.2em' }}>
          The DARK Store
        </Link>

        <div className="nav-icons" style={{ display: 'flex', gap: '24px', alignItems: 'center' }}>
          <AnimatePresence>
            {isSearchOpen ? (
              <motion.div
                initial={{ width: 0, opacity: 0 }}
                animate={{ width: 200, opacity: 1 }}
                exit={{ width: 0, opacity: 0 }}
                style={{ overflow: 'hidden', display: 'flex', alignItems: 'center', borderBottom: '1px solid black' }}
              >
                <input
                  autoFocus
                  type="text"
                  placeholder="SEARCH..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={handleSearch}
                  style={{
                    border: 'none',
                    background: 'transparent',
                    outline: 'none',
                    fontSize: '0.7rem',
                    letterSpacing: '0.1em',
                    width: '100%',
                    padding: '4px 0'
                  }}
                />
                <X
                  size={14}
                  style={{ cursor: 'pointer' }}
                  onClick={() => { setIsSearchOpen(false); setSearchQuery(''); }}
                />
              </motion.div>
            ) : (
              <Search size={20} style={{ cursor: 'pointer' }} onClick={() => setIsSearchOpen(true)} />
            )}
          </AnimatePresence>

          {/* Donation Button */}
          <form ref={rzpPaymentFormRef} style={{ display: 'flex', alignItems: 'center' }}></form>

          {user && user.role === 'seller' && (
            <a
              href="http://localhost:5174/inventory"
              target="_blank"
              rel="noopener noreferrer"
              style={{
                fontSize: '0.7rem',
                fontWeight: '700',
                letterSpacing: '0.1em',
                backgroundColor: 'black',
                color: 'white',
                padding: '8px 16px',
                borderRadius: '2px'
              }}
            >
              ADMIN
            </a>
          )}

          {user ? (
            <div style={{ display: 'flex', gap: '16px', alignItems: 'center' }}>
              <span className="user-name" style={{ fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.05em' }}>{user.fullname.toUpperCase()}</span>
              <LogOut size={20} onClick={handleLogout} style={{ cursor: 'pointer', color: '#ef4444' }} />
            </div>
          ) : (
            <Link to="/login"><User size={20} /></Link>
          )}

          {user && (
            <Link to="/wishlist" style={{ position: 'relative' }}>
              <Heart size={20} />
            </Link>
          )}

          <div style={{ position: 'relative', cursor: 'pointer' }} onClick={() => setIsKartOpen(true)}>
            <ShoppingBag size={20} />
            {cartItemsCount > 0 && (
              <span style={{
                position: 'absolute',
                top: '-8px',
                right: '-8px',
                backgroundColor: 'black',
                color: 'white',
                fontSize: '0.6rem',
                width: '16px',
                height: '16px',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontWeight: '700'
              }}>
                {cartItemsCount}
              </span>
            )}
          </div>
        </div>

        <style>{`
          @media (max-width: 1024px) {
            nav { padding: 16px 40px !important; }
            .nav-links { gap: 24px !important; }
          }
          @media (max-width: 768px) {
            .nav-links { display: none !important; }
            nav { padding: 16px 20px !important; }
            .logo-text { font-size: 1.2rem !important; letter-spacing: 0.1em !important; }
            .user-name { display: none !important; }
            .nav-icons { gap: 16px !important; }
          }
          @media (max-width: 480px) {
            nav { padding: 16px 12px !important; }
            .nav-icons { gap: 12px !important; }
            .logo-text { font-size: 1rem !important; }
          }
        `}</style>
      </motion.nav>

      <KartSidebar isOpen={isKartOpen} onClose={() => setIsKartOpen(false)} />
      <CategorySidebar isOpen={isMenuOpen} onClose={() => setIsMenuOpen(false)} />
    </>
  );
};

export default Navbar;
