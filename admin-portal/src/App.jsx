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
  const { user } = useSelector((state) => state.adminAuth);
  const dispatch = useDispatch();

  React.useEffect(() => {
    dispatch(getAdminMe());
  }, [dispatch]);

  return (
    <Router>
      <Routes>
        <Route path="/login" element={<AdminLoginPage />} />
        <Route
          path="/*"
          element={
            user ? (
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
