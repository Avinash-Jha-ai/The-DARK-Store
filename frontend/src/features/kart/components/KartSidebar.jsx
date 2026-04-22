import React, { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, ShoppingBag, Trash2, Plus, Minus } from 'lucide-react';
import { useSelector, useDispatch } from 'react-redux';
import { getKart, addToKart, removeFromKart, updateCartItemQuantity, clearKart } from '../state/kartSlice';
import { useNavigate } from 'react-router-dom';
import { loadRazorpay } from '../../../utils/loadRazorpay';
import { createRazorpayOrder, verifyRazorpayPayment } from '../../payment/state/paymentSlice';
import axios from 'axios';

const KartSidebar = ({ isOpen, onClose }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { kart } = useSelector((state) => state.kart);
  const { isLoading: isPaymentLoading, isError: isPaymentError, message: paymentMessage } = useSelector((state) => state.payment);
  const { user } = useSelector((state) => state.auth);

  useEffect(() => {
    if (isOpen && user) {
      dispatch(getKart());
    }
  }, [isOpen, user, dispatch]);

  const totalAmount = kart?.items?.reduce((total, item) => {
    const price = item.product?.price || 0;
    return total + price * item.quantity;
  }, 0) || 0;

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      onClose();
      return;
    }

    const res = await loadRazorpay();

    if (!res) {
      alert("Razorpay SDK failed to load. Are you online?");
      return;
    }

    try {
      // 1. Create order on backend
      const orderData = {
        amount: totalAmount,
        shippingAddress: {
          address: "123 Main St",
          city: "Mumbai",
          state: "Maharashtra",
          pincode: "400001",
          country: "India"
        },
        items: kart.items.map(item => ({
          product: item.product._id,
          quantity: item.quantity,
          price: item.product.price
        }))
      };

      const resultAction = await dispatch(createRazorpayOrder(orderData));
      
      if (createRazorpayOrder.rejected.match(resultAction)) {
        alert(resultAction.payload || "Failed to create order");
        return;
      }

      const { order, dbOrderId } = resultAction.payload;

      const options = {
        key: import.meta.env.VITE_RAZORPAY_KEY_ID, // Enter the Key ID generated from the Dashboard
        amount: order.amount,
        currency: order.currency,
        name: "The DARK Store",
        description: "Payment for your order",
        image: "/logo.png",
        order_id: order.id,
        handler: async function (response) {
          const verificationData = {
            razorpay_order_id: response.razorpay_order_id,
            razorpay_payment_id: response.razorpay_payment_id,
            razorpay_signature: response.razorpay_signature,
            dbOrderId: dbOrderId
          };

          const verifyAction = await dispatch(verifyRazorpayPayment(verificationData));
          
          if (verifyRazorpayPayment.fulfilled.match(verifyAction)) {
            alert("Payment Successful!");
            dispatch(getKart()); // Refresh kart (it should be empty now)
            onClose();
            navigate('/');
          } else {
            alert("Payment Verification Failed!");
          }
        },
        prefill: {
          name: user.name,
          email: user.email,
          contact: user.phone || ""
        },
        notes: {
          address: "The DARK Store Corporate Office"
        },
        theme: {
          color: "#000000"
        }
      };

      const paymentObject = new window.Razorpay(options);
      paymentObject.open();

    } catch (error) {
      console.error("Checkout Error:", error);
      alert("Something went wrong during checkout");
    }
  };

  if (!isOpen) return null;

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
              backgroundColor: 'rgba(0,0,0,0.4)',
              backdropFilter: 'blur(4px)',
              zIndex: 2000
            }}
          />

          {/* Sidebar */}
          <motion.div
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
            style={{
              position: 'fixed',
              top: 0,
              right: 0,
              width: '100%',
              maxWidth: '450px',
              height: '100%',
              backgroundColor: 'white',
              boxShadow: '-10px 0 30px rgba(0,0,0,0.1)',
              zIndex: 2001,
              display: 'flex',
              flexDirection: 'column'
            }}
          >
            {/* Header */}
            <div style={{
              padding: '30px',
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              borderBottom: '1px solid #f0f0f0'
            }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                <ShoppingBag size={20} />
                <h2 style={{ fontSize: '1rem', fontWeight: '700', letterSpacing: '0.1em' }}>YOUR KART</h2>
                {kart?.items?.length > 0 && (
                  <span style={{ fontSize: '0.8rem', color: '#888' }}>({kart.items.length} ITEMS)</span>
                )}
              </div>
              <X size={24} onClick={onClose} style={{ cursor: 'pointer' }} />
            </div>

            {/* Content */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '30px' }}>
              {!user ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                  <p style={{ color: '#888', marginBottom: '20px' }}>Please login to view your kart</p>
                  <button 
                    onClick={() => { onClose(); navigate('/login'); }}
                    style={{
                      padding: '12px 30px',
                      backgroundColor: 'black',
                      color: 'white',
                      border: 'none',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      letterSpacing: '0.1em',
                      cursor: 'pointer'
                    }}
                  >
                    LOGIN
                  </button>
                </div>
              ) : kart?.items?.length === 0 ? (
                <div style={{ textAlign: 'center', marginTop: '50px' }}>
                  <p style={{ color: '#888', marginBottom: '20px' }}>Your kart is empty</p>
                  <button 
                    onClick={onClose}
                    style={{
                      padding: '12px 30px',
                      backgroundColor: 'black',
                      color: 'white',
                      border: 'none',
                      fontSize: '0.8rem',
                      fontWeight: '700',
                      letterSpacing: '0.1em',
                      cursor: 'pointer'
                    }}
                  >
                    CONTINUE SHOPPING
                  </button>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
                  <AnimatePresence initial={false}>
                    {kart?.items?.map((item) => (
                      <motion.div 
                        key={item._id} 
                        layout
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 50, transition: { duration: 0.2 } }}
                        style={{ display: 'flex', gap: '20px' }}
                      >
                        <div 
                          onClick={() => {
                            navigate(`/product/${item.product?._id || item.product?.id}`);
                            onClose();
                          }}
                          style={{ width: '100px', height: '130px', backgroundColor: '#f5f5f5', overflow: 'hidden', cursor: 'pointer' }}
                        >
                          <img 
                            src={item.product?.images?.[0]?.url || item.product?.image || 'https://via.placeholder.com/100'} 
                            alt={item.product?.title || 'Product'}
                            style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                            onError={(e) => {
                              e.target.src = 'https://via.placeholder.com/100?text=No+Image';
                            }}
                          />
                        </div>
                        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                          <div 
                            onClick={() => {
                              navigate(`/product/${item.product?._id || item.product?.id}`);
                              onClose();
                            }}
                            style={{ cursor: 'pointer' }}
                          >
                            <h3 style={{ fontSize: '0.8rem', fontWeight: '600', marginBottom: '4px', letterSpacing: '0.05em', textTransform: 'uppercase' }}>
                              {item.product?.title || 'Unknown Product'}
                            </h3>
                            <p style={{ fontSize: '0.9rem', color: 'var(--color-gold)', fontWeight: '700' }}>₹{item.product?.price || 0}</p>
                            {item.size && (
                              <p style={{ fontSize: '0.75rem', color: '#888', marginTop: '4px', fontWeight: '500' }}>
                                SIZE: <span style={{ color: 'black', fontWeight: '600' }}>{item.size}</span>
                              </p>
                            )}
                          </div>
                          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                            <div style={{ display: 'flex', alignItems: 'center', border: '1px solid #e0e0e0', padding: '4px' }}>
                              <button 
                                style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }}
                                onClick={() => {
                                  if(item.quantity > 1) {
                                    dispatch(updateCartItemQuantity({ productId: item.product?._id, quantity: item.quantity - 1 }))
                                  } else {
                                    dispatch(removeFromKart(item.product?._id))
                                  }
                                }}
                              >
                                <Minus size={14} />
                              </button>
                              <span style={{ padding: '0 12px', fontSize: '0.8rem', fontWeight: '600' }}>{item.quantity}</span>
                              <button 
                                style={{ border: 'none', background: 'none', cursor: 'pointer', padding: '4px' }}
                                onClick={() => dispatch(updateCartItemQuantity({ productId: item.product?._id, quantity: item.quantity + 1 }))}
                              >
                                <Plus size={14} />
                              </button>
                            </div>
                              <motion.button 
                              whileHover={{ color: '#ef4444', scale: 1.1 }}
                              style={{ border: 'none', background: 'none', cursor: 'pointer', color: '#888', transition: 'color 0.2s' }}
                              onClick={() => dispatch(removeFromKart(item.product?._id))}
                            >
                              <Trash2 size={16} />
                            </motion.button>
                          </div>
                        </div>
                      </motion.div>
                    ))}
                  </AnimatePresence>
                </div>
              )}
              {isPaymentError && (
                <div style={{ marginTop: '20px', padding: '10px', backgroundColor: '#fff5f5', color: '#e53e3e', fontSize: '0.8rem', textAlign: 'center', border: '1px solid #feb2b2' }}>
                  {paymentMessage}
                </div>
              )}
            </div>

            {/* Footer */}
            {user && kart?.items?.length > 0 && (
              <div style={{ padding: '30px', borderTop: '1px solid #f0f0f0' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                  <span style={{ fontSize: '0.9rem', fontWeight: '500', color: '#888' }}>SUBTOTAL</span>
                  <span style={{ fontSize: '1.1rem', fontWeight: '700' }}>₹{totalAmount.toLocaleString()}</span>
                </div>
                <button 
                  onClick={handleCheckout}
                  disabled={isPaymentLoading}
                  style={{
                    width: '100%',
                    padding: '16px',
                    backgroundColor: 'black',
                    color: 'white',
                    border: 'none',
                    fontSize: '0.9rem',
                    fontWeight: '700',
                    letterSpacing: '0.2em',
                    cursor: 'pointer',
                    marginBottom: '10px',
                    opacity: isPaymentLoading ? 0.7 : 1
                  }}
                >
                  {isPaymentLoading ? 'PROCESSING...' : 'CHECKOUT'}
                </button>
                <p style={{ fontSize: '0.7rem', color: '#888', textAlign: 'center' }}>Shipping & taxes calculated at checkout</p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
};

export default KartSidebar;
