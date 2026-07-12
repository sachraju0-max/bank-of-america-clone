import React from 'react';
import '../index.css';

function CreditCards() {
  return (
    <div style={{ backgroundColor: '#f4f5f7', minHeight: '80vh', paddingBottom: '40px' }}>
      <div style={{ backgroundColor: '#e31837', color: '#fff', padding: '30px 40px' }}>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '300' }}>Credit Cards</h1>
      </div>
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '28px', color: '#012169', fontWeight: '300' }}>Prequalify for a credit card with no impact to your credit score</h2>
        <div style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', backgroundColor: '#012169', color: '#fff', padding: '50px', borderRadius: '8px', textAlign: 'center' }}>
            <h3 style={{ fontSize: '24px', fontWeight: '300', marginBottom: '20px' }}>See your personalized offers</h3>
            <button style={{ backgroundColor: '#fff', color: '#012169', border: 'none', padding: '15px 30px', borderRadius: '25px', cursor: 'pointer', fontWeight: 'bold', fontSize: '16px' }}>See if you prequalify</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreditCards;
