import React from 'react';
import { Globe, Mail, MessageCircle } from 'lucide-react';

const Footer = () => {
  return (
    <footer style={{ 
      backgroundColor: 'var(--color-surface-container)', 
      padding: '80px 60px 40px', 
      borderTop: '1px solid rgba(0,0,0,0.05)' 
    }}>
      <div style={{ 
        display: 'grid', 
        gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', 
        gap: '40px',
        marginBottom: '60px'
      }}>
        <div style={{ gridColumn: 'span 2' }}>
          <h2 style={{ fontSize: '1.5rem', marginBottom: '24px', letterSpacing: '0.2em' }}>The DARK Store</h2>
          <p style={{ color: 'var(--color-text-secondary)', maxWidth: '300px', fontSize: '0.9rem' }}>
            A global destination for luxury fashion, curated with an eye for detail and a soul for sustainability.
          </p>
        </div>
        <div>
          <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.2em', marginBottom: '24px' }}>COLLECTIONS</h4>
          <ul style={{ listStyle: 'none', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--color-text-secondary)' }}>
            <li>Women</li>
            <li>Men</li>
            <li>Accessories</li>
            <li>Limited Edition</li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.2em', marginBottom: '24px' }}>ASSISTANCE</h4>
          <ul style={{ listStyle: 'none', fontSize: '0.9rem', display: 'flex', flexDirection: 'column', gap: '12px', color: 'var(--color-text-secondary)' }}>
            <li>Shipping Info</li>
            <li>Returns</li>
            <li>Contact Us</li>
            <li>Size Guide</li>
          </ul>
        </div>
        <div>
          <h4 style={{ fontSize: '0.8rem', letterSpacing: '0.2em', marginBottom: '24px' }}>SOCIAL</h4>
          <div style={{ display: 'flex', gap: '20px' }}>
            <Globe size={20} />
            <Mail size={20} />
            <MessageCircle size={20} />
          </div>
        </div>
      </div>
      <div style={{ 
        borderTop: '1px solid rgba(0,0,0,0.05)', 
        paddingTop: '40px', 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center',
        fontSize: '0.75rem',
        color: 'var(--color-text-secondary)',
        letterSpacing: '0.05em'
      }}>
        <span>© 2026 The DARK Store DIGITAL S.P.A. ALL RIGHTS RESERVED.</span>
        <div style={{ display: 'flex', gap: '24px' }}>
          <span>PRIVACY POLICY</span>
          <span>TERMS OF SERVICE</span>
        </div>
      </div>
      <div style={{ 
        backgroundColor: 'black', 
        color: 'white', 
        padding: '24px 60px', 
        margin: '60px -60px -40px', 
        textAlign: 'center', 
        fontSize: '0.7rem', 
        letterSpacing: '0.2em' 
      }}>
        HANDCRAFTED WITH ❤️ BY The DARK Store DIGITAL
      </div>
    </footer>
  );
};

export default Footer;
