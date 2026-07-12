import React from 'react';
import '../index.css';

function Savings() {
  return (
    <div style={{ backgroundColor: '#f4f5f7', minHeight: '80vh', paddingBottom: '40px' }}>
      <div style={{ backgroundColor: '#e31837', color: '#fff', padding: '30px 40px' }}>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '300' }}>Savings & CDs</h1>
      </div>
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '28px', color: '#012169', fontWeight: '300' }}>Start saving for what matters most</h2>
        <div style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#012169', fontSize: '22px', marginTop: 0 }}>Advantage Savings</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>Earn competitive interest rates and easily transfer funds to grow your savings faster.</p>
            <button style={{ backgroundColor: '#012169', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Open Account</button>
          </div>
          <div style={{ flex: '1 1 300px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#012169', fontSize: '22px', marginTop: 0 }}>Certificates of Deposit (CDs)</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>Lock in a guaranteed return with our flexible term CDs for secure, predictable growth.</p>
            <button style={{ backgroundColor: '#012169', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>View Rates</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Savings;
