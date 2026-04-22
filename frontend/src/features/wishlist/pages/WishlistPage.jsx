import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getWishlist } from '../state/wishlistSlice';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import ProductCard from '../../products/components/ProductCard';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const WishlistPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { items: wishlistItems, isLoading } = useSelector((state) => state.wishlist);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getWishlist());
    } else {
      navigate('/login');
    }
  }, [dispatch, user, navigate]);

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main style={{ flex: 1, padding: '120px 60px' }}>
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
        >
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '60px' }}>
            <Heart size={32} fill="black" />
            <h1 style={{ fontSize: '3rem', letterSpacing: '-0.02em' }}>Your Wishlist</h1>
          </div>

          {isLoading ? (
            <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{ width: '40px', height: '40px', border: '2px solid #ddd', borderTopColor: 'black', borderRadius: '50%' }}
              />
            </div>
          ) : wishlistItems.length > 0 ? (
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
              {wishlistItems.map((product, index) => (
                <ProductCard 
                  key={product._id || product.id} 
                  product={product} 
                  index={index} 
                  showHoverImage={true}
                  height="450px"
                />
              ))}
            </div>
          ) : (
            <div style={{ textAlign: 'center', padding: '100px 0' }}>
              <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
                Your wishlist is empty. Explore our collections and find something you love.
              </p>
              <button 
                onClick={() => navigate('/products')}
                style={{ 
                  padding: '16px 40px', 
                  backgroundColor: 'black', 
                  color: 'white', 
                  border: 'none', 
                  fontSize: '0.8rem', 
                  fontWeight: '700', 
                  letterSpacing: '0.2em',
                  cursor: 'pointer'
                }}
              >
                BROWSE PRODUCTS
              </button>
            </div>
          )}
        </motion.div>
      </main>

      <Footer />
      
      <style>{`
        @media (max-width: 1024px) {
          main { padding: 80px 24px !important; }
          h1 { fontSize: 2.2rem !important; }
        }
      `}</style>
    </div>
  );
};

export default WishlistPage;
