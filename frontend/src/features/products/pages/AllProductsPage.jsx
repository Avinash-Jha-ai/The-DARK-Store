import React, { useEffect, useState } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import CollectionBar from '../../../components/CollectionBar';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../state/productSlice';
import { Plus } from 'lucide-react';

import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../../../components/Skeleton';

const AllProductsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading } = useSelector((state) => state.products);
  const [visibleCount, setVisibleCount] = useState(12);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  const showMore = () => {
    setVisibleCount((prev) => prev + 8);
  };


  const displayedProducts = products ? products.slice(0, visibleCount) : [];
  const hasMore = products && visibleCount < products.length;

  return (
    <div>
      <Navbar />
      <CollectionBar />

      <section className="container" style={{ padding: '80px 0 40px' }}>
        <motion.div
           initial={{ opacity: 0, y: 20 }}
           animate={{ opacity: 1, y: 0 }}
           transition={{ duration: 0.8 }}
        >
          <h1 className="page-title" style={{ 
            fontSize: '3.5rem', 
            fontFamily: 'var(--font-headline)', 
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontWeight: '300',
            marginBottom: '16px',
            lineHeight: '1'
          }}>
            The Collection
          </h1>
          <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--color-gold)', marginBottom: '24px' }}></div>
          <p style={{ color: '#666', fontSize: '0.9rem', letterSpacing: '0.1em', maxWidth: '600px', lineHeight: '1.6' }}>
            Discover our complete archive of meticulously crafted garments. Each piece represents our commitment to timeless design and unparalleled quality.
          </p>
        </motion.div>
      </section>

      <section className="container" style={{ padding: '40px 0' }}>
        <div className="grid-responsive">
          {isLoading ? (
            Array(12).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
          ) : displayedProducts.length > 0 ? (
            displayedProducts.map((product, index) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                index={index} 
                showHoverImage={true} 
              />
            ))
          ) : (
            <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 0' }}>
              <p style={{ fontSize: '1.2rem', color: '#666', letterSpacing: '0.1em' }}>NO PRODUCTS FOUND</p>
            </div>
          )}
        </div>


        {hasMore && !isLoading && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            style={{ display: 'flex', justifyContent: 'center', marginTop: '100px' }}
          >
            <button 
              onClick={showMore}
              style={{
                background: 'none',
                border: '1px solid #000',
                padding: '16px 48px',
                fontSize: '0.8rem',
                fontWeight: '600',
                letterSpacing: '0.2em',
                cursor: 'pointer',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                transition: 'all 0.3s ease',
                textTransform: 'uppercase'
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = 'black';
                e.currentTarget.style.color = 'white';
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = 'black';
              }}
            >
              <Plus size={16} />
              View More
            </button>
          </motion.div>
        )}
      </section>

      <style>{`
        @media (max-width: 768px) {
          .page-title { font-size: 2.2rem !important; }
        }
      `}</style>


      <style>{`
        @keyframes spin {
          to { transform: rotate(360deg); }
        }
      `}</style>
      <Footer />
    </div>
  );
};


export default AllProductsPage;
