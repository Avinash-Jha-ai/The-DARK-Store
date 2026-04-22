import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllOrders, updateOrderStatus } from '../state/orderSlice';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  ShoppingBag, 
  Clock, 
  CheckCircle, 
  Truck, 
  XCircle, 
  Search, 
  CreditCard, 
  Calendar,
  User,
  MapPin,
  RefreshCw,
  Package
} from 'lucide-react';
import { OrderCardSkeleton } from '../../../components/Skeleton';

const OrdersPage = () => {
  const dispatch = useDispatch();
  const { orders, isLoading, isError, message } = useSelector((state) => state.orders);
  const [searchTerm, setSearchTerm] = useState('');
  const [filterStatus, setFilterStatus] = useState('All');

  useEffect(() => {
    dispatch(getAllOrders());
  }, [dispatch]);

  const handleStatusUpdate = (orderId, newStatus) => {
    if (window.confirm(`Update order status to ${newStatus}?`)) {
      dispatch(updateOrderStatus({ orderId, orderStatus: newStatus }));
    }
  };

  const getStatusIcon = (status) => {
    switch (status) {
      case 'Processing': return <Clock size={16} color="#fbbf24" />;
      case 'Shipped': return <Truck size={16} color="#60a5fa" />;
      case 'Delivered': return <CheckCircle size={16} color="#34d399" />;
      case 'Cancelled': return <XCircle size={16} color="#f87171" />;
      default: return null;
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Processing': return 'rgba(251, 191, 36, 0.15)';
      case 'Shipped': return 'rgba(96, 165, 250, 0.15)';
      case 'Delivered': return 'rgba(52, 211, 153, 0.15)';
      case 'Cancelled': return 'rgba(248, 113, 113, 0.15)';
      default: return 'transparent';
    }
  };

  const filteredOrders = orders.filter(order => {
    const matchesSearch = 
      order._id.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.user?.name || '').toLowerCase().includes(searchTerm.toLowerCase()) ||
      (order.user?.email || '').toLowerCase().includes(searchTerm.toLowerCase());
    
    const matchesFilter = filterStatus === 'All' || order.orderStatus === filterStatus;
    
    return matchesSearch && matchesFilter;
  });

  return (
    <div className="main-content" style={{ padding: '40px', maxWidth: '1200px', margin: '0 auto' }}>
      <header style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: '40px' }}>
        <div>
          <h1 style={{ fontFamily: 'var(--font-heading)', fontSize: '2.5rem', letterSpacing: '0.05em', marginBottom: '10px' }}>ORDERS</h1>
          <p style={{ color: '#94a3b8', fontSize: '1rem' }}>Manage and track customer fulfillment</p>
        </div>
        <div style={{ display: 'flex', gap: '15px' }}>
          <button 
            onClick={() => dispatch(getAllOrders())}
            style={{ 
              display: 'flex', 
              alignItems: 'center', 
              gap: '8px', 
              padding: '10px 20px', 
              backgroundColor: '#1e293b', 
              color: 'white', 
              border: '1px solid #334155', 
              borderRadius: '12px', 
              cursor: 'pointer' 
            }}
          >
            <RefreshCw size={18} className={isLoading ? 'spin' : ''} />
            Refresh
          </button>
        </div>
      </header>

      <div style={{ display: 'flex', gap: '20px', marginBottom: '30px', flexWrap: 'wrap' }}>
        <div className="search-bar" style={{ 
          flex: 1,
          minWidth: '300px',
          display: 'flex', 
          alignItems: 'center', 
          backgroundColor: '#1e293b', 
          padding: '12px 20px', 
          borderRadius: '14px',
          border: '1px solid #334155',
          transition: 'border-color 0.2s'
        }}>
          <Search size={20} color="#94a3b8" />
          <input 
            type="text" 
            placeholder="Search by Order ID, Name or Email..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            style={{ 
              background: 'none', 
              border: 'none', 
              color: 'white', 
              marginLeft: '12px', 
              outline: 'none',
              width: '100%',
              fontSize: '0.95rem'
            }} 
          />
        </div>
        
        <div style={{ display: 'flex', gap: '10px' }}>
          {['All', 'Processing', 'Shipped', 'Delivered', 'Cancelled'].map(status => (
            <button
              key={status}
              onClick={() => setFilterStatus(status)}
              style={{
                padding: '8px 16px',
                borderRadius: '10px',
                border: '1px solid #334155',
                backgroundColor: filterStatus === status ? 'var(--admin-primary)' : '#1e293b',
                color: filterStatus === status ? 'black' : '#94a3b8',
                fontWeight: '600',
                cursor: 'pointer',
                fontSize: '0.85rem',
                transition: 'all 0.2s'
              }}
            >
              {status}
            </button>
          ))}
        </div>
      </div>

      {isError && (
        <div style={{ padding: '20px', backgroundColor: 'rgba(248, 113, 113, 0.1)', color: '#f87171', borderRadius: '12px', marginBottom: '20px', border: '1px solid rgba(248, 113, 113, 0.2)' }}>
          {message}
        </div>
      )}

      <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
        {isLoading ? (
          Array(3).fill(0).map((_, i) => <OrderCardSkeleton key={i} />)
        ) : (
          <AnimatePresence mode="popLayout">
            {filteredOrders.map((order) => (
              <motion.div 
                key={order._id}
              layout
              initial={{ opacity: 0, scale: 0.98 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.98 }}
              style={{ 
                backgroundColor: '#1e293b', 
                borderRadius: '20px', 
                overflow: 'hidden',
                border: '1px solid #334155',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)'
              }}
            >
              {/* Card Header */}
              <div style={{ padding: '24px', borderBottom: '1px solid #334155', display: 'flex', justifyContent: 'space-between', alignItems: 'center', backgroundColor: 'rgba(255,255,255,0.02)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
                  <div style={{ backgroundColor: 'rgba(212, 175, 55, 0.1)', padding: '10px', borderRadius: '12px' }}>
                    <ShoppingBag size={20} color="var(--admin-primary)" />
                  </div>
                  <div>
                    <h3 style={{ fontSize: '1rem', fontWeight: '700', letterSpacing: '0.05em' }}>ORDER #{order._id.slice(-6).toUpperCase()}</h3>
                    <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>ID: {order._id}</p>
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                  <div style={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: '8px', 
                    padding: '8px 16px', 
                    backgroundColor: getStatusColor(order.orderStatus), 
                    borderRadius: '12px',
                  }}>
                    {getStatusIcon(order.orderStatus)}
                    <span style={{ fontSize: '0.8rem', fontWeight: '700', color: 'white', letterSpacing: '0.05em' }}>{order.orderStatus.toUpperCase()}</span>
                  </div>
                  <div style={{ 
                    padding: '8px 12px', 
                    backgroundColor: order.paymentStatus === 'Paid' ? 'rgba(52, 211, 153, 0.1)' : 'rgba(248, 113, 113, 0.1)', 
                    borderRadius: '10px',
                    fontSize: '0.7rem',
                    fontWeight: '700',
                    color: order.paymentStatus === 'Paid' ? '#34d399' : '#f87171',
                    border: `1px solid ${order.paymentStatus === 'Paid' ? 'rgba(52, 211, 153, 0.2)' : 'rgba(248, 113, 113, 0.2)'}`
                  }}>
                    {order.paymentStatus.toUpperCase()}
                  </div>
                </div>
              </div>

              {/* Card Content */}
              <div style={{ padding: '24px', display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
                {/* Left Side: Items & Details */}
                <div>
                   <h4 style={{ fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <Package size={16} /> ORDER ITEMS
                  </h4>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                    {order.items.map((item, index) => (
                      <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '16px', backgroundColor: '#0f172a', padding: '12px', borderRadius: '14px' }}>
                        <div style={{ width: '50px', height: '50px', backgroundColor: '#1e293b', borderRadius: '10px', overflow: 'hidden' }}>
                          <img 
                            src={item.product?.images?.[0]?.url || 'https://via.placeholder.com/50'} 
                            alt="" 
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                          />
                        </div>
                        <div style={{ flex: 1 }}>
                          <p style={{ fontSize: '0.9rem', fontWeight: '600' }}>{item.product?.title || 'Unknown Product'}</p>
                          <p style={{ fontSize: '0.75rem', color: '#94a3b8' }}>Qty: {item.quantity}</p>
                        </div>
                        <p style={{ fontWeight: '700', fontSize: '0.9rem' }}>₹{(item.price * item.quantity).toLocaleString()}</p>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: '24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '15px 20px', backgroundColor: 'rgba(212,175,55,0.05)', borderRadius: '14px', border: '1px solid rgba(212,175,55,0.1)' }}>
                    <span style={{ fontSize: '0.9rem', fontWeight: '600', color: '#94a3b8' }}>TOTAL AMOUNT</span>
                    <span style={{ fontSize: '1.2rem', fontWeight: '800', color: 'var(--admin-primary)' }}>₹{order.totalAmount.toLocaleString()}</span>
                  </div>
                </div>

                {/* Right Side: Customer & Shipping */}
                <div style={{ borderLeft: '1px solid #334155', paddingLeft: '30px' }}>
                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <User size={16} /> CUSTOMER
                    </h4>
                    <p style={{ fontSize: '1rem', fontWeight: '700' }}>{order.user?.name || 'Guest User'}</p>
                    <p style={{ fontSize: '0.85rem', color: '#94a3b8' }}>{order.user?.email || 'No email'}</p>
                  </div>

                  <div style={{ marginBottom: '24px' }}>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <MapPin size={16} /> SHIPPING ADDRESS
                    </h4>
                    <p style={{ fontSize: '0.85rem', lineHeight: '1.5', color: '#cbd5e1' }}>
                      {order.shippingAddress?.address}<br />
                      {order.shippingAddress?.city}, {order.shippingAddress?.state}<br />
                      {order.shippingAddress?.pincode}, {order.shippingAddress?.country}
                    </p>
                  </div>

                  <div>
                    <h4 style={{ fontSize: '0.85rem', fontWeight: '600', color: '#94a3b8', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
                      <Calendar size={16} /> ORDER DATE
                    </h4>
                    <p style={{ fontSize: '0.85rem', color: '#cbd5e1' }}>
                      {new Date(order.createdAt).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}<br />
                      {new Date(order.createdAt).toLocaleTimeString('en-IN', { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              </div>

              {/* Card Footer: Actions */}
              <div style={{ padding: '20px 24px', backgroundColor: 'rgba(0,0,0,0.1)', display: 'flex', justifyContent: 'flex-end', gap: '12px' }}>
                {order.orderStatus === 'Processing' && (
                  <button 
                    onClick={() => handleStatusUpdate(order._id, 'Shipped')}
                    style={{ padding: '10px 20px', backgroundColor: 'var(--admin-primary)', border: 'none', color: 'black', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <Truck size={18} /> SHIP ORDER
                  </button>
                )}
                {order.orderStatus === 'Shipped' && (
                  <button 
                    onClick={() => handleStatusUpdate(order._id, 'Delivered')}
                    style={{ padding: '10px 20px', backgroundColor: '#34d399', border: 'none', color: 'black', borderRadius: '10px', fontWeight: '700', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '8px' }}
                  >
                    <CheckCircle size={18} /> MARK DELIVERED
                  </button>
                )}
                {['Processing', 'Shipped'].includes(order.orderStatus) && (
                  <button 
                    onClick={() => handleStatusUpdate(order._id, 'Cancelled')}
                    style={{ padding: '10px 20px', backgroundColor: 'transparent', border: '1px solid #f87171', color: '#f87171', borderRadius: '10px', fontWeight: '600', cursor: 'pointer' }}
                  >
                    CANCEL ORDER
                  </button>
                )}
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
        )}

        {filteredOrders.length === 0 && !isLoading && (
          <div style={{ textAlign: 'center', padding: '100px', backgroundColor: '#1e293b', borderRadius: '20px', border: '1px dashed #334155' }}>
            <ShoppingBag size={48} color="#334155" style={{ marginBottom: '20px' }} />
            <h3 style={{ color: '#94a3b8', fontSize: '1.2rem' }}>No orders found matching your criteria</h3>
            <button 
              onClick={() => { setSearchTerm(''); setFilterStatus('All'); }}
              style={{ background: 'none', border: 'none', color: 'var(--admin-primary)', marginTop: '10px', cursor: 'pointer', fontWeight: '600' }}
            >
              Clear all filters
            </button>
          </div>
        )}
      </div>

      <style>{`
        .spin { animation: spin 1s linear infinite; }
        @keyframes spin { from { transform: rotate(0deg); } to { transform: rotate(360deg); } }
      `}</style>
    </div>
  );
};

export default OrdersPage;
