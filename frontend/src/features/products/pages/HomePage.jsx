import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import CollectionBar from '../../../components/CollectionBar';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProducts } from '../state/productSlice';
import { useEffect } from 'react';

import ProductCard from '../components/ProductCard';
import { ProductCardSkeleton } from '../../../components/Skeleton';

const HomePage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading: productsLoading } = useSelector((state) => state.products);
  const [visibleCount, setVisibleCount] = React.useState(8);

  useEffect(() => {
    dispatch(getProducts());
  }, [dispatch]);

  // Real-time products from backend with design fallbacks
  const displayProducts = products && products.length > 0 ? products : [
    { _id: 1, title: 'Double Breasted Blazer', price: '890', images: [{url: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80'}, {url: 'https://images.unsplash.com/photo-1598440947619-2c35fc9aa908?w=800&auto=format&fit=crop&q=80'}] },
    { _id: 2, title: 'Silk Charmeuse Gown', price: '1,240', images: [{url: 'https://images.unsplash.com/photo-1539109132304-3914a73d4b6c?w=800&auto=format&fit=crop&q=80'}, {url: 'https://images.unsplash.com/photo-1515372039744-b8f02a3ae446?w=800&auto=format&fit=crop&q=80'}] },
    { _id: 3, title: 'Minimalist Tote Bag', price: '450', images: [{url: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80'}, {url: 'https://images.unsplash.com/photo-1544816155-12df9643f363?w=800&auto=format&fit=crop&q=80'}] },
    { _id: 4, title: 'Suede Ankle Boots', price: '670', images: [{url: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80'}, {url: 'https://images.unsplash.com/photo-1512374382149-4332c6c02151?w=800&auto=format&fit=crop&q=80'}] },
    { _id: 5, title: 'Classic Linen Shirt', price: '320', images: [{url: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80'}, {url: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80'}] },
    { _id: 6, title: 'Tailored Trousers', price: '480', images: [{url: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=800&auto=format&fit=crop&q=80'}, {url: 'https://images.unsplash.com/photo-1584305323448-299e8ad1c58c?w=800&auto=format&fit=crop&q=80'}] },
    { _id: 7, title: 'Cashmere Sweater', price: '750', images: [{url: 'https://images.unsplash.com/photo-1556906781-9a412961c28c?w=800&auto=format&fit=crop&q=80'}, {url: 'https://images.unsplash.com/photo-1576566588028-4147f3842f27?w=800&auto=format&fit=crop&q=80'}] },
    { _id: 8, title: 'Leather Loafers', price: '590', images: [{url: 'https://images.unsplash.com/photo-1614252235316-8c857d38b5f4?w=800&auto=format&fit=crop&q=80'}, {url: 'https://images.unsplash.com/photo-1595950653106-6c9ebd614d3a?w=800&auto=format&fit=crop&q=80'}] },
  ];

  return (
    <div>
      <Navbar />
      <CollectionBar />
      
      {/* Hero Section */}
      <section className="hero-section" style={{ height: '80vh', position: 'relative', overflow: 'hidden' }}>
        <motion.div 
          initial={{ scale: 1.1, opacity: 0 }}
          animate={{ scale: 1, opacity: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            background: 'url("https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=2000&auto=format&fit=crop&q=80") center/cover no-repeat'
          }} 
        />
        <div style={{ 
          position: 'absolute', 
          inset: 0, 
          background: 'linear-gradient(to right, rgba(0,0,0,0.6), transparent)',
          display: 'flex',
          alignItems: 'center',
        }} className="container">
          <div style={{ maxWidth: '600px', color: 'white' }}>
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.8 }}
              style={{ fontSize: '0.9rem', letterSpacing: '0.3em', marginBottom: '20px' }}
            >
              NEW SEASON 2026
            </motion.p>
            <motion.h1
              className="hero-title"
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.7, duration: 0.8 }}
              style={{ fontSize: '5rem', lineHeight: 1, marginBottom: '32px' }}
            >
              The Art of <span style={{ fontStyle: 'italic', color: 'var(--color-gold)' }}>Simplicity</span>
            </motion.h1>
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 1.2, duration: 0.8 }}
              onClick={() => navigate('/collections')}
              style={{ 
                padding: '16px 40px', 
                backgroundColor: 'white', 
                color: 'black', 
                fontWeight: '600', 
                letterSpacing: '0.1em',
                fontSize: '0.8rem',
                border: 'none',
                display: 'flex',
                alignItems: 'center',
                gap: '12px',
                cursor: 'pointer'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'var(--color-gold)'; e.currentTarget.style.color = 'white'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'white'; e.currentTarget.style.color = 'black'; }}
            >
              EXPLORE COLLECTION <ArrowRight size={16} />
            </motion.button>
          </div>
        </div>
      </section>

      {/* Featured Grid */}
      <section className="container" style={{ padding: '120px 0' }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '60px', flexWrap: 'wrap', gap: '20px' }}>
          <div>
            <h2 className="section-title" style={{ fontSize: '2.5rem', marginBottom: '16px' }}>Curated Selections</h2>
            <p style={{ color: 'var(--color-text-secondary)', maxWidth: '400px' }}>
              Handpicked pieces from The DARK Store, designed for the discerning individual.
            </p>
          </div>
          <Link to="/products" style={{ fontSize: '0.8rem', fontWeight: '600', letterSpacing: '0.1em', color: 'var(--color-gold)', borderBottom: '1px solid var(--color-gold)', paddingBottom: '4px' }}>
            VIEW ALL
          </Link>
        </div>

        <div className="grid-responsive">
          {productsLoading ? (
            Array(8).fill(0).map((_, i) => <ProductCardSkeleton key={i} />)
          ) : (
            displayProducts.slice(0, visibleCount).map((product, index) => (
              <ProductCard 
                  key={product._id || product.id} 
                  product={product} 
                  index={index} 
                  showHoverImage={true} 
                  height="450px"
              />
            ))
          )}
        </div>

        {visibleCount < displayProducts.length && (
          <div style={{ display: 'flex', justifyContent: 'center', marginTop: '60px' }}>
            <button 
              onClick={() => setVisibleCount(prev => prev + 4)}
              style={{ 
                padding: '16px 40px', 
                border: '1px solid #ddd', 
                backgroundColor: 'transparent', 
                fontSize: '0.8rem', 
                fontWeight: '700', 
                letterSpacing: '0.2em',
                cursor: 'pointer',
                transition: 'all 0.3s ease'
              }}
              onMouseEnter={(e) => { e.currentTarget.style.backgroundColor = 'black'; e.currentTarget.style.color = 'white'; e.currentTarget.style.borderColor = 'black'; }}
              onMouseLeave={(e) => { e.currentTarget.style.backgroundColor = 'transparent'; e.currentTarget.style.color = 'black'; e.currentTarget.style.borderColor = '#ddd'; }}
            >
              VIEW MORE
            </button>
          </div>
        )}
      </section>


      {/* Editorial Section */}
      <section className="editorial-section container" style={{ backgroundColor: 'var(--color-on-background)', color: 'white', padding: '100px 0', display: 'flex', gap: '80px', alignItems: 'center' }}>
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ flex: 1, width: '100%' }}
        >
          <img 
            src="https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=800&auto=format&fit=crop&q=80" 
            alt="Editorial" 
            style={{ width: '100%', height: '600px', objectFit: 'cover' }}
            className="editorial-image"
          />
        </motion.div>
        <motion.div 
          initial={{ opacity: 0, x: 50 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true }}
          style={{ flex: 1 }}
        >
          <h2 className="editorial-title" style={{ fontSize: '3rem', marginBottom: '24px' }}>The Digital <br/><span style={{ color: 'var(--color-gold)' }}>DARK Store Experience</span></h2>
          <p style={{ fontSize: '1.1rem', lineHeight: '1.8', color: '#ccc', marginBottom: '40px' }}>
            We believe that clothing is more than just fabric. It is a dialogue between the wearer and the world. Our new collection explores the silence between threads, celebrating the minimal and the masterful.
          </p>
          <button style={{ border: '1px solid white', padding: '16px 32px', color: 'white', fontSize: '0.8rem', letterSpacing: '0.2em' }}>
            READ EDITORIAL
          </button>
        </motion.div>
      </section>

      <style>{`
        @media (max-width: 1024px) {
          .hero-title { font-size: 3.5rem !important; }
          .editorial-title { font-size: 2.5rem !important; }
        }
        @media (max-width: 768px) {
          .hero-section { display: none !important; }
          .editorial-section { flex-direction: column !important; gap: 40px !important; padding: 60px 0 !important; }
          .editorial-image { height: 400px !important; }
          .section-title { font-size: 2rem !important; }
        }
      `}</style>
      <Footer />
    </div>
  );
};

export default HomePage;
