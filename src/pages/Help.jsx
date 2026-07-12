import React from 'react';
import '../index.css';

function Help() {
  return (
    <div style={{ backgroundColor: '#f4f5f7', minHeight: '80vh', paddingBottom: '40px' }}>
      <div style={{ backgroundColor: '#012169', color: '#fff', padding: '40px 40px', textAlign: 'center' }}>
        <h1 style={{ margin: 0, fontSize: '36px', fontWeight: '300' }}>How can we help you?</h1>
        <div style={{ marginTop: '20px', maxWidth: '600px', margin: '20px auto 0' }}>
          <input type="text" placeholder="Search our help center..." style={{ width: '100%', padding: '15px', borderRadius: '4px', border: 'none', fontSize: '16px' }} />
        </div>
      </div>
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '24px', color: '#333', fontWeight: '300', textAlign: 'center' }}>Popular Topics</h2>
        <div style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap', justifyContent: 'center' }}>
          {['Lost or Stolen Card', 'Online Banking Support', 'Mobile App Help', 'Dispute a Charge', 'Find a Location'].map(topic => (
            <div key={topic} style={{ flex: '1 1 200px', maxWidth: '250px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)', textAlign: 'center', cursor: 'pointer' }}>
              <div style={{ color: '#012169', fontWeight: 'bold' }}>{topic}</div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default Help;
