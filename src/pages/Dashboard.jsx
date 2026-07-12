import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Accounts');
  const [showBalance, setShowBalance] = useState(false);
  
  // States for Send Money flow
  const [transferState, setTransferState] = useState('idle');
  const [payee, setPayee] = useState('');
  
  // Universal Modal State for non-implemented links
  const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '', loading: false });

  const openModal = (title, message) => {
    setModalState({ isOpen: true, title, message: 'Processing your request...', loading: true });
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

  const navItems = ['Accounts', 'Send Money', 'Cards', 'FD/RD', 'Bills & Recharges', 'Loans', 'Invest', 'Insure'];

  return (
    <div style={{ backgroundColor: '#0a1930', minHeight: '100vh', fontFamily: 'Arial, sans-serif', color: '#fff' }}>
      
      {/* Top Header */}
      <div style={{ backgroundColor: '#0a1930', padding: '15px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          {/* Logo with White Background for Visibility */}
          <div style={{ backgroundColor: '#fff', padding: '5px 15px', borderRadius: '4px' }}>
            <img src="/images/bank_of_america_logo.svg" alt="Bank of America" width="180" />
          </div>
        </div>

        <div style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          {/* Search Bar */}
          <div style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', padding: '8px 15px', borderRadius: '20px', width: '350px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Book Deposit / Download Form 16 / etc." style={{ border: 'none', background: 'transparent', color: '#333', outline: 'none', marginLeft: '10px', width: '100%', fontSize: '13px' }} />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => openModal('Services & Support', 'Help center is loading...')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <span style={{ fontSize: '14px' }}>Services & Support</span>
          </div>
          
          <svg onClick={() => openModal('Notifications', 'You have no new notifications.')} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ cursor: 'pointer' }}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          <svg onClick={() => navigate('/')} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ cursor: 'pointer' }}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          
          <div style={{ width: '35px', height: '35px', backgroundColor: '#e31837', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', cursor: 'pointer' }}>TG</div>
        </div>
      </div>

      {/* Yellow Theme Banner */}
      <div style={{ backgroundColor: '#ffc107', color: '#000', padding: '12px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <div style={{ fontSize: '14px' }}>
          <strong>Set a new theme!</strong> Experience your account in a new avatar with a personalised interface crafted just for you.
        </div>
        <button onClick={() => openModal('Themes', 'Theme customization is temporarily unavailable.')} style={{ backgroundColor: '#012169', color: '#fff', border: 'none', padding: '8px 20px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer' }}>Apply Theme</button>
      </div>

      <div style={{ padding: '40px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Welcome Section */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 8px 0', fontWeight: 'bold' }}>Welcome, Tirthankar Ghosh</h1>
          <div style={{ color: '#8ba4cc', fontSize: '14px' }}>Last logged in at 06/06/26, 05:58 PM</div>
        </div>

        {/* Navigation Pills */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '10px' }}>
          {navItems.map(item => (
            <div 
              key={item} 
              onClick={() => setActiveTab(item)}
              style={{ 
                padding: '12px 24px', 
                cursor: 'pointer', 
                backgroundColor: activeTab === item ? '#1e3a8a' : 'rgba(255,255,255,0.05)',
                color: activeTab === item ? '#fff' : '#cbd5e1',
                borderRadius: '25px',
                fontWeight: activeTab === item ? 'bold' : 'normal',
                fontSize: '15px',
                whiteSpace: 'nowrap',
                transition: 'background-color 0.2s',
                border: activeTab === item ? '1px solid #3b82f6' : '1px solid transparent',
                position: 'relative'
              }}
            >
              {item}
              {/* Active state indicator arrow */}
              {activeTab === item && (
                <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid #1e3a8a' }} />
              )}
            </div>
          ))}
        </div>

        {/* TAB 1: ACCOUNTS (Dynamic Content Grid) */}
        {activeTab === 'Accounts' && (
          <div style={{ display: 'flex', gap: '25px', overflowX: 'auto', paddingBottom: '20px', alignItems: 'stretch' }}>
            
            {/* Card 1: Savings Accounts */}
            <div style={{ minWidth: '300px', backgroundColor: '#fff', borderRadius: '16px', padding: '25px', color: '#000', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>Savings Accounts</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '1px' }}>{showBalance ? '$63,800.00' : 'XXXXXXXXX'}</div>
                </div>
                <div style={{ color: '#012169' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"></path></svg>
                </div>
              </div>
              
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '30px' }}>
                <span style={{ fontSize: '14px', color: '#333', fontWeight: 'bold' }}>Show Balance</span>
                <div 
                  onClick={() => setShowBalance(!showBalance)}
                  style={{ width: '44px', height: '24px', backgroundColor: showBalance ? '#2e7d32' : '#ccc', borderRadius: '12px', position: 'relative', cursor: 'pointer', transition: '0.3s' }}>
                  <div style={{ width: '20px', height: '20px', backgroundColor: '#fff', borderRadius: '50%', position: 'absolute', top: '2px', left: showBalance ? '22px' : '2px', transition: '0.3s' }}></div>
                </div>
              </div>
              
              <div style={{ marginTop: 'auto' }}>
                <button onClick={() => setActiveTab('Statement')} style={{ width: '100%', backgroundColor: '#012169', color: '#fff', border: 'none', padding: '15px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>Get Statement</button>
              </div>
              <div style={{ position: 'absolute', bottom: '25px', right: '25px', color: '#012169', cursor: 'pointer' }}>→</div>
            </div>

            {/* Card 2: PPF Purple Gradient */}
            <div style={{ minWidth: '300px', background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)', borderRadius: '16px', padding: '25px', color: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', lineHeight: '1.4', maxWidth: '80%' }}>Enjoy tax benefits and assured returns</div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '8px', height: '44px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
                </div>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <button onClick={() => openModal('PPF Account', 'Routing to PPF account opening workflow...')} style={{ backgroundColor: '#fff', color: '#5b21b6', border: 'none', padding: '12px 25px', borderRadius: '20px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>Open PPF Account</button>
              </div>
              <div style={{ position: 'absolute', bottom: '25px', right: '25px', cursor: 'pointer' }}>→</div>
            </div>

            {/* Card 3: Credit Card Purple Gradient */}
            <div style={{ minWidth: '300px', background: 'linear-gradient(135deg, #7e22ce 0%, #a855f7 100%)', borderRadius: '16px', padding: '25px', color: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', lineHeight: '1.4', maxWidth: '80%' }}>Set Limits & Control Your Credit Card Usage</div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '8px', height: '44px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><rect x="3" y="11" width="18" height="11" rx="2" ry="2"></rect><path d="M7 11V7a5 5 0 0 1 10 0v4"></path></svg>
                </div>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <button onClick={() => openModal('Card Controls', 'Accessing credit card limit settings...')} style={{ backgroundColor: '#fff', color: '#7e22ce', border: 'none', padding: '12px 25px', borderRadius: '20px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>Manage Now &gt;&gt;</button>
              </div>
              <div style={{ position: 'absolute', bottom: '25px', right: '25px', cursor: 'pointer' }}>→</div>
            </div>

            {/* Card 4: Favourite Links */}
            <div style={{ minWidth: '300px', backgroundColor: '#e2e8f0', borderRadius: '16px', padding: '25px', color: '#0f172a', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#334155' }}>My Favourite Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', flex: 1 }}>
                {['Account Statement', 'Open FD', 'Download FD Summary', 'Sweep-in / OD against FD', 'CASA Interest Certificate'].map(link => (
                  <div key={link} onClick={() => link === 'Account Statement' ? setActiveTab('Statement') : openModal(link, `Routing to ${link}...`)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderBottom: '1px solid #cbd5e1', paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      <span style={{ fontSize: '14px', color: '#475569' }}>{link}</span>
                    </div>
                    <span style={{ color: '#94a3b8' }}>›</span>
                  </div>
                ))}
              </div>
              <div onClick={() => openModal('Edit Links', 'Opening link customizer...')} style={{ color: '#012169', fontWeight: 'bold', fontSize: '14px', marginTop: '15px', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: '5px' }}>
                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="8" x2="12" y2="16"></line><line x1="8" y1="12" x2="16" y2="12"></line></svg>
                Add & Edit Links
              </div>
            </div>

            {/* Card 5: Offers Teal Gradient */}
            <div style={{ minWidth: '150px', background: 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)', borderRadius: '16px', padding: '25px', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => openModal('Special Offers', 'Checking for new pre-approved offers...')}>
              <div style={{ backgroundColor: '#fff', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '24px' }}>🎁</span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.4' }}>Special offers for you!</div>
              <div style={{ marginTop: '15px' }}>›</div>
            </div>

          </div>
        )}

        {/* TAB 2: SEND MONEY */}
        {activeTab === 'Send Money' && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', maxWidth: '800px', margin: '0 auto', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <h1 style={{ fontSize: '26px', color: '#fff', marginBottom: '30px' }}>Transfer Funds</h1>
            
            {transferState === 'idle' && (
              <div>
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', color: '#cbd5e1' }}>Select Recipient</label>
                  <input type="text" placeholder="Search by name, account number, or email" style={{ width: '100%', padding: '15px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(0,0,0,0.2)', color: '#fff', borderRadius: '8px', fontSize: '15px', boxSizing: 'border-box', outline: 'none' }} />
                </div>
                
                <h3 style={{ fontSize: '16px', color: '#fff', marginBottom: '15px' }}>Saved Payees</h3>
                <div 
                  onClick={handleAddPayee}
                  style={{ display: 'inline-flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', width: '150px', height: '150px', border: '2px dashed #3b82f6', borderRadius: '12px', cursor: 'pointer', backgroundColor: 'rgba(59,130,246,0.05)', transition: 'all 0.2s' }}>
                  <div style={{ fontSize: '30px', color: '#3b82f6', marginBottom: '10px' }}>+</div>
                  <div style={{ fontSize: '14px', fontWeight: 'bold', color: '#3b82f6' }}>Add New Payee</div>
                </div>
              </div>
            )}

            {transferState === 'adding' && (
              <div style={{ textAlign: 'center', padding: '60px' }}>
                <div style={{ display: 'inline-block', width: '50px', height: '50px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <style>{`@keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }`}</style>
                <h3 style={{ marginTop: '25px', color: '#fff' }}>Connecting to Zelle / Gateway...</h3>
              </div>
            )}

            {transferState === 'pay' && (
              <div>
                <div style={{ border: '1px solid rgba(255,255,255,0.1)', padding: '25px', borderRadius: '12px', backgroundColor: 'rgba(255,255,255,0.05)', marginBottom: '30px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                    <div style={{ width: '60px', height: '60px', borderRadius: '12px', backgroundColor: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '10px' }}>
                      <img src="https://upload.wikimedia.org/wikipedia/commons/1/1a/Axis_Bank_logo.svg" alt="Axis Bank" style={{ width: '100%', height: 'auto', objectFit: 'contain' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '20px', fontWeight: 'bold', color: '#fff' }}>Tirtho</div>
                      <div style={{ color: '#94a3b8', fontSize: '14px', marginTop: '5px' }}>Account: 922010042775726</div>
                      <div style={{ color: '#f43f5e', fontSize: '14px', marginTop: '3px', fontWeight: 'bold' }}>Axis Bank</div>
                    </div>
                  </div>
                </div>
                
                <div style={{ marginBottom: '25px' }}>
                  <label style={{ display: 'block', fontWeight: 'bold', marginBottom: '10px', color: '#cbd5e1' }}>Amount to Send</label>
                  <div style={{ position: 'relative' }}>
                    <span style={{ position: 'absolute', left: '15px', top: '15px', fontSize: '20px', color: '#94a3b8' }}>$</span>
                    <input type="number" placeholder="0.00" style={{ width: '100%', padding: '15px 15px 15px 35px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(0,0,0,0.2)', color: '#fff', borderRadius: '8px', fontSize: '20px', fontWeight: 'bold', boxSizing: 'border-box', outline: 'none' }} />
                  </div>
                </div>
                
                <button onClick={handlePay} style={{ width: '100%', padding: '18px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontSize: '18px', fontWeight: 'bold', cursor: 'pointer', transition: 'background-color 0.2s' }}>Send Money Now</button>
              </div>
            )}

            {transferState === 'processing' && (
              <div style={{ textAlign: 'center', padding: '60px' }}>
                <div style={{ display: 'inline-block', width: '50px', height: '50px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid #f59e0b', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <h3 style={{ marginTop: '25px', color: '#fff' }}>Processing Transfer...</h3>
                <p style={{ color: '#94a3b8', marginTop: '10px' }}>Please do not refresh this page.</p>
              </div>
            )}

            {transferState === 'success' && (
              <div style={{ textAlign: 'center', padding: '60px' }}>
                <div style={{ width: '80px', height: '80px', backgroundColor: '#10b981', color: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '40px', margin: '0 auto 20px', boxShadow: '0 0 30px rgba(16, 185, 129, 0.4)' }}>✓</div>
                <h3 style={{ fontSize: '28px', color: '#fff', marginBottom: '10px' }}>Transfer Successful!</h3>
                <p style={{ color: '#94a3b8', fontSize: '16px', marginBottom: '40px' }}>The funds have been successfully transferred to Tirtho.</p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
                  <button onClick={() => setTransferState('idle')} style={{ padding: '15px 30px', backgroundColor: 'transparent', color: '#3b82f6', border: '2px solid #3b82f6', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Make Another Transfer</button>
                  <button onClick={() => setActiveTab('Accounts')} style={{ padding: '15px 30px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>View Accounts</button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* TAB 3: CARDS */}
        {activeTab === 'Cards' && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', maxWidth: '900px', margin: '0 auto', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <h1 style={{ fontSize: '26px', color: '#fff', marginBottom: '30px' }}>Credit Cards</h1>
            <div style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1', minWidth: '300px', background: 'linear-gradient(135deg, #1e3a8a 0%, #312e81 100%)', borderRadius: '16px', padding: '30px', color: '#fff', position: 'relative', overflow: 'hidden', boxShadow: '0 15px 35px rgba(0,0,0,0.3)' }}>
                <div style={{ position: 'absolute', top: '-50px', right: '-50px', width: '200px', height: '200px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}></div>
                <h3 style={{ margin: '0 0 25px 0', fontSize: '20px', fontWeight: 'normal' }}>Cash Rewards Visa Signature</h3>
                <div style={{ fontSize: '26px', letterSpacing: '4px', marginBottom: '30px', fontFamily: 'monospace' }}>**** **** **** 4419</div>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end' }}>
                  <div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Card Holder</div>
                    <div style={{ fontWeight: 'bold', fontSize: '15px' }}>TIRTHANKAR GHOSH</div>
                  </div>
                  <div>
                    <div style={{ fontSize: '11px', color: '#94a3b8', textTransform: 'uppercase', letterSpacing: '1px', marginBottom: '5px' }}>Expires</div>
                    <div style={{ fontWeight: 'bold', fontSize: '15px' }}>12/28</div>
                  </div>
                </div>
              </div>
              <div style={{ flex: '1', minWidth: '300px', display: 'flex', flexDirection: 'column', gap: '15px' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: '#cbd5e1' }}>Current Balance</span>
                  <span style={{ fontWeight: 'bold', color: '#f43f5e', fontSize: '18px' }}>$1,240.50</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: '#cbd5e1' }}>Available Credit</span>
                  <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '18px' }}>$8,759.50</span>
                </div>
                <div style={{ display: 'flex', justifyContent: 'space-between', padding: '20px', backgroundColor: 'rgba(0,0,0,0.2)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.05)' }}>
                  <span style={{ color: '#cbd5e1' }}>Next Payment Due</span>
                  <span style={{ fontWeight: 'bold', color: '#fff', fontSize: '18px' }}>Aug 15, 2026</span>
                </div>
                <button onClick={() => setActiveTab('Bills & Recharges')} style={{ padding: '18px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '12px', fontWeight: 'bold', cursor: 'pointer', marginTop: '10px', fontSize: '16px' }}>Make a Payment</button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 4: STATEMENT (New functionality) */}
        {activeTab === 'Statement' && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px', marginBottom: '30px' }}>
              <div>
                <h1 style={{ margin: '0 0 10px 0', fontSize: '26px', color: '#fff' }}>Account Statement</h1>
                <div style={{ color: '#94a3b8', fontSize: '15px' }}>Advantage Plus Banking | Account ending in 2378</div>
              </div>
              <div style={{ textAlign: 'right' }}>
                <button onClick={() => setActiveTab('Accounts')} style={{ padding: '10px 20px', backgroundColor: 'transparent', color: '#3b82f6', border: '1px solid #3b82f6', borderRadius: '8px', cursor: 'pointer', marginRight: '10px' }}>Back to Accounts</button>
                <button onClick={() => openModal('Download Statement', 'Generating PDF...')} style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Download PDF</button>
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '20px', color: '#fff', margin: 0 }}>Recent Transactions</h2>
              <div style={{ display: 'flex', gap: '10px' }}>
                <input type="text" placeholder="Search transactions..." style={{ padding: '10px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(0,0,0,0.2)', color: '#fff', borderRadius: '8px', width: '250px', outline: 'none' }} />
                <button style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Filter</button>
              </div>
            </div>

            <div style={{ overflowX: 'auto' }}>
              <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '15px' }}>
                <thead>
                  <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                    <th style={{ padding: '15px', color: '#cbd5e1' }}>Date</th>
                    <th style={{ padding: '15px', color: '#cbd5e1' }}>Description</th>
                    <th style={{ padding: '15px', color: '#cbd5e1' }}>Type</th>
                    <th style={{ padding: '15px', color: '#cbd5e1', textAlign: 'right' }}>Amount</th>
                  </tr>
                </thead>
                <tbody>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '15px', color: '#94a3b8' }}>Jul 03, 2026</td>
                    <td style={{ padding: '15px', color: '#fff', fontWeight: 'bold' }}>AMB CHRG INCL GST JUN26</td>
                    <td style={{ padding: '15px', color: '#94a3b8' }}>Fee</td>
                    <td style={{ padding: '15px', color: '#f43f5e', textAlign: 'right' }}>-$36.98</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '15px', color: '#94a3b8' }}>Jul 01, 2026</td>
                    <td style={{ padding: '15px', color: '#fff', fontWeight: 'bold' }}>INTEREST PAID TILL 30-JUN</td>
                    <td style={{ padding: '15px', color: '#94a3b8' }}>Deposit</td>
                    <td style={{ padding: '15px', color: '#10b981', textAlign: 'right' }}>+$22.00</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '15px', color: '#94a3b8' }}>Jun 20, 2026</td>
                    <td style={{ padding: '15px', color: '#fff', fontWeight: 'bold' }}>UPI-DAKSHINA PRASAD SARM</td>
                    <td style={{ padding: '15px', color: '#94a3b8' }}>Transfer</td>
                    <td style={{ padding: '15px', color: '#f43f5e', textAlign: 'right' }}>-$200.00</td>
                  </tr>
                  <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                    <td style={{ padding: '15px', color: '#94a3b8' }}>Jun 13, 2026</td>
                    <td style={{ padding: '15px', color: '#fff', fontWeight: 'bold' }}>JANMAR26 INSTAALERTCHG</td>
                    <td style={{ padding: '15px', color: '#94a3b8' }}>Fee</td>
                    <td style={{ padding: '15px', color: '#f43f5e', textAlign: 'right' }}>-$0.24</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* TAB 5: PLACEHOLDERS */}
        {['FD/RD', 'Bills & Recharges', 'Loans', 'Invest', 'Insure'].includes(activeTab) && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '60px 40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', maxWidth: '800px', margin: '0 auto', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '50px', marginBottom: '25px', display: 'inline-block', padding: '20px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
              {activeTab === 'FD/RD' && '📈'}
              {activeTab === 'Bills & Recharges' && '🧾'}
              {activeTab === 'Loans' && '🏡'}
              {activeTab === 'Invest' && '📊'}
              {activeTab === 'Insure' && '🛡️'}
            </div>
            <h1 style={{ fontSize: '28px', color: '#fff', marginBottom: '15px' }}>{activeTab} Dashboard</h1>
            <p style={{ color: '#94a3b8', fontSize: '16px', maxWidth: '500px', margin: '0 auto 35px auto', lineHeight: '1.6' }}>
              Welcome to the {activeTab} section. This module is fully integrated with your Bank of America profile. 
              Currently, you do not have any active {activeTab.toLowerCase()} products linked to this account.
            </p>
            <button 
              onClick={() => openModal(`Explore ${activeTab}`, `We are retrieving personalized ${activeTab} offers based on your FICO® Score and account history.`)}
              style={{ padding: '15px 40px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '30px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px' }}>
              Explore {activeTab} Options
            </button>
          </div>
        )}

      </div>
      
      {/* Universal Pop-up Modal */}
      {modalState.isOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1000 }}>
          <div style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', maxWidth: '400px', width: '90%', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', textAlign: 'center', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
            {modalState.loading ? (
              <>
                <div style={{ display: 'inline-block', width: '40px', height: '40px', border: '4px solid rgba(255,255,255,0.1)', borderTop: '4px solid #3b82f6', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                <h2 style={{ color: '#fff', marginTop: '25px', fontSize: '22px' }}>Please Wait</h2>
                <p style={{ color: '#94a3b8', marginTop: '10px' }}>{modalState.message}</p>
              </>
            ) : (
              <>
                <div style={{ width: '60px', height: '60px', backgroundColor: 'rgba(59,130,246,0.1)', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px auto' }}>
                  <svg width="30" height="30" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg>
                </div>
                <h2 style={{ color: '#fff', marginTop: '0', fontSize: '22px' }}>{modalState.title}</h2>
                <p style={{ color: '#cbd5e1', fontSize: '15px', lineHeight: '1.6', marginBottom: '30px' }}>{modalState.message}</p>
                <button onClick={closeModal} style={{ padding: '15px 40px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', fontSize: '16px', width: '100%' }}>Close</button>
              </>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default Dashboard;
