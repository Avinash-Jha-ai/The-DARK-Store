import React from 'react';
import { motion } from 'framer-motion';
import { Heart } from 'lucide-react';
import { useDispatch, useSelector } from 'react-redux';
import { addToWishlist, removeFromWishlist } from '../state/wishlistSlice';
import { useNavigate } from 'react-router-dom';

const WishlistButton = ({ productId, style = {} }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { user } = useSelector((state) => state.auth);
  const { items: wishlistItems } = useSelector((state) => state.wishlist);
  
  const isInWishlist = wishlistItems.some(item => (item._id || item.id) === productId);

  const handleToggleWishlist = (e) => {
    e.stopPropagation();
    if (!user) {
      navigate('/login');
      return;
    }

    if (isInWishlist) {
      dispatch(removeFromWishlist(productId));
    } else {
      dispatch(addToWishlist(productId));
    }
  };

  return (
    <motion.button
      whileHover={{ scale: 1.1 }}
      whileTap={{ scale: 0.9 }}
      onClick={handleToggleWishlist}
      style={{
        background: 'white',
        border: 'none',
        borderRadius: '50%',
        width: '40px',
        height: '40px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        cursor: 'pointer',
        boxShadow: '0 4px 12px rgba(0,0,0,0.1)',
        zIndex: 5,
        ...style
      }}
    >
      <Heart 
        size={20} 
        fill={isInWishlist ? "#ef4444" : "none"} 
        color={isInWishlist ? "#ef4444" : "#000"} 
        strokeWidth={isInWishlist ? 0 : 2}
      />
    </motion.button>
  );
};

export default WishlistButton;
