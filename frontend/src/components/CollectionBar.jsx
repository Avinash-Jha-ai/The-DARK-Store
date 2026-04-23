import { motion } from 'framer-motion';
import { useNavigate, useParams } from 'react-router-dom';

const collections = [
  { id: 'shirt', name: 'Shirts', value: 'shirt' },
  { id: 't-shirt', name: 'T-Shirts', value: 't-shirt' },
  { id: 'cotton-linen', name: 'Cotton Linen', value: 'cotton-linen' },
  { id: 'polos', name: 'Polos', value: 'polos' },
  { id: 'classic-fit-tees', name: 'Classic Fit Tees', value: 'classic-fit-tees' },
  { id: 'outerwear', name: 'Outerwear', value: 'outerwear' },
  { id: 'sneakers', name: 'Sneakers', value: 'sneakers' },
  { id: 'all-accessories', name: 'All Accessories', value: 'all-accessories' },
  { id: 'joggers', name: 'Joggers', value: 'joggers' },
  { id: 'jeans', name: 'Jeans', value: 'jeans' },
  { id: 'pants', name: 'Pants', value: 'pants' },
  { id: 'cargos', name: 'Cargos', value: 'cargos' },
];

const CollectionBar = () => {
  const navigate = useNavigate();
  const { collectionName } = useParams();

  const handleCollectionClick = (value) => {
    navigate(`/collection/${value}`);
  };

  return (
    <div style={{
      marginTop: '68px', // Space for fixed navbar
      padding: '20px 60px',
      backgroundColor: 'white',
      borderBottom: '1px solid rgba(0,0,0,0.05)',
      display: 'flex',
      gap: '30px',
      overflowX: 'auto',
      whiteSpace: 'nowrap',
      msOverflowStyle: 'none',
      scrollbarWidth: 'none',
      zIndex: 900,
      position: 'relative'
    }} className="collection-bar">
      {collections.map((col) => (
        <motion.div
          key={col.id}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
          onClick={() => handleCollectionClick(col.value)}
          style={{
            cursor: 'pointer',
            fontSize: '0.85rem',
            fontWeight: collectionName === col.value ? '700' : '500',
            letterSpacing: '0.1em',
            textTransform: 'uppercase',
            color: collectionName === col.value ? 'var(--color-gold)' : '#666',
            paddingBottom: '8px',
            borderBottom: collectionName === col.value ? '2px solid var(--color-gold)' : '2px solid transparent',
            transition: 'all 0.3s ease'
          }}
        >
          {col.name}
        </motion.div>
      ))}
      <style>{`
        .collection-bar::-webkit-scrollbar {
          display: none;
        }
        @media (max-width: 768px) {
          .collection-bar { padding: 12px 20px !important; margin-top: 56px !important; gap: 20px !important; }
        }
      `}</style>
    </div>
  );
};

export default CollectionBar;
