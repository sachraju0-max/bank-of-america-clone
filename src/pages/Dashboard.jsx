import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Home');
  const [transferState, setTransferState] = useState('idle');
  const [payee, setPayee] = useState('');
  
  // Universal Modal State for non-implemented links
  const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '', loading: false });

  const openModal = (title, message) => {
    setModalState({ isOpen: true, title, message: 'Processing your request...', loading: true });
    // Simulate network request before showing the actual message
    setTimeout(() => {
      setModalState({ isOpen: true, title, message, loading: false });
    }, 1500);
  };
  
  const closeModal = () => setModalState({ isOpen: false, title: '', message: '', loading: false });

  const handleAddPayee = () => {
    setTransferState('adding');
    setTimeout(() => {
      setPayee('Tirtho Acc No 922010042775726');
      setTransferState('pay');
    }, 1500);
  };

  const handlePay = () => {
    setTransferState('processing');
    setTimeout(() => {
      setTransferState('success');
    }, 2000);
  };

  const navItems = ['Home', 'Accounts', 'Send Money', 'Cards', 'FD/RD', 'Bills & Recharges', 'Loans', 'Invest', 'Insure'];

  return (
    <div style={{ backgroundColor: '#e2e8f0', minHeight: '100vh', fontFamily: 'Arial, sans-serif' }}>
      
      {/* Top Header - BofA Proper */}
      <div style={{ backgroundColor: '#fff', color: '#012169', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '4px solid #e31837' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '15px' }}>
          <img src="/images/bank_of_america_logo.svg" alt="Bank of America" width="260" style={{ marginTop: '5px' }} />
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#f4f5f7', padding: '8px 15px', borderRadius: '20px', border: '1px solid #ccc' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="How can we help you?" style={{ border: 'none', background: 'transparent', color: '#333', outline: 'none', marginLeft: '10px', width: '200px', fontSize: '14px' }} />
          </div>
          <span style={{ fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => openModal('Help & Support', 'Our secure messaging center is currently undergoing scheduled maintenance. Please try again later or contact us at 1-800-432-1000.')}>Help & Support</span>
          <span style={{ fontSize: '14px', cursor: 'pointer', fontWeight: 'bold' }} onClick={() => openModal('Secure Messages', 'You currently have 0 unread messages in your inbox.')}>Messages (0)</span>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px', cursor: 'pointer', borderLeft: '1px solid #ccc', paddingLeft: '20px' }} onClick={() => navigate('/')}>
            <span style={{ fontWeight: 'bold', color: '#e31837' }}>Sign Out</span>
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="#e31837" strokeWidth="2"><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          </div>
        </div>
      </div>

      {/* Secondary Navigation */}
      <div style={{ backgroundColor: '#012169', padding: '0 40px', display: 'flex', gap: '30px' }}>
        {navItems.map(item => (
          <div 
            key={item} 
            onClick={() => setActiveTab(item)}
            style={{ 
              padding: '20px 0', 
              cursor: 'pointer', 
              color: activeTab === item ? '#fff' : '#cbd5e1',
              borderBottom: activeTab === item ? '3px solid #e31837' : '3px solid transparent',
              fontWeight: activeTab === item ? 'bold' : 'normal',
              fontSize: '15px'
            }}
          >
            {item}
          </div>
        ))}
      </div>

      {/* Main Content Area */}
      <div style={{ maxWidth: '1200px', margin: '40px auto', padding: '0 20px' }}>
        
        {/* Welcome Text */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '28px', color: '#333', fontWeight: '300', margin: '0 0 5px 0' }}>Welcome, Tirthankar Ghosh</h1>
          <div style={{ color: '#666', fontSize: '14px' }}>Last logged in: Today at 05:58 PM</div>
        </div>

        {/* ----------------- HOME TAB ----------------- */}
        {activeTab === 'Home' && (
          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: '30px' }}>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              
              {/* Accounts Summary Card */}
              <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                  <h2 style={{ fontSize: '20px', color: '#012169', margin: 0 }}>Deposit Accounts</h2>
                  <button onClick={() => setActiveTab('Accounts')} style={{ color: '#012169', background: 'transparent', border: '1px solid #012169', padding: '8px 15px', borderRadius: '4px', cursor: 'pointer', fontSize: '13px', fontWeight: 'bold' }}>View All Activity</button>
                </div>
                
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderTop: '1px solid #eee' }}>
                  <div>
                    <div style={{ color: '#012169', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActiveTab('Accounts')}>Advantage Plus Banking</div>
                    <div style={{ color: '#666', fontSize: '13px', marginTop: '5px' }}>Account ending in 2378</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#333' }}>$63,800.00</div>
                    <div style={{ color: '#666', fontSize: '13px' }}>Available Balance</div>
                  </div>
                </div>

                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px 0', borderTop: '1px solid #eee' }}>
                  <div>
                    <div style={{ color: '#012169', fontSize: '16px', fontWeight: 'bold', cursor: 'pointer' }}>Advantage Savings</div>
                    <div style={{ color: '#666', fontSize: '13px', marginTop: '5px' }}>Account ending in 9912</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <div style={{ fontSize: '22px', fontWeight: 'bold', color: '#333' }}>$12,450.00</div>
                    <div style={{ color: '#666', fontSize: '13px' }}>Available Balance</div>
                  </div>
                </div>
              </div>

              {/* Quick Transfer Widget */}
              <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '30px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
                <h2 style={{ fontSize: '20px', color: '#012169', margin: '0 0 20px 0' }}>Quick Transfer</h2>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
                  <select style={{ flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}>
                    <option>From: Advantage Plus (...2378)</option>
                    <option>From: Advantage Savings (...9912)</option>
                  </select>
                  <span style={{ fontSize: '20px', color: '#999' }}>→</span>
                  <select style={{ flex: 1, padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }}>
                    <option>To: Advantage Savings (...9912)</option>
                    <option>To: External Payee</option>
                  </select>
                  <input type="text" placeholder="$ Amount" style={{ width: '120px', padding: '12px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '14px' }} />
                  <button onClick={() => setActiveTab('Send Money')} style={{ backgroundColor: '#012169', color: '#fff', border: 'none', padding: '12px 25px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Transfer</button>
                </div>
              </div>

            </div>

            {/* Right Sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: '25px' }}>
              <div style={{ backgroundColor: '#fff', borderRadius: '8px', padding: '25px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
                <h3 style={{ margin: '0 0 15px 0', fontSize: '18px', color: '#333' }}>Credit Cards</h3>
                <div style={{ padding: '15px 0', borderBottom: '1px solid #eee' }}>
                  <div style={{ color: '#012169', fontWeight: 'bold', cursor: 'pointer' }} onClick={() => setActiveTab('Cards')}>Cash Rewards Visa Signature</div>
                  <div style={{ color: '#666', fontSize: '13px', margin: '5px 0' }}>Ending in 4419</div>
                  <div style={{ fontSize: '18px', fontWeight: 'bold', color: '#333' }}>$1,240.50 <span style={{ fontSize: '12px', color: '#666', fontWeight: 'normal' }}>Current Balance</span></div>
                </div>
                <button onClick={() => setActiveTab('Bills & Recharges')} style={{ width: '100%', padding: '10px', marginTop: '15px', backgroundColor: '#e31837', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Pay Bill</button>
              </div>

              <div style={{ backgroundColor: '#f0f4f8', borderRadius: '8px', padding: '25px', border: '1px solid #d9e2ec' }}>
                <h3 style={{ margin: '0 0 10px 0', fontSize: '16px', color: '#012169' }}>FICO® Score</h3>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#2e7d32' }}>785</div>
                <div style={{ fontSize: '13px', color: '#666', marginTop: '5px' }}>Updated: 2 days ago. Status: Excellent</div>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- ACCOUNTS TAB ----------------- */}
        {activeTab === 'Accounts' && (
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '2px solid #012169', paddingBottom: '20px', marginBottom: '30px' }}>
              <div>
                <h1 style={{ margin: '0 0 10px 0', fontSize: '26px', color: '#012169' }}>Advantage Plus Banking</h1>
                <div style={{ color: '#666', fontSize: '15px' }}>Account No: 76289112378 | Routing: 673866282</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ fontSize: '36px', fontWeight: 'bold', color: '#333' }}>$63,800.00</div>
                <div style={{ color: '#666', fontSize: '14px' }}>Available Balance</div>
                <div style={{ color: '#e31837', fontSize: '13px', marginTop: '5px' }}>Hold/Lien Amount: $1,200.00</div>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', color: '#333', margin: 0 }}>Recent Transactions</h2>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Search transactions..." style={{ padding: '10px', border: '1px solid #ccc', borderRadius: '4px', width: '250px' }} />
                <button style={{ backgroundColor: '#eee', border: '1px solid #ccc', padding: '10px 20px', borderRadius: '4px', cursor: 'pointer' }}>Filter</button>
              </div>
            </div>

            <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '15px' }}>
              <thead>
                <tr style={{ borderBottom: '2px solid #ccc', backgroundColor: '#f9f9f9' }}>
                  <th style={{ padding: '15px', color: '#333' }}>Date</th>
                  <th style={{ padding: '15px', color: '#333' }}>Description</th>
                  <th style={{ padding: '15px', color: '#333' }}>Type</th>
                  <th style={{ padding: '15px', color: '#333', textAlign: 'right' }}>Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px', color: '#555' }}>Jul 03, 2026</td>
                  <td style={{ padding: '15px', color: '#333', fontWeight: 'bold' }}>AMB CHRG INCL GST JUN26</td>
                  <td style={{ padding: '15px', color: '#666' }}>Fee</td>
                  <td style={{ padding: '15px', color: '#e31837', textAlign: 'right' }}>-$36.98</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px', color: '#555' }}>Jul 01, 2026</td>
                  <td style={{ padding: '15px', color: '#333', fontWeight: 'bold' }}>INTEREST PAID TILL 30-JUN</td>
                  <td style={{ padding: '15px', color: '#666' }}>Deposit</td>
                  <td style={{ padding: '15px', color: '#2e7d32', textAlign: 'right' }}>+$22.00</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px', color: '#555' }}>Jun 20, 2026</td>
                  <td style={{ padding: '15px', color: '#333', fontWeight: 'bold' }}>UPI-DAKSHINA PRASAD SARM</td>
                  <td style={{ padding: '15px', color: '#666' }}>Transfer</td>
                  <td style={{ padding: '15px', color: '#e31837', textAlign: 'right' }}>-$200.00</td>
                </tr>
                <tr style={{ borderBottom: '1px solid #eee' }}>
                  <td style={{ padding: '15px', color: '#555' }}>Jun 13, 2026</td>
                  <td style={{ padding: '15px', color: '#333', fontWeight: 'bold' }}>JANMAR26 INSTAALERTCHG</td>
                  <td style={{ padding: '15px', color: '#666' }}>Fee</td>
                  <td style={{ padding: '15px', color: '#e31837', textAlign: 'right' }}>-$0.24</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}

        {/* ----------------- SEND MONEY TAB ----------------- */}
        {activeTab === 'Send Money' && (
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', maxWidth: '800px', margin: '0 auto', border: '1px solid #eaeaea' }}>
            <h1 style={{ fontSize: '26px', color: '#012169', marginBottom: '30px' }}>Transfer Funds</h1>
            
            {transferState === 'idle' && (
              <div>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px' }}>Select Recipient</label>
                  <input type="text" placeholder="Search by name, account number, or email" style={{ width: '100%', padding: '15px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '15px', boxSizing: 'border-box' }} />
                </div>
                
                <h3 style={{ fontSize: '16px', color: '#333', marginBottom: '15px' }}>Saved Payees</h3>
                <div 
                  onClick={handleAddPayee}
                  style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '150px', height: '150px', border: '2px dashed #012169', borderRadius: '8px', cursor: 'pointer', backgroundColor: '#f8f9fa', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: '30px', color: '#012169', marginBottom: '10px' }}>+</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#012169' }}>Add New Payee</div>
                </div>
              </div>
            )}

            {transferState === 'adding' && (
              <div style={{ textAlign: 'center', padding: '60px' }}>
                <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #012169', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                <h3 style={{ marginTop: '20px', color: '#333' }}>Connecting to Zelle / Gateway...</h3>
              </div>
            )}

            {transferState === 'pay' && (
              <div>
                <div style={{ border: '1px solid #eee', padding: '25px', borderRadius: '8px', backgroundColor: '#f9f9f9', marginBottom: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '8px', backgroundColor: '#fff', border: '1px solid #e0e0e0', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg" alt="Axis Bank" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#333' }}>Tirtho</div>
                      <div style={{ color: '#666', fontSize: '14px', marginTop: '5px' }}>Account: 922010042775726</div>
                      <div style={{ color: '#97144d', fontSize: '14px', marginTop: '3px', fontWeight: 'bold' }}>Axis Bank</div>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px' }}>Amount to Send</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '15px', top: '15px', fontSize: '18px', color: '#333' }}>$</span>
                    <input type="number" placeholder="0.00" style={{ width: '100%', padding: '15px 15px 15px 35px', border: '1px solid #ccc', borderRadius: '4px', fontSize: '18px', fontWeight: 'bold', boxSizing: 'border-box' }} />
                  </div>
                </div>
                
                <button onClick={handlePay} style={{ width: '100%', padding: '18px', backgroundColor: '#012169', color: '#fff', border: 'none', borderRadius: '4px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer' }}>Send Money Now</button>
              </div>
            )}

            {transferState === 'processing' && (
              <div style={{ textAlign: 'center', padding: '60px' }}>
                <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #e31837', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <h3 style={{ marginTop: '20px', color: '#333' }}>Processing Transfer...</h3>
                <p style={{ color: '#666' }}>Please do not refresh this page.</p>
              </div>
            )}

            {transferState === 'success' && (
              <div style={{ textAlign: 'center', padding: '60px' }}>
                <div style={{ width: '70px', height: '70px', backgroundColor: '#2e7d32', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '36px', margin: '0 auto 20px' }}>✓</div>
                <h3 style={{ fontSize: '26px', color: '#333', marginBottom: '10px' }}>Transfer Successful!</h3>
                <p style={{ color: '#666', fontSize: '16px', marginBottom: '40px' }}>The funds have been successfully transferred to Tirtho.</p>
                <button onClick={() => setTransferState('idle')} style={{ padding: '15px 30px', backgroundColor: '#fff', color: '#012169', border: '1px solid #012169', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', marginRight: '15px' }}>Make Another Transfer</button>
                <button onClick={() => setActiveTab('Accounts')} style={{ padding: '15px 30px', backgroundColor: '#012169', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>View Account</button>
              </div>
            )}
          </div>
        )}

        {/* ----------------- CARDS TAB ----------------- */}
        {activeTab === 'Cards' && (
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eaeaea' }}>
            <h1 style={{ fontSize: '26px', color: '#012169', marginBottom: '30px' }}>Credit Cards</h1>
            <div style={{ display: 'flex', gap: '30px' }}>
              <div style={{ flex: '1', backgroundColor: '#012169', borderRadius: '12px', padding: '25px', color: '#fff', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '150px', height: '150px', backgroundColor: 'rgba(255,255,255,0.1)', borderRadius: '50%' }}></div>
                <h3 style={{ margin: '0 0 20px 0', fontSize: '18px' }}>Cash Rewards Visa Signature</h3>
                <div style={{ fontSize: '24px', letterSpacing: '2px', marginBottom: '20px' }}>**** **** **** 4419</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: '12px', color: '#ccc' }}>Card Holder</div>
                    <div style={{ fontWeight: 'bold' }}>TIRTHANKAR GHOSH</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '12px', color: '#ccc' }}>Expires</div>
                    <div style={{ fontWeight: 'bold' }}>12/28</div>
                  </div>
                </div>
              </div>
              <div style={{ flex: '1', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                  <span style={{ fontWeight: 'bold', color: '#333' }}>Current Balance</span>
                  <span style={{ fontWeight: 'bold', color: '#e31837' }}>$1,240.50</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                  <span style={{ color: '#555' }}>Available Credit</span>
                  <span style={{ fontWeight: 'bold', color: '#333' }}>$8,759.50</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '15px', backgroundColor: '#f9f9f9', borderRadius: '8px' }}>
                  <span style={{ color: '#555' }}>Next Payment Due</span>
                  <span style={{ fontWeight: 'bold', color: '#333' }}>Aug 15, 2026</span>
                </div>
                <button onClick={() => setActiveTab('Bills & Recharges')} style={{ padding: '15px', backgroundColor: '#012169', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px' }}>Make a Payment</button>
              </div>
            </div>
          </div>
        )}

        {/* ----------------- PLACEHOLDER TABS ----------------- */}
        {['FD/RD', 'Bills & Recharges', 'Loans', 'Invest', 'Insure'].includes(activeTab) && (
          <div style={{ backgroundColor: '#fff', padding: '60px 40px', borderRadius: '8px', boxShadow: '0 2px 8px rgba(0,0,0,0.05)', border: '1px solid #eaeaea', textAlign: 'center' }}>
            <div style={{ fontSize: '48px', marginBottom: '20px' }}>
              {activeTab === 'FD/RD' && '📈'}
              {activeTab === 'Bills & Recharges' && '🧾'}
              {activeTab === 'Loans' && '🏡'}
              {activeTab === 'Invest' && '📊'}
              {activeTab === 'Insure' && '🛡️'}
            </div>
            <h1 style={{ fontSize: '26px', color: '#012169', marginBottom: '15px' }}>{activeTab} Dashboard</h1>
            <p style={{ color: '#666', fontSize: '16px', maxWidth: '600px', margin: '0 auto 30px auto', lineHeight: '1.6' }}>
              Welcome to the {activeTab} section. This module is fully integrated with your Bank of America profile. 
              Currently, you do not have any active {activeTab.toLowerCase()} products linked to this account.
            </p>
            <button 
              onClick={() => openModal(`Explore ${activeTab}`, `We are retrieving personalized ${activeTab} offers based on your FICO® Score and account history.`)}
              style={{ padding: '12px 30px', backgroundColor: '#e31837', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '15px' }}>
              Explore {activeTab} Options
            </button>
          </div>
        )}

      </div>
      
      {/* Universal Pop-up Modal */}
      {modalState.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.6)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#fff', padding: '40px', borderRadius: '8px', maxWidth: '500px', width: '90%', boxShadow: '0 10px 30px rgba(0,0,0,0.2)', textAlign: 'center' }}>
            {modalState.loading ? (
              <>
                <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '4px solid #f3f3f3', borderTop: '4px solid #e31837', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <h2 style={{ color: '#012169', marginTop: '20px', fontSize: '22px' }}>Please Wait</h2>
                <p style={{ color: '#666' }}>{modalState.message}</p>
              </>
            ) : (
              <>
                <div style={{ width: '60px', height: '60px', backgroundColor: '#f4f5f7', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#012169" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                </div>
                <h2 style={{ color: '#012169', marginTop: '0', fontSize: '24px' }}>{modalState.title}</h2>
                <p style={{ color: '#555', fontSize: '16px', lineHeight: '1.6', marginBottom: '30px' }}>{modalState.message}</p>
                <button onClick={closeModal} style={{ padding: '12px 40px', backgroundColor: '#012169', color: '#fff', border: 'none', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
