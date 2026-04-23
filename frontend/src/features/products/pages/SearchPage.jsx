import React, { useEffect } from 'react';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import CollectionBar from '../../../components/CollectionBar';
import { motion } from 'framer-motion';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { searchProducts } from '../state/productSlice';

import ProductCard from '../components/ProductCard';

const SearchPage = () => {
  const [searchParams] = useSearchParams();
  const query = searchParams.get('q');
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { products, isLoading, isError, message } = useSelector((state) => state.products);

  useEffect(() => {
    if (query) {
      dispatch(searchProducts(query));
    }
  }, [dispatch, query]);

  return (
    <div>
      <Navbar />
      <CollectionBar />

      <section className="container" style={{ padding: '40px 0 20px' }}>
        <h1 style={{ 
          fontSize: '2rem', 
          fontFamily: 'var(--font-headline)', 
          letterSpacing: '0.05em',
          marginBottom: '10px',
          textTransform: 'uppercase'
        }} className="search-title">
          {query ? (
            <>Search results for: <span style={{ color: 'var(--color-gold)' }}>"{query}"</span></>
          ) : (
            <>Search our collection</>
          )}
        </h1>
        <p style={{ color: '#666', fontSize: '0.9rem', letterSpacing: '0.1em' }}>
          {isLoading ? 'FETCHING RESULTS...' : `${products ? products.length : 0} ITEMS FOUND`}
        </p>
      </section>

      <section className="container" style={{ padding: '40px 0' }}>
        <div className="grid-responsive">
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
                  {isError ? message : "NO PRODUCTS MATCHED YOUR SEARCH"}
                </p>
              </div>
            )
          )}
        </div>
      </section>

      <style>{`
        @media (max-width: 768px) {
          .search-title { font-size: 1.5rem !important; }
        }
      `}</style>

      {isLoading && (
        <div style={{ textAlign: 'center', padding: '50px' }}>
          <p>Searching...</p>
        </div>
      )}
      <Footer />
    </div>
  );
};

export default SearchPage;
