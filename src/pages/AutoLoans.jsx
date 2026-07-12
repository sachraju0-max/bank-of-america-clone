import React from 'react';
import '../index.css';

function AutoLoans() {
  return (
    <div style={{ backgroundColor: '#f4f5f7', minHeight: '80vh', paddingBottom: '40px' }}>
      <div style={{ backgroundColor: '#e31837', color: '#fff', padding: '30px 40px' }}>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '300' }}>Auto Loans</h1>
      </div>
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        <h2 style={{ fontSize: '28px', color: '#012169', fontWeight: '300' }}>Finance your next vehicle with Bank of America</h2>
        <div style={{ display: 'flex', gap: '20px', marginTop: '30px', flexWrap: 'wrap' }}>
          <div style={{ flex: '1 1 300px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#012169', fontSize: '22px', marginTop: 0 }}>New Auto Loans</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>Get prequalified for a new car loan with competitive rates and flexible terms.</p>
            <button style={{ backgroundColor: '#012169', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Apply Now</button>
          </div>
          <div style={{ flex: '1 1 300px', backgroundColor: '#fff', padding: '30px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
            <h3 style={{ color: '#012169', fontSize: '22px', marginTop: 0 }}>Auto Refinance</h3>
            <p style={{ color: '#666', lineHeight: '1.6' }}>Refinance your current auto loan to potentially lower your rate or monthly payment.</p>
            <button style={{ backgroundColor: '#012169', color: '#fff', border: 'none', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer', fontWeight: 'bold' }}>Learn More</button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default AutoLoans;
