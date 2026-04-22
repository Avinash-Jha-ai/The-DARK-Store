import React, { useEffect } from 'react'
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom'
import { useSelector, useDispatch } from 'react-redux'
import { getMe } from './features/auth/state/authSlice'
import LoginPage from './features/auth/pages/LoginPage'
import RegisterPage from './features/auth/pages/RegisterPage'
import HomePage from './features/products/pages/HomePage'
import ProductDetailPage from './features/products/pages/ProductDetailPage'
import CollectionPage from './features/products/pages/CollectionPage'
import SearchPage from './features/products/pages/SearchPage'
import AllProductsPage from './features/products/pages/AllProductsPage'
import CollectionsPage from './features/products/pages/CollectionsPage'
import WishlistPage from './features/wishlist/pages/WishlistPage'
import MyOrdersPage from './features/orders/pages/MyOrdersPage'
import './styles/global.css'

function App() {
  const { user } = useSelector((state) => state.auth)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(getMe())
  }, [dispatch])

  return (
    <Router>
      <div className="app-container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/login" element={!user ? <LoginPage /> : <Navigate to="/" />} />
          <Route path="/register" element={!user ? <RegisterPage /> : <Navigate to="/" />} />
          <Route path="/product/:id" element={<ProductDetailPage />} />
          <Route path="/collection/:collectionName" element={<CollectionPage />} />
          <Route path="/search" element={<SearchPage />} />
          <Route path="/products" element={<AllProductsPage />} />
          <Route path="/collections" element={<CollectionsPage />} />
          <Route path="/wishlist" element={<WishlistPage />} />
          <Route path="/my-orders" element={<MyOrdersPage />} />
        </Routes>
      </div>
    </Router>
  )
}

export default App
