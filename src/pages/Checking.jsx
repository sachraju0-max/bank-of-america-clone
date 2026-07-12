import React from 'react';
import '../index.css';

function Checking() {
  return (
    <div style={{ backgroundColor: '#f4f5f7', minHeight: '80vh', paddingBottom: '40px' }}>
      <div style={{ backgroundColor: '#e31837', color: '#fff', padding: '30px 40px' }}>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '300' }}>Checking Accounts</h1>
      </div>
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '28px', color: '#012169', fontWeight: '300' }}>Find the checking account that works for you</h2>
        <div style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#012169', fontSize: '22px', marginTop: 0 }}>Advantage SafeBalance</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>A checking account that helps you stay within your balance and avoid overdraft fees.</p>
            <button style={{ backgroundColor: '#012169', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Open Account</button>
          </div>
          <div style={{ flex: '1 1 300px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#012169', fontSize: '22px', marginTop: 0 }}>Advantage Plus</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>Our most popular everyday checking account with flexible options to waive the monthly fee.</p>
            <button style={{ backgroundColor: '#012169', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Open Account</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Checking;
