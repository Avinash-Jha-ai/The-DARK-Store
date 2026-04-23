import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addToKart } from '../../kart/state/kartSlice';
import { ShoppingBag } from 'lucide-react';
import WishlistButton from '../../wishlist/components/WishlistButton';

const ProductCard = ({ product, showHoverImage = false, index = 0, height = '480px' }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((state) => state.auth);
  const [isHovered, setIsHovered] = useState(false);

  const mainImage = product.images?.[0]?.url || product.image || 'https://via.placeholder.com/450';
  const hoverImage = product.images?.[1]?.url || mainImage;
  const hasSecondaryImage = product.images?.length > 1;

  const [isAdding, setIsAdding] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const clothCollections = ['shirt', 't-shirt', 'cotton-linen', 'polos', 'classic-fit-tees', 'outerwear', 'joggers', 'jeans', 'pants', 'cargos'];
  const shoeCollections = ['sneakers'];
  const needsSize = clothCollections.includes(product.Collection?.toLowerCase()) || shoeCollections.includes(product.Collection?.toLowerCase());

  const handleAddToCart = (e) => {
    e.stopPropagation();
    
    if (needsSize) {
      navigate(`/product/${product._id || product.id}`);
      return;
    }

    if (!user) {
      navigate('/login');
      return;
    }
    
    setIsAdding(true);
    dispatch(addToKart({ productId: product._id || product.id }))
      .unwrap()
      .then(() => {
        setIsAdding(false);
        setIsSuccess(true);
        setTimeout(() => setIsSuccess(false), 2000);
      })
      .catch((err) => {
        setIsAdding(false);
        alert(err || "Failed to add to kart");
      });
  };

  return (
    <motion.div 
      onClick={() => navigate(`/product/${product._id || product.id}`)}
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: (index % 8) * 0.1, duration: 0.6 }}
      style={{ cursor: 'pointer', position: 'relative' }}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      whileHover={{ y: -10 }}
      className="product-card-wrapper"
    >
      <div style={{ 
          height: height, 
          overflow: 'hidden', 
          marginBottom: '24px', 
          backgroundColor: '#f5f5f5', 
          position: 'relative' 
      }} className="product-image-container">
        {/* Main Image */}
        <img 
          src={mainImage} 
          alt={product.title || product.name} 
          style={{ 
              width: '100%', 
              height: '100%', 
              objectFit: 'cover', 
              transition: 'transform 0.8s ease, opacity 0.5s ease',
              opacity: (showHoverImage && hasSecondaryImage && isHovered) ? 0 : 1,
              transform: isHovered ? 'scale(1.05)' : 'scale(1)'
          }} 
        />
        
        {/* Hover Image */}
        {showHoverImage && hasSecondaryImage && (
            <img 
                src={hoverImage} 
                alt={`${product.title || product.name} hover`} 
                style={{ 
                    position: 'absolute',
                    top: 0,
                    left: 0,
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover', 
                    transition: 'opacity 0.5s ease, transform 0.8s ease',
                    opacity: isHovered ? 1 : 0,
                    transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                    pointerEvents: 'none'
                }} 
            />
        )}

        {/* Add to Cart Overlay */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: isHovered ? 1 : 0, y: isHovered ? 0 : 20 }}
          transition={{ duration: 0.3 }}
          className="add-to-kart-overlay"
          style={{
            position: 'absolute',
            bottom: '20px',
            left: '20px',
            right: '20px',
            zIndex: 10
          }}
        >
          <button
            onClick={handleAddToCart}
            disabled={isAdding || isSuccess}
            style={{
              width: '100%',
              padding: '12px',
              backgroundColor: isSuccess ? '#10b981' : 'white',
              color: isSuccess ? 'white' : 'black',
              border: 'none',
              fontSize: '0.7rem',
              fontWeight: '700',
              letterSpacing: '0.15em',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '8px',
              boxShadow: '0 4px 20px rgba(0,0,0,0.1)',
              cursor: (isAdding || isSuccess) ? 'default' : 'pointer',
              transition: 'all 0.3s ease'
            }}
          >
            {isAdding ? (
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                style={{ display: 'flex' }}
              >
                <ShoppingBag size={14} />
              </motion.div>
            ) : isSuccess ? (
              <>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: 'spring', damping: 12 }}
                >
                   ✓
                </motion.div>
                ADDED
              </>
            ) : (
              <>
                <ShoppingBag size={14} />
                {needsSize ? 'SELECT SIZE' : 'ADD TO KART'}
              </>
            )}
          </button>
        </motion.div>

        {/* Wishlist Button */}
        <div style={{ position: 'absolute', top: '20px', left: '20px', zIndex: 5 }}>
          <WishlistButton productId={product._id || product.id} />
        </div>

        {product.Collection && (
          <div style={{ 
            position: 'absolute', 
            top: '20px', 
            right: '20px', 
            backgroundColor: 'white', 
            padding: '4px 12px', 
            fontSize: '0.7rem', 
            fontWeight: '700', 
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            zIndex: 2
          }}>
            {product.Collection}
          </div>
        )}
      </div>
      
      <h3 style={{ 
          fontSize: '0.9rem', 
          fontWeight: '500', 
          marginBottom: '8px', 
          letterSpacing: '0.05em', 
          textTransform: 'uppercase',
          fontFamily: 'var(--font-body)'
      }}>
        {product.title || product.name}
      </h3>
      <p style={{ 
          fontSize: '1rem', 
          fontWeight: '700', 
          color: 'var(--color-gold)',
          fontFamily: 'var(--font-headline)' 
      }}>
        ₹{product.price}
      </p>
      <style>{`
        @media (max-width: 640px) {
          .product-image-container { height: 350px !important; }
          .add-to-kart-overlay { opacity: 1 !important; transform: none !important; bottom: 10px !important; left: 10px !important; right: 10px !important; }
          .add-to-kart-overlay button { padding: 8px !important; font-size: 0.6rem !important; }
        }
      `}</style>
    </motion.div>
  );
};

export default ProductCard;
