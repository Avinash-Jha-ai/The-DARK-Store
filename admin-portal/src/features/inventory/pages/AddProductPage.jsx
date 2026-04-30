import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { createProduct, resetProductState } from '../../../store/adminProductSlice';
import { motion } from 'framer-motion';
import { Plus, Upload, X, Loader2, Check } from 'lucide-react';


const AddProductPage = () => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    Collection: 'shirt',
    stock: '10', // Default stock to 10
  });
  const [images, setImages] = useState([]);
  const [previews, setPreviews] = useState([]);

  const dispatch = useDispatch();
  const { isLoading, isSuccess, isError, message } = useSelector((state) => state.adminProducts);

  useEffect(() => {
    if (isSuccess) {
      alert('Product Added Successfully!');
      setFormData({ title: '', description: '', price: '', Collection: 'shirt' });
      setImages([]);
      setPreviews([]);
      dispatch(resetProductState());
    }
    if (isError) {
      alert(message);
      dispatch(resetProductState());
    }
  }, [isSuccess, isError, message, dispatch]);

  const onChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setImages([...images, ...files]);
    
    const newPreviews = files.map(file => URL.createObjectURL(file));
    setPreviews([...previews, ...newPreviews]);
  };

  const removeImage = (index) => {
    const newImages = images.filter((_, i) => i !== index);
    const newPreviews = previews.filter((_, i) => i !== index);
    setImages(newImages);
    setPreviews(newPreviews);
  };

  const onSubmit = (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', formData.title);
    data.append('description', formData.description);
    data.append('price', formData.price);
    data.append('Collection', formData.Collection);
    data.append('stock', formData.stock);
    
    images.forEach(image => {
      data.append('images', image);
    });

    dispatch(createProduct(data));
  };

  return (
    <div className="main-content" style={{ padding: '40px', maxWidth: '1000px', margin: '0 auto' }}>
      <header style={{ marginBottom: '40px' }}>
        <h1 style={{ fontSize: '2rem', fontWeight: '700', color: 'var(--color-on-background)' }}>Launch New Product</h1>
        <p style={{ color: 'var(--color-text-secondary)' }}>Add a new piece to the official The DARK Store collection.</p>
      </header>

      <form onSubmit={onSubmit} className="add-product-form" style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: '40px' }}>
        
        {/* Left: Basic Info */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <section className="form-card" style={{ backgroundColor: 'white', padding: '32px', borderRadius: '4px', border: '1px solid #eee' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '24px', letterSpacing: '0.05em' }}>GENERAL INFORMATION</h3>
            
            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>PRODUCT TITLE</label>
              <input 
                type="text" 
                name="title" 
                value={formData.title} 
                onChange={onChange}
                placeholder="e.g. Italian Wool Overcoat" 
                required 
                minLength={3}
                style={inputStyle} 
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={labelStyle}>DESCRIPTION</label>
              <textarea 
                name="description" 
                value={formData.description} 
                onChange={onChange}
                placeholder="Describe the silhouette, fabric, and craftsmanship..." 
                required 
                minLength={5}
                style={{ ...inputStyle, height: '150px', resize: 'none' }} 
              />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>PRICE (INR)</label>
                <input 
                  type="number" 
                  name="price" 
                  value={formData.price} 
                  onChange={onChange}
                  placeholder="0.00" 
                  required 
                  style={inputStyle} 
                />
              </div>
              <div>
                <label style={labelStyle}>CURRENCY</label>
                <input type="text" value="INR" disabled style={{ ...inputStyle, backgroundColor: '#f9f9f9', cursor: 'not-allowed' }} />
              </div>
            </div>
          </section>

          <section className="form-card" style={{ backgroundColor: 'white', padding: '32px', borderRadius: '4px', border: '1px solid #eee' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '24px', letterSpacing: '0.05em' }}>VARIANTS & LOGISTICS</h3>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '20px' }}>
              <div>
                <label style={labelStyle}>COLLECTION</label>
                <select name="Collection" value={formData.Collection} onChange={onChange} style={inputStyle}>
                  <option value="shirt">Shirts</option>
                  <option value="t-shirt">T-Shirts</option>
                  <option value="cotton-linen">Cotton Linen</option>
                  <option value="polos">Polos</option>
                  <option value="classic-fit-tees">Classic Fit Tees</option>
                  <option value="outerwear">Outerwear</option>
                  <option value="sneakers">Sneakers</option>
                  <option value="all-accessories">All Accessories</option>
                  <option value="joggers">Joggers</option>
                  <option value="jeans">Jeans</option>
                  <option value="pants">Pants</option>
                  <option value="cargos">Cargos</option>
                </select>
              </div>
              <div>
                <label style={labelStyle}>STOCK QUANTITY</label>
                <input 
                  type="number" 
                  name="stock" 
                  value={formData.stock} 
                  onChange={onChange}
                  placeholder="0" 
                  required 
                  style={inputStyle} 
                />
              </div>
            </div>
          </section>
        </div>

        {/* Right: Media & Publish */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: '32px' }}>
          <section className="form-card" style={{ backgroundColor: 'white', padding: '32px', borderRadius: '4px', border: '1px solid #eee' }}>
            <h3 style={{ fontSize: '1rem', fontWeight: '600', marginBottom: '24px', letterSpacing: '0.05em' }}>MEDIA</h3>
            
            <div 
              style={{
                border: '2px dashed #ddd',
                padding: '40px 20px',
                textAlign: 'center',
                cursor: 'pointer',
                transition: 'var(--transition-fast)',
                backgroundColor: '#fafafa'
              }}
              onMouseEnter={(e) => e.currentTarget.style.borderColor = 'var(--admin-primary)'}
              onMouseLeave={(e) => e.currentTarget.style.borderColor = '#ddd'}
              onClick={() => document.getElementById('file-upload').click()}
            >
              <Upload size={32} style={{ color: '#aaa', marginBottom: '12px' }} />
              <p style={{ fontSize: '0.8rem', color: 'var(--color-text-secondary)' }}>Click to upload product imagery</p>
              <input id="file-upload" type="file" multiple onChange={handleImageChange} hidden />
            </div>

            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '8px', marginTop: '20px' }}>
              {previews.map((src, i) => (
                <div key={i} style={{ position: 'relative', height: '80px', border: '1px solid #eee' }}>
                  <img src={src} style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
                  <button 
                    type="button"
                    onClick={(e) => { e.stopPropagation(); removeImage(i); }}
                    style={{ position: 'absolute', top: '-5px', right: '-5px', backgroundColor: 'black', color: 'white', border: 'none', borderRadius: '50%', width: '20px', height: '20px', display: 'flex', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }}
                  >
                    <X size={12} />
                  </button>
                </div>
              ))}
            </div>
          </section>

          <button
            type="submit"
            disabled={isLoading}
            style={{
              width: '100%',
              padding: '20px',
              backgroundColor: 'var(--admin-primary)',
              color: 'white',
              border: 'none',
              fontWeight: '700',
              fontSize: '1rem',
              letterSpacing: '0.1em',
              cursor: isLoading ? 'not-allowed' : 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '12px',
              boxShadow: '0 10px 15px -3px rgba(0, 0, 0, 0.1)'
            }}
          >
            {isLoading ? <Loader2 className="animate-spin" /> : <Plus size={20} />}
            {isLoading ? 'UPLOADING...' : 'PUBLISH PRODUCT'}
          </button>
        </div>

      </form>
      <style>{`
        @media (max-width: 900px) {
          .add-product-form { grid-template-columns: 1fr !important; }
          .main-content { padding: 20px !important; }
        }
      `}</style>
    </div>
  );
};

const labelStyle = {
  display: 'block',
  fontSize: '0.7rem',
  fontWeight: '700',
  letterSpacing: '0.1em',
  color: 'var(--color-text-secondary)',
  marginBottom: '8px'
};

const inputStyle = {
  width: '100%',
  padding: '12px 16px',
  border: '1px solid #eee',
  outline: 'none',
  fontSize: '0.95rem',
  transition: 'var(--transition-fast)',
};

export default AddProductPage;
