import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getMyOrders } from '../state/orderSlice';
import Navbar from '../../../components/Navbar';
import Footer from '../../../components/Footer';
import { motion } from 'framer-motion';
import { Package, ChevronRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyOrdersPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { orders, isLoading } = useSelector((state) => state.orders);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (user) {
      dispatch(getMyOrders());
    } else {
      navigate('/login');
    }
  }, [dispatch, user, navigate]);

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return '#3b82f6';
      case 'Shipped': return '#f59e0b';
      case 'Delivered': return '#10b981';
      case 'Cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      <main className="container" style={{ flex: 1, padding: '120px 0', backgroundColor: '#f9f9f9' }}>
        <div style={{ maxWidth: '1000px', margin: '0 auto' }}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <div className="orders-header" style={{ display: 'flex', alignItems: 'center', gap: '16px', marginBottom: '60px' }}>
              <Package size={32} />
              <h1 className="orders-title" style={{ fontSize: '3rem', letterSpacing: '-0.02em' }}>My Orders</h1>
            </div>

            {isLoading ? (
              <div style={{ display: 'flex', justifyContent: 'center', padding: '100px' }}>
                <motion.div
                  animate={{ rotate: 360 }}
                  transition={{ repeat: Infinity, duration: 1, ease: "linear" }}
                  style={{ width: '40px', height: '40px', border: '2px solid #ddd', borderTopColor: 'black', borderRadius: '50%' }}
                />
              </div>
            ) : orders.length > 0 ? (
              <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
                {orders.map((order) => (
                  <motion.div
                    key={order._id}
                    style={{
                      backgroundColor: 'white',
                      border: '1px solid #eee',
                      padding: '32px',
                      display: 'flex',
                      flexDirection: 'column',
                      gap: '24px'
                    }}
                    className="order-card"
                  >
                    <div className="order-card-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid #f0f0f0', paddingBottom: '20px', flexWrap: 'wrap', gap: '20px' }}>
                      <div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', letterSpacing: '0.1em', marginBottom: '4px' }}>ORDER NUMBER</p>
                        <p style={{ fontWeight: '700', fontSize: '0.85rem' }}>#{order._id.substring(order._id.length - 8).toUpperCase()}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', letterSpacing: '0.1em', marginBottom: '4px' }}>DATE PLACED</p>
                        <p style={{ fontWeight: '600', fontSize: '0.85rem' }}>{formatDate(order.createdAt)}</p>
                      </div>
                      <div>
                        <p style={{ fontSize: '0.7rem', color: 'var(--color-text-secondary)', letterSpacing: '0.1em', marginBottom: '4px' }}>TOTAL AMOUNT</p>
                        <p style={{ fontWeight: '700', fontSize: '0.9rem', color: 'var(--color-gold)' }}>₹{order.totalAmount}</p>
                      </div>
                      <div style={{
                        padding: '6px 12px',
                        backgroundColor: `${getStatusColor(order.orderStatus)}15`,
                        color: getStatusColor(order.orderStatus),
                        fontSize: '0.65rem',
                        fontWeight: '700',
                        letterSpacing: '0.1em'
                      }}>
                        {order.orderStatus.toUpperCase()}
                      </div>
                    </div>

                    <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
                      {order.items.map((item, idx) => (
                        <div key={idx} style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                          <img 
                            src={item.product?.images?.[0]?.url || 'https://via.placeholder.com/100'} 
                            alt={item.product?.title} 
                            style={{ width: '60px', height: '80px', objectFit: 'cover', backgroundColor: '#f5f5f5' }}
                          />
                          <div style={{ flex: 1 }}>
                            <h4 style={{ fontSize: '0.85rem', fontWeight: '600', marginBottom: '4px' }}>{item.product?.title}</h4>
                            <p style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)' }}>Qty: {item.quantity}</p>
                          </div>
                          <p style={{ fontWeight: '600', fontSize: '0.9rem' }}>₹{item.price}</p>
                        </div>
                      ))}
                    </div>
                  </motion.div>
                ))}
              </div>
            ) : (
              <div style={{ textAlign: 'center', padding: '100px 0' }}>
                <p style={{ fontSize: '1.2rem', color: 'var(--color-text-secondary)', marginBottom: '32px' }}>
                  You haven't placed any orders yet.
                </p>
                <button 
                  onClick={() => navigate('/products')}
                  style={{ 
                    padding: '16px 40px', 
                    backgroundColor: 'black', 
                    color: 'white', 
                    border: 'none', 
                    fontSize: '0.8rem', 
                    fontWeight: '700', 
                    letterSpacing: '0.2em',
                    cursor: 'pointer'
                  }}
                >
                  START SHOPPING
                </button>
              </div>
            )}
          </motion.div>
        </div>
      </main>

      <Footer />
      
      <style>{`
        @media (max-width: 768px) {
          .orders-header { flex-direction: column; align-items: flex-start !important; gap: 8px !important; margin-bottom: 40px !important; }
          .orders-title { font-size: 2.2rem !important; }
          .order-card { padding: 20px !important; }
          .order-card-header { flex-direction: column; gap: 12px !important; }
        }
      `}</style>
    </div>
  );
};

export default MyOrdersPage;
