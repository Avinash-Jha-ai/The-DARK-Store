import React, { useEffect, useState } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductDetails, resetProducts } from '../state/productSlice';
import { addToKart } from '../../kart/state/kartSlice';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { ShoppingBag, Share2, ArrowLeft, Loader2, ChevronRight, Check } from 'lucide-react';
import WishlistButton from '../../wishlist/components/WishlistButton';

const ProductDetailPage = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [selectedImage, setSelectedImage] = useState(0);
  const [addedToCart, setAddedToCart] = useState(false);
  const [selectedSize, setSelectedSize] = useState('');
  const [sizeError, setSizeError] = useState(false);

  const { product, isLoading, isError, message } = useSelector((state) => state.products);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(getProductDetails(id));
    return () => dispatch(resetProducts());
  }, [dispatch, id]);

  const handleAddToCart = () => {
    if (!user) {
      navigate('/login');
      return;
    }

    const availableSizes = getAvailableSizes(product?.Collection);
    if (availableSizes.length > 0 && !selectedSize) {
      setSizeError(true);
      return;
    }

    dispatch(addToKart({ productId: id, size: selectedSize }))
      .unwrap()
      .then(() => {
        setAddedToCart(true);
        setSizeError(false);
        setTimeout(() => setAddedToCart(false), 2000);
      })
      .catch((err) => {
        alert(err || "Failed to add to kart");
      });
  };

  const getAvailableSizes = (collection) => {
    const clothCollections = ['shirt', 't-shirt', 'cotton-linen', 'polos', 'classic-fit-tees', 'outerwear', 'joggers', 'jeans', 'pants', 'cargos'];
    const shoeCollections = ['sneakers'];

    if (clothCollections.includes(collection?.toLowerCase())) {
      return ['S', 'M', 'L', 'XL', 'XXL'];
    }
    if (shoeCollections.includes(collection?.toLowerCase())) {
      return ['7', '8', '9', '10', '11'];
    }
    return [];
  };


  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: 'var(--color-surface-container-lowest)' }}>
        <Loader2 className="animate-spin" size={48} style={{ color: 'var(--color-gold)' }} />
      </div>
    );
  }

  if (isError || !product) {
    return (
      <div style={{ height: '100vh', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', gap: '20px' }}>
        <h2 style={{ fontSize: '2rem' }}>Product Not Found</h2>
        <p style={{ color: 'var(--color-text-secondary)' }}>{message || "The item you're looking for doesn't exist."}</p>
        <Link to="/" style={{ color: 'var(--color-gold)', fontWeight: '600' }}>Back to Shop</Link>
      </div>
    );
  }

  const availableSizes = getAvailableSizes(product.Collection);

  return (
    <div style={{ backgroundColor: 'var(--color-surface-container-lowest)', minHeight: '100vh' }}>
      <Navbar />
      
      <main className="container" style={{ padding: '140px 0 100px' }}>
        {/* Breadcrumbs */}
        <nav style={{ display: 'flex', alignItems: 'center', gap: '8px', fontSize: '0.7rem', color: 'var(--color-text-secondary)', marginBottom: '32px', letterSpacing: '0.05em' }}>
          <Link to="/" style={{ color: 'inherit' }}>SHOP</Link>
          <ChevronRight size={12} />
          <span style={{ color: 'var(--color-gold)', fontWeight: '600' }}>{product.title.toUpperCase()}</span>
        </nav>

        <div className="product-grid" style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1.2fr) minmax(0, 1fr)', gap: '80px' }}>
          
          {/* Product Images */}
          <div className="image-gallery" style={{ display: 'flex', gap: '20px' }}>
            <div className="thumbnails desktop-only" style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {product.images?.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{ 
                    width: '80px', 
                    height: '110px', 
                    cursor: 'pointer', 
                    border: selectedImage === idx ? '1px solid var(--color-gold)' : '1px solid transparent',
                    transition: 'var(--transition-fast)'
                  }}
                >
                  <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
            <div className="main-image-container" style={{ flex: 1, height: '700px', backgroundColor: '#f9f9f9', overflow: 'hidden' }}>
              <AnimatePresence mode="wait">
                <motion.img 
                  key={selectedImage}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  transition={{ duration: 0.4 }}
                  src={product.images?.[selectedImage]?.url} 
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
                />
              </AnimatePresence>
            </div>
            {/* Mobile Thumbnails */}
            <div className="thumbnails-mobile mobile-only" style={{ display: 'flex', gap: '8px', marginTop: '12px', overflowX: 'auto', paddingBottom: '8px' }}>
              {product.images?.map((img, idx) => (
                <div 
                  key={idx}
                  onClick={() => setSelectedImage(idx)}
                  style={{ 
                    width: '60px', 
                    height: '80px', 
                    flexShrink: 0,
                    cursor: 'pointer', 
                    border: selectedImage === idx ? '1px solid var(--color-gold)' : '1px solid transparent',
                  }}
                >
                  <img src={img.url} alt="" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                </div>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="product-info-container" style={{ height: 'fit-content' }}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <h1 className="product-title" style={{ fontSize: '3rem', fontWeight: '500', marginBottom: '16px', letterSpacing: '-0.02em', lineHeight: '1.1' }}>
                {product.title}
              </h1>
              <p className="product-price" style={{ fontSize: '1.8rem', fontWeight: '700', marginBottom: '32px', color: 'var(--color-on-background)' }}>
                ₹{product.price?.toLocaleString()}
              </p>

              {availableSizes.length > 0 && (
                <div style={{ marginBottom: '40px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
                    <h3 style={{ fontSize: '0.85rem', fontWeight: '600', letterSpacing: '0.1em' }}>
                      SELECT SIZE 
                      {product.Collection === 'sneakers' ? ' (UK/INDIA)' : ''}
                    </h3>
                    <button style={{ background: 'none', border: 'none', fontSize: '0.75rem', fontWeight: '600', color: 'var(--color-text-secondary)', textDecoration: 'underline', cursor: 'pointer' }}>SIZE GUIDE</button>
                  </div>
                  <div style={{ display: 'flex', flexWrap: 'wrap', gap: '12px' }}>
                    {availableSizes.map((size) => (
                      <button
                        key={size}
                        onClick={() => {
                          setSelectedSize(size);
                          setSizeError(false);
                        }}
                        style={{
                          width: '56px',
                          height: '48px',
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          border: selectedSize === size ? '2px solid var(--color-on-background)' : '1px solid #ddd',
                          backgroundColor: selectedSize === size ? 'var(--color-on-background)' : 'transparent',
                          color: selectedSize === size ? 'white' : 'var(--color-on-background)',
                          fontWeight: '600',
                          fontSize: '0.9rem',
                          cursor: 'pointer',
                          transition: 'all 0.2s ease'
                        }}
                      >
                        {size}
                      </button>
                    ))}
                  </div>
                  {sizeError && (
                    <motion.p 
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      style={{ color: '#ef4444', fontSize: '0.8rem', marginTop: '12px', fontWeight: '500' }}
                    >
                      Please select a size before adding to kart
                    </motion.p>
                  )}
                </div>
              )}

              <div style={{ display: 'flex', gap: '16px', marginBottom: '40px' }}>
                <button
                  onClick={handleAddToCart}
                  style={{
                    flex: 1,
                    padding: '18px',
                    backgroundColor: addedToCart ? '#10b981' : 'var(--color-on-background)',
                    color: 'white',
                    border: 'none',
                    fontWeight: '700',
                    fontSize: '0.9rem',
                    letterSpacing: '0.1em',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '12px',
                    cursor: 'pointer',
                    transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)'
                  }}
                >
                  {addedToCart ? <Check size={18} /> : <ShoppingBag size={18} />}
                  {addedToCart ? 'ADDED' : 'ADD TO KART'}
                </button>
                <WishlistButton 
                  productId={id} 
                  style={{ 
                    borderRadius: '0', 
                    width: '60px', 
                    height: '60px', 
                    border: '1px solid #eee',
                    boxShadow: 'none'
                  }} 
                />
              </div>

              <div style={{ borderTop: '1px solid #eee', paddingTop: '32px' }}>
                <h3 style={{ fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', marginBottom: '16px' }}>DESCRIPTION</h3>
                <p style={{ lineHeight: '1.6', color: 'var(--color-text-secondary)', marginBottom: '24px', fontSize: '0.95rem' }}>
                  {product.description}
                </p>
                <ul style={{ padding: 0, listStyle: 'none', color: 'var(--color-text-secondary)', fontSize: '0.85rem' }}>
                  <li style={{ marginBottom: '8px', display: 'flex', gap: '12px' }}>
                    <span style={{ fontWeight: '600', color: 'black' }}>Material:</span> Premium DARK Fabric
                  </li>
                  <li style={{ display: 'flex', gap: '12px' }}>
                    <span style={{ fontWeight: '600', color: 'black' }}>Care:</span> Dry clean only
                  </li>
                </ul>
              </div>
            </motion.div>
          </div>
        </div>
      </main>

      <style>{`
        @media (max-width: 1024px) {
          .product-grid { grid-template-columns: 1fr !important; gap: 40px !important; }
          .main-image-container { height: 600px !important; }
          .product-title { font-size: 2.2rem !important; }
          .product-price { font-size: 1.5rem !important; }
        }
        @media (max-width: 768px) {
          main { padding: 120px 0 60px !important; }
          .image-gallery { flex-direction: column !important; gap: 0 !important; }
          .main-image-container { height: 450px !important; }
          .product-info-container { position: relative !important; top: 0 !important; }
        }
        @keyframes spin {
          from { transform: rotate(0deg); }
          to { transform: rotate(360deg); }
        }
        .animate-spin {
          animation: spin 1s linear infinite;
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default ProductDetailPage;
