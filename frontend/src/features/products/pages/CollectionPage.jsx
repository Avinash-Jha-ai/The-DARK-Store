import React, { useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import CollectionBar from '../../../components/CollectionBar';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getProductsByCollection } from '../state/productSlice';

import ProductCard from '../components/ProductCard';

const CollectionPage = () => {
  const { collectionName } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading, isError, message } = useSelector((state) => state.products);

  useEffect(() => {
    if (collectionName) {
      dispatch(getProductsByCollection(collectionName));
    }
  }, [dispatch, collectionName]);

  return (
    <div>
      <Navbar />
      <CollectionBar />

      <section style={{ padding: '40px 60px 20px' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          fontFamily: 'var(--font-headline)', 
          letterSpacing: '0.1em',
          marginBottom: '10px',
          textTransform: 'uppercase'
        }}>
          {collectionName.replace('-', ' ')} <span style={{ color: 'var(--color-gold)' }}>Collection</span>
        </h1>
        <p style={{ color: '#666', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
          {isLoading ? 'FETCHING COLLECTION...' : `${products ? products.length : 0} ITEMS FOUND`}
        </p>
      </section>

      <section style={{ padding: '40px 60px' }}>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(300px, 1fr))', gap: '40px' }}>
          {products && products.length > 0 ? (
            products.map((product, index) => (
              <ProductCard 
                key={product._id} 
                product={product} 
                index={index} 
                showHoverImage={true} 
                height="450px"
              />
            ))
          ) : (
            !isLoading && (
              <div style={{ gridColumn: '1 / -1', textAlign: 'center', padding: '100px 0' }}>
                <p style={{ fontSize: '1.2rem', color: '#666' }}>
                  {isError ? message : "NO PRODUCTS FOUND IN THIS COLLECTION"}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      {isLoading && (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Loading collection...</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default CollectionPage;
