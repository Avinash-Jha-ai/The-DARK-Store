import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ChevronDown, ChevronUp } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const categories = [
  { name: 'Shirts', id: 'shirt', image: 'https://images.unsplash.com/photo-1596755094514-f87e34085b2c?w=400&q=80' },
  { name: 'T-Shirts', id: 't-shirt', image: 'https://images.unsplash.com/photo-1521572267360-ee0c2909d518?w=400&q=80' },
  { name: 'Cotton Linen', id: 'cotton-linen', image: 'https://images.unsplash.com/photo-1603251578711-3290ca1a0187?w=400&q=80' },
  { name: 'Polos', id: 'polos', image: 'https://images.unsplash.com/photo-1586363104862-3a5e2ab60d99?w=400&q=80' },
  { name: 'Classic Fit Tees', id: 'classic-fit-tees', image: 'https://images.unsplash.com/photo-1562157873-818bc0726f68?w=400&q=80' },
  { name: 'Outerwear', id: 'outerwear', image: 'https://images.unsplash.com/photo-1591047139829-d91aecb6caea?w=400&q=80' },
  { name: 'Sneakers', id: 'sneakers', image: 'https://images.unsplash.com/photo-1542291026-7eec264c27ff?w=400&q=80' },
  { name: 'All Accessories', id: 'all-accessories', image: 'https://images.unsplash.com/photo-1584917865442-de89df76afd3?w=400&q=80' },
  { name: 'Joggers', id: 'joggers', image: 'https://images.unsplash.com/photo-1552346154-21d32810aba3?w=400&q=80' },
  { name: 'Jeans', id: 'jeans', image: 'https://images.unsplash.com/photo-1542272604-787c3835535d?w=400&q=80' },
  { name: 'Pants', id: 'pants', image: 'https://images.unsplash.com/photo-1594633312681-425c7b97ccd1?w=400&q=80' },
  { name: 'Cargos', id: 'cargos', image: 'https://images.unsplash.com/photo-1591195853828-11db59a44f6b?w=400&q=80' },
];

const menuSections = [
  {
    title: 'Topwear',
    items: ['Shop By Category', 'Shop By Fit', 'Shop By Style'],
  },
  {
    title: 'Bottomwear',
    items: [],
  },
  {
    title: 'All Accessories',
    items: [],
  },
];

const CategorySidebar = ({ isOpen, onClose }) => {
  const navigate = useNavigate();
  const [expandedSections, setExpandedSections] = useState({
    'Shop All': true,
    'Categories': true,
    'Topwear': true,
  });

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleCategoryClick = (id) => {
    navigate(`/collection/${id}`);
    onClose();
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              backgroundColor: 'rgba(0,0,0,0.5)',
              zIndex: 2000,
              backdropFilter: 'blur(4px)'
            }}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '-100%' }}
            animate={{ x: 0 }}
            exit={{ x: '-100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              left: 0,
              width: '100%',
              maxWidth: '500px',
              height: '100%',
              backgroundColor: 'white',
              zIndex: 2001,
              overflowY: 'auto',
              display: 'flex',
              flexDirection: 'column'
            }}
            className="category-sidebar"
          >
            <style>{`
              @media (max-width: 500px) {
                .category-sidebar { max-width: 100% !important; }
              }
            `}</style>
            {/* Header */}
            <div style={{ padding: '24px 30px', display: 'flex', justifyContent: 'flex-end', borderBottom: '1px solid #f0f0f0' }}>
              <X size={24} onClick={onClose} style={{ cursor: 'pointer' }} />
            </div>

            <div style={{ padding: '20px 0' }}>
              {/* Shop All Accordion */}
              <div style={accordionHeaderStyle} onClick={() => toggleSection('Shop All')}>
                <span style={{ fontSize: '1.2rem', fontWeight: '700' }}>Shop All</span>
                {expandedSections['Shop All'] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
              </div>

              {expandedSections['Shop All'] && (
                <div style={{ padding: '10px 30px' }}>
                  <div style={accordionHeaderStyle} onClick={() => toggleSection('Categories')} className="sub-accordion">
                    <span style={{ fontSize: '0.9rem', color: '#555', fontWeight: '600' }}>Categories</span>
                    {expandedSections['Categories'] ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
                  </div>

                  {expandedSections['Categories'] && (
                    <div style={{ 
                      display: 'grid', 
                      gridTemplateColumns: 'repeat(5, 1fr)', 
                      gap: '15px', 
                      padding: '20px 0',
                      overflowX: 'auto' 
                    }}>
                      {categories.map((cat) => (
                        <div 
                          key={cat.id} 
                          onClick={() => handleCategoryClick(cat.id)}
                          style={{ textAlign: 'center', cursor: 'pointer' }}
                        >
                          <div style={{ 
                            width: '70px', 
                            height: '90px', 
                            backgroundColor: '#f5f5f5', 
                            borderRadius: '4px',
                            overflow: 'hidden',
                            margin: '0 auto 8px',
                            transition: 'transform 0.3s ease'
                          }}
                          onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.05)'}
                          onMouseLeave={(e) => e.currentTarget.style.transform = 'scale(1)'}
                          >
                            <img src={cat.image} alt={cat.name} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                          </div>
                          <span style={{ fontSize: '0.65rem', fontWeight: '600', display: 'block', lineHeight: '1.2' }}>{cat.name}</span>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              )}

              {/* Main Sections */}
              {menuSections.map((section) => (
                <div key={section.title} style={{ borderTop: '1px dashed #eee' }}>
                  <div style={accordionHeaderStyle} onClick={() => toggleSection(section.title)}>
                    <span style={{ fontSize: '1.1rem', fontWeight: '700' }}>{section.title}</span>
                    {expandedSections[section.title] ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
                  </div>
                  
                  {expandedSections[section.title] && section.items.length > 0 && (
                    <div style={{ padding: '0 30px 20px' }}>
                      {section.items.map(item => (
                        <div key={item} style={subItemStyle}>
                          <span>{item}</span>
                          <ChevronDown size={16} />
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

const accordionHeaderStyle = {
  padding: '20px 30px',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  cursor: 'pointer',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const subItemStyle = {
  padding: '12px 0',
  display: 'flex',
  justifyContent: 'space-between',
  alignItems: 'center',
  fontSize: '0.95rem',
  color: '#333',
  borderBottom: '1px solid #f9f9f9',
  cursor: 'pointer'
};

export default CategorySidebar;
