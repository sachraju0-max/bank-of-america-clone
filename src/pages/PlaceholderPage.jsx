import React from 'react';
import '../index.css';

function PlaceholderPage() {
  return (
    <div style={{ backgroundColor: '#f4f5f7', minHeight: '80vh', paddingBottom: '40px', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
      <div style={{ maxWidth: '600px', backgroundColor: '#fff', padding: '50px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center' }}>
        <div style={{ color: '#012169', marginBottom: '20px' }}>
          <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <circle cx="12" cy="12" r="10"></circle>
            <line x1="12" y1="8" x2="12" y2="12"></line>
            <line x1="12" y1="16" x2="12.01" y2="16"></line>
          </svg>
        </div>
        <h2 style={{ fontSize: '28px', color: '#012169', fontWeight: '300', marginTop: 0 }}>Coming Soon</h2>
        <p style={{ color: '#666', lineHeight: '1.6', fontSize: '18px' }}>This page is currently being upgraded to our new modernized platform. Please check back later.</p>
        <button onClick={() => window.history.back()} style={{ backgroundColor: '#e31837', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold', marginTop: '20px', fontSize: '16px' }}>Go Back</button>
      </div>
    </div>
  );
}

export default PlaceholderPage;
