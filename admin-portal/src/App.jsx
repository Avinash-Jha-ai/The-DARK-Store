import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import InventoryPage from './features/inventory/pages/InventoryPage';
import AddProductPage from './features/inventory/pages/AddProductPage';
import AdminLoginPage from './features/auth/pages/AdminLoginPage';
import OrdersPage from './features/orders/pages/OrdersPage';
import { useSelector, useDispatch } from 'react-redux';
import { getAdminMe } from './features/auth/state/adminAuthSlice';
import { Navigate } from 'react-router-dom';
import './styles/admin-global.css';

function App() {
  const { user, isLoading } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAdminMe());
  }, [dispatch]);

  if (isLoading) {
    return (
      <div style={{ height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', backgroundColor: '#f5f6f7' }}>
        <p style={{ letterSpacing: '0.2em', fontWeight: '700' }}>LOADING SECURE ACCESS...</p>
      </div>
    );
  }

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLoginPage />} />
        <Route
          path="/*"
          element={
            user && user.role === 'admin' ? (
              <div className="admin-layout" style={{ display: 'flex' }}>
                <Sidebar />
                <Routes>
                  <Route path="/" element={<Navigate to="/inventory" replace />} />
                  <Route path="/inventory" element={<InventoryPage />} />
                  <Route path="/inventory/add" element={<AddProductPage />} />
                  <Route path="/orders" element={<OrdersPage />} />
                </Routes>
              </div>
            ) : (
              <Navigate to="/login" />
            )
          }
        />
      </Routes>
    </Router>
  );
}

export default App;
