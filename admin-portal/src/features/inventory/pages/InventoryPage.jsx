import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchSellerProducts, deleteProduct } from '../../../store/adminProductSlice';
import { motion } from 'framer-motion';
import { Plus, Search, Filter, MoreVertical, Edit, Trash2 } from 'lucide-react';
import { Link } from 'react-router-dom';
import { TableRowSkeleton } from '../../../components/Skeleton';

const InventoryPage = () => {
  const dispatch = useDispatch();
  const { products, isLoading } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    dispatch(fetchSellerProducts());
  }, [dispatch]);

  const handleDelete = (id) => {
    if (window.confirm('Are you sure you want to delete this product?')) {
      dispatch(deleteProduct(id));
    }
  };

  return (
    <div className="main-content">
      <header style={{ marginBottom: '40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div>
          <h1 style={{ fontSize: '2rem', marginBottom: '8px' }}>Inventory</h1>
          <p style={{ color: 'var(--admin-text-muted)' }}>Manage and track your official store listings.</p>
        </div>
        <Link to="/inventory/add" className="btn-primary" style={{ display: 'flex', alignItems: 'center', gap: '8px', textDecoration: 'none' }}>
          <Plus size={18} /> ADD NEW PRODUCT
        </Link>
      </header>

      {/* Filters & Search */}
      <div className="card" style={{ marginBottom: '24px', display: 'flex', justifyContent: 'space-between', padding: '16px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', background: '#f8fafc', padding: '8px 16px', borderRadius: '4px', width: '300px' }}>
          <Search size={18} color="#64748b" />
          <input type="text" placeholder="Search inventory..." style={{ border: 'none', background: 'transparent', outline: 'none', width: '100%' }} />
        </div>
        <div style={{ display: 'flex', gap: '12px' }}>
          <button style={{ display: 'flex', alignItems: 'center', gap: '8px', padding: '8px 16px', border: '1px solid #e2e8f0', background: 'white', cursor: 'pointer' }}>
            <Filter size={16} /> Filter
          </button>
        </div>
      </div>

      {/* Product Table */}
      <div className="card" style={{ padding: '0', overflow: 'hidden' }}>
        <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
          <thead>
            <tr style={{ backgroundColor: '#f8fafc', borderBottom: '1px solid #e2e8f0' }}>
              <th style={thStyle}>PRODUCT</th>
              <th style={thStyle}>COLLECTION</th>
               <th style={thStyle}>PRICE</th>
              <th style={thStyle}>STOCK</th>
              <th style={thStyle}>STATUS</th>
              <th style={thStyle}>ACTIONS</th>
            </tr>
          </thead>
          <tbody>
            {isLoading ? (
              Array(5).fill(0).map((_, i) => <TableRowSkeleton key={i} columns={6} />)
            ) : products && products.length > 0 ? (
              products.map((product) => (
                <tr key={product._id} style={{ borderBottom: '1px solid #f1f5f9' }}>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
                      <img src={product.images?.[0]?.url} alt="" style={{ width: '40px', height: '40px', objectFit: 'cover', background: '#eee' }} />
                      <span style={{ fontWeight: '500' }}>{product.title}</span>
                    </div>
                  </td>
                  <td style={tdStyle}><span style={{ textTransform: 'capitalize' }}>{product.Collection}</span></td>
                   <td style={tdStyle}>₹{product.price}</td>
                  <td style={tdStyle}>{product.stock ?? 0}</td>
                  <td style={tdStyle}>
                    <span style={{ 
                      padding: '4px 12px', 
                      borderRadius: '20px', 
                      fontSize: '0.75rem', 
                      fontWeight: '600',
                      background: '#ecfdf5',
                      color: '#10b981'
                    }}>
                      Active
                    </span>
                  </td>
                  <td style={tdStyle}>
                    <div style={{ display: 'flex', gap: '8px' }}>
                      <button style={actionBtnStyle}><Edit size={16} /></button>
                      <button 
                        style={actionBtnStyle}
                        onClick={() => handleDelete(product._id)}
                      >
                        <Trash2 size={16} color="#ef4444" />
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                  No products found in your inventory.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

const thStyle = {
  padding: '16px 24px',
  fontSize: '0.75rem',
  fontWeight: '600',
  color: '#64748b',
  textTransform: 'uppercase',
  letterSpacing: '0.05em'
};

const tdStyle = {
  padding: '16px 24px',
  fontSize: '0.9rem'
};

const actionBtnStyle = {
  padding: '8px',
  background: 'none',
  border: '1px solid #f1f5f9',
  borderRadius: '4px',
  cursor: 'pointer',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center'
};

export default InventoryPage;
