import React, { useState } from 'react';
import '../index.css';

function Mortgage() {
  const [activeTab, setActiveTab] = useState('mortgages');

  return (
    <div className="mortgage-page" style={{ backgroundColor: '#f4f5f7', minHeight: '80vh', paddingBottom: '40px' }}>
      
      {/* Title Section */}
      <div style={{ backgroundColor: '#e31837', color: '#fff', padding: '30px 40px' }}>
        <h1 style={{ margin: 0, fontSize: '32px', fontWeight: '300' }}>Home Loans and Rates</h1>
      </div>

      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '40px 20px' }}>
        {/* Goal Selection */}
        <div style={{ textAlign: 'center', marginBottom: '40px' }}>
          <h2 style={{ fontSize: '24px', fontWeight: '300', color: '#333' }}>Let us help find the home loan that's right for you</h2>
        </div>

        {/* Tabs */}
        <div style={{ display: 'flex', justifyContent: 'center', borderBottom: '2px solid #ccc', marginBottom: '30px' }}>
          <button 
            onClick={() => setActiveTab('mortgages')}
            style={{ 
              background: 'none', border: 'none', padding: '15px 30px', fontSize: '18px', cursor: 'pointer',
              color: activeTab === 'mortgages' ? '#012169' : '#666',
              borderBottom: activeTab === 'mortgages' ? '4px solid #012169' : '4px solid transparent',
              fontWeight: activeTab === 'mortgages' ? 'bold' : 'normal',
              marginBottom: '-2px'
            }}
          >
            Mortgages
          </button>
          <button 
            onClick={() => setActiveTab('refinancing')}
            style={{ 
              background: 'none', border: 'none', padding: '15px 30px', fontSize: '18px', cursor: 'pointer',
              color: activeTab === 'refinancing' ? '#012169' : '#666',
              borderBottom: activeTab === 'refinancing' ? '4px solid #012169' : '4px solid transparent',
              fontWeight: activeTab === 'refinancing' ? 'bold' : 'normal',
              marginBottom: '-2px'
            }}
          >
            Refinancing
          </button>
          <button 
            onClick={() => setActiveTab('homeEquity')}
            style={{ 
              background: 'none', border: 'none', padding: '15px 30px', fontSize: '18px', cursor: 'pointer',
              color: activeTab === 'homeEquity' ? '#012169' : '#666',
              borderBottom: activeTab === 'homeEquity' ? '4px solid #012169' : '4px solid transparent',
              fontWeight: activeTab === 'homeEquity' ? 'bold' : 'normal',
              marginBottom: '-2px'
            }}
          >
            Home Equity
          </button>
        </div>

        {/* Tab Content */}
        <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.1)' }}>
          {activeTab === 'mortgages' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '300', marginBottom: '20px', color: '#012169' }}>
                Our home loans — and low home loan rates — are designed to meet your specific home financing needs
              </h2>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
                <button style={{ backgroundColor: '#012169', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Get Started</button>
                <button style={{ backgroundColor: '#fff', color: '#012169', border: '2px solid #012169', padding: '12px 24px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Learn more about mortgages</button>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: '300', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>Today's competitive mortgage rates</h3>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #ccc', color: '#666' }}>
                    <th style={{ padding: '15px 10px' }}>Term</th>
                    <th style={{ padding: '15px 10px' }}>Rate</th>
                    <th style={{ padding: '15px 10px' }}>APR</th>
                    <th style={{ padding: '15px 10px' }}>Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px 10px', fontWeight: 'bold', color: '#012169' }}>30-year fixed</td>
                    <td style={{ padding: '15px 10px', fontSize: '18px' }}>6.625%</td>
                    <td style={{ padding: '15px 10px', fontSize: '18px' }}>6.741%</td>
                    <td style={{ padding: '15px 10px' }}>0.254</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee', backgroundColor: '#f9f9f9' }}>
                    <td style={{ padding: '15px 10px', fontWeight: 'bold', color: '#012169' }}>15-year fixed</td>
                    <td style={{ padding: '15px 10px', fontSize: '18px' }}>6.125%</td>
                    <td style={{ padding: '15px 10px', fontSize: '18px' }}>6.302%</td>
                    <td style={{ padding: '15px 10px' }}>0.312</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px 10px', fontWeight: 'bold', color: '#012169' }}>5y/6m ARM variable</td>
                    <td style={{ padding: '15px 10px', fontSize: '18px' }}>6.375%</td>
                    <td style={{ padding: '15px 10px', fontSize: '18px' }}>7.251%</td>
                    <td style={{ padding: '15px 10px' }}>0.125</td>
                  </tr>
                </tbody>
              </table>
              <p style={{ fontSize: '12px', color: '#666', marginTop: '20px' }}>Rates based on a $200,000 loan in ZIP code 95464 with excellent credit.</p>
            </div>
          )}

          {activeTab === 'refinancing' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '300', marginBottom: '20px', color: '#012169' }}>
                Refinance your mortgage with our low refinance rates — and potentially lower your monthly payment
              </h2>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
                <button style={{ backgroundColor: '#012169', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Get started</button>
                <button style={{ backgroundColor: '#fff', color: '#012169', border: '2px solid #012169', padding: '12px 24px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Learn more about refinance</button>
              </div>

              <h3 style={{ fontSize: '20px', fontWeight: '300', borderBottom: '1px solid #ccc', paddingBottom: '10px', marginBottom: '20px' }}>Today's competitive refinance rates</h3>
              
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid #ccc', color: '#666' }}>
                    <th style={{ padding: '15px 10px' }}>Term</th>
                    <th style={{ padding: '15px 10px' }}>Rate</th>
                    <th style={{ padding: '15px 10px' }}>APR</th>
                    <th style={{ padding: '15px 10px' }}>Points</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid #eee' }}>
                    <td style={{ padding: '15px 10px', fontWeight: 'bold', color: '#012169' }}>30-year fixed</td>
                    <td style={{ padding: '15px 10px', fontSize: '18px' }}>6.750%</td>
                    <td style={{ padding: '15px 10px', fontSize: '18px' }}>6.852%</td>
                    <td style={{ padding: '15px 10px' }}>0.300</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid #eee', backgroundColor: '#f9f9f9' }}>
                    <td style={{ padding: '15px 10px', fontWeight: 'bold', color: '#012169' }}>15-year fixed</td>
                    <td style={{ padding: '15px 10px', fontSize: '18px' }}>6.250%</td>
                    <td style={{ padding: '15px 10px', fontSize: '18px' }}>6.415%</td>
                    <td style={{ padding: '15px 10px' }}>0.450</td>
                  </tr>
                </tbody>
              </table>
            </div>
          )}

          {activeTab === 'homeEquity' && (
            <div>
              <h2 style={{ fontSize: '24px', fontWeight: '300', marginBottom: '20px', color: '#012169' }}>
                Leverage the equity in your home and consolidate debt or pay for major expenses
              </h2>
              <div style={{ display: 'flex', gap: '15px', marginBottom: '40px' }}>
                <button style={{ backgroundColor: '#012169', color: '#fff', border: 'none', padding: '12px 24px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Apply now</button>
                <button style={{ backgroundColor: '#fff', color: '#012169', border: '2px solid #012169', padding: '12px 24px', borderRadius: '4px', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Learn more about home equity</button>
              </div>

              <div style={{ backgroundColor: '#f9f9f9', padding: '30px', borderRadius: '8px', textAlign: 'center', border: '1px solid #eee' }}>
                <h3 style={{ margin: '0 0 15px 0', color: '#012169', fontSize: '22px' }}>Home Equity Line of Credit (HELOC)</h3>
                <p style={{ fontSize: '16px', color: '#333', marginBottom: '25px' }}>Access funds when you need them, up to your credit limit, with variable interest rates.</p>
                <p style={{ fontSize: '48px', fontWeight: '300', color: '#e31837', margin: '0 0 10px 0' }}>8.99% <span style={{ fontSize: '18px', color: '#666' }}>Variable APR</span></p>
                <p style={{ fontSize: '13px', color: '#666' }}>Introductory rate for the first 6 months. After that, variable APRs range from 9.24% to 11.24% based on creditworthiness.</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default Mortgage;
