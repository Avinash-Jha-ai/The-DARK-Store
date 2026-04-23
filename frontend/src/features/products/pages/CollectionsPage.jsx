import React from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import CollectionBar from '../../../components/CollectionBar';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';

const collectionsList = [
  { 
    id: 'shirt', 
    name: 'Shirts', 
    value: 'shirt',
    image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=800&auto=format&fit=crop&q=80',
    description: 'Crisp, tailored, and timeless.'
  },
  { 
    id: 'outerwear', 
    name: 'Outerwear', 
    value: 'outerwear',
    image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=800&auto=format&fit=crop&q=80',
    description: 'Masterfully crafted layers for every season.'
  },
  { 
    id: 'cotton-linen', 
    name: 'Cotton Linen', 
    value: 'cotton-linen',
    image: 'https://images.unsplash.com/photo-1523381210434-271e8be1f52b?w=800&auto=format&fit=crop&q=80',
    description: 'Breathable elegance in natural fibers.'
  },
  { 
    id: 'jeans', 
    name: 'Denim', 
    value: 'jeans',
    image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=800&auto=format&fit=crop&q=80',
    description: 'The foundation of the modern wardrobe.'
  },
  { 
    id: 'sneakers', 
    name: 'Footwear', 
    value: 'sneakers',
    image: 'https://images.unsplash.com/photo-1543163521-1bf539c55dd2?w=800&auto=format&fit=crop&q=80',
    description: 'Sophisticated steps for the journey ahead.'
  },
  { 
    id: 'all-accessories', 
    name: 'Accessories', 
    value: 'all-accessories',
    image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=800&auto=format&fit=crop&q=80',
    description: 'The finishing touches of distinction.'
  }
];

const CollectionsPage = () => {
  const navigate = useNavigate();

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
          <h1 style={{ 
            fontSize: '3.5rem', 
            fontFamily: 'var(--font-headline)', 
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
            fontWeight: '300',
            marginBottom: '16px',
            lineHeight: '1'
          }} className="collections-title">
            Our Collections
          </h1>
          <div style={{ width: '60px', height: '2px', backgroundColor: 'var(--color-gold)', marginBottom: '24px' }}></div>
          <p style={{ color: '#666', fontSize: '0.9rem', letterSpacing: '0.1em', maxWidth: '600px', lineHeight: '1.6' }}>
            Explore our curated archives, each organized by aesthetic and purpose. From the minimalist essentials to the statement pieces of the season.
          </p>
        </motion.div>
      </section>

      <section className="container" style={{ padding: '40px 0 100px' }}>
        <div style={{ 
            display: 'grid', 
            gridTemplateColumns: 'repeat(auto-fill, minmax(400px, 1fr))', 
            gap: '40px' 
        }} className="collections-grid">
          {collectionsList.map((collection, index) => (
            <motion.div
              key={collection.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1, duration: 0.6 }}
              onClick={() => navigate(`/collection/${collection.value}`)}
              style={{ 
                  cursor: 'pointer',
                  position: 'relative',
                  height: '500px',
                  overflow: 'hidden'
              }}
              className="collection-card"
              onMouseEnter={(e) => {
                  const img = e.currentTarget.querySelector('img');
                  const overlay = e.currentTarget.querySelector('.overlay');
                  if (img) img.style.transform = 'scale(1.05)';
                  if (overlay) overlay.style.backgroundColor = 'rgba(0,0,0,0.3)';
              }}
              onMouseLeave={(e) => {
                  const img = e.currentTarget.querySelector('img');
                  const overlay = e.currentTarget.querySelector('.overlay');
                  if (img) img.style.transform = 'scale(1)';
                  if (overlay) overlay.style.backgroundColor = 'rgba(0,0,0,0.2)';
              }}
            >
              <img 
                src={collection.image} 
                alt={collection.name}
                style={{ 
                    width: '100%', 
                    height: '100%', 
                    objectFit: 'cover',
                    transition: 'transform 0.8s ease'
                }}
              />
              <div 
                className="overlay"
                style={{ 
                    position: 'absolute',
                    inset: 0,
                    backgroundColor: 'rgba(0,0,0,0.2)',
                    transition: 'background-color 0.4s ease',
                    display: 'flex',
                    flexDirection: 'column',
                    justifyContent: 'flex-end',
                    padding: '40px',
                    color: 'white'
                }}
              >
                <h3 style={{ 
                    fontSize: '2rem', 
                    fontWeight: '500', 
                    letterSpacing: '0.1em',
                    textTransform: 'uppercase',
                    marginBottom: '8px'
                }}>
                  {collection.name}
                </h3>
                <p style={{ 
                    fontSize: '0.9rem', 
                    letterSpacing: '0.05em',
                    opacity: 0.8,
                    maxWidth: '300px'
                }}>
                  {collection.description}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .collections-title { font-size: 2.5rem !important; }
          .collections-grid { grid-template-columns: 1fr !important; gap: 20px !important; }
          .collection-card { height: 400px !important; }
        }
      `}</style>

      <Footer />
    </div>
  );
};

export default CollectionsPage;
