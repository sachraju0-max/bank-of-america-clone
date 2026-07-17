import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

function Dashboard() {
  const navigate = useNavigate();
  const [activeTab, setActiveTab] = useState('Accounts');
  const [showBalance, setShowBalance] = useState(false);
  const [accountSubTab, setAccountSubTab] = useState('Account Info');
  const [showAccountNumber, setShowAccountNumber] = useState(false);
  
  // Theme State
  const [appTheme, setAppTheme] = useState('#0a1930');
  const [isThemeModalOpen, setIsThemeModalOpen] = useState(false);
  
  // States for Send Money flow
  const [transferState, setTransferState] = useState('idle');
  const [payee, setPayee] = useState('');
  
  // Universal Modal State for non-implemented links
  const [modalState, setModalState] = useState({ isOpen: false, title: '', message: '', loading: false });

  const [loginTime, setLoginTime] = useState('06/06/26, 05:58 PM EST');

  useEffect(() => {
    const now = new Date();
    const estTime = now.toLocaleString('en-US', {
      timeZone: 'America/New_York',
      month: '2-digit',
      day: '2-digit',
      year: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
    setLoginTime(estTime + ' EST');
  }, []);

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

  const navItems = ['Accounts', 'Send Money', 'Cards', 'CDs', 'Bills & Recharges', 'Loans', 'Invest', 'Insure'];

  const themeOptions = [
    { name: 'Midnight Blue', color: '#0a1930' },
    { name: 'Charcoal Black', color: '#0f172a' },
    { name: 'Forest Green', color: '#064e3b' },
    { name: 'Deep Purple', color: '#2e1065' },
    { name: 'Crimson Red', color: '#4c0519' }
  ];

  const handleDownloadStatement = () => {
    const printWindow = window.open('', '_blank');
    const logoUrl = window.location.origin + '/images/bank_of_america_logo.svg';
    
    printWindow.document.write(`
      <html>
        <head>
          <title>Bank of America Statement</title>
          <style>
            @import url('https://fonts.googleapis.com/css2?family=Open+Sans:wght@400;600;700&display=swap');
            body { font-family: 'Open Sans', Arial, sans-serif; padding: 40px; color: #333; font-size: 12px; line-height: 1.5; }
            .header-table { width: 100%; border-bottom: 3px solid #e31837; padding-bottom: 20px; margin-bottom: 30px; }
            .header-table td { vertical-align: top; }
            .logo { width: 220px; }
            .statement-info { text-align: right; color: #555; }
            .statement-info h2 { color: #012169; margin: 0 0 5px 0; font-size: 24px; font-weight: 700; }
            .customer-info { margin-bottom: 40px; }
            .customer-info h3 { margin: 0; font-size: 16px; color: #012169; }
            .summary-box { border: 1px solid #ccc; border-radius: 4px; padding: 20px; margin-bottom: 40px; background-color: #f8f9fa; }
            .summary-box h3 { color: #012169; margin-top: 0; font-size: 16px; border-bottom: 1px solid #ccc; padding-bottom: 10px; margin-bottom: 15px; }
            .summary-table { width: 100%; }
            .summary-table td { padding: 5px 0; }
            .summary-table .amount { text-align: right; font-weight: 600; }
            .transactions-section h3 { color: #012169; font-size: 16px; border-bottom: 2px solid #012169; padding-bottom: 5px; margin-bottom: 15px; }
            .tx-table { width: 100%; border-collapse: collapse; margin-bottom: 40px; }
            .tx-table th { background-color: #012169; color: white; padding: 10px; text-align: left; font-size: 12px; font-weight: 600; }
            .tx-table td { padding: 12px 10px; border-bottom: 1px solid #e0e0e0; vertical-align: top; }
            .tx-table .date-col { width: 15%; }
            .tx-table .desc-col { width: 60%; }
            .tx-table .amt-col { width: 25%; text-align: right; }
            .footer { margin-top: 50px; font-size: 10px; color: #777; text-align: center; border-top: 1px solid #ccc; padding-top: 20px; }
          </style>
        </head>
        <body>
          <table class="header-table">
            <tr>
              <td>
                <img src="\${logoUrl}" class="logo" alt="Bank of America" onerror="this.onerror=null; this.src='https://upload.wikimedia.org/wikipedia/commons/2/20/Bank_of_America_logo.svg';" />
              </td>
              <td class="statement-info">
                <h2>Account Statement</h2>
                <p><strong>Statement Period:</strong> June 15, 2026 to July 16, 2026<br/>
                <strong>Account Number:</strong> 0000XXXXXXXX2378<br/>
                <strong>Page 1 of 1</strong></p>
              </td>
            </tr>
          </table>

          <div class="customer-info">
            <h3>TIRTHANKAR GHOSH</h3>
            <p>Advantage Plus Banking<br/>
            PO BOX 15284<br/>
            WILMINGTON, DE 19850</p>
          </div>

          <div class="summary-box">
            <h3>Your Account Summary</h3>
            <table class="summary-table">
              <tr>
                <td>Beginning balance on June 15, 2026</td>
                <td class="amount">$20,000.00</td>
              </tr>
              <tr>
                <td>Deposits and other additions</td>
                <td class="amount">$64,800.00</td>
              </tr>
              <tr>
                <td>Withdrawals and other subtractions</td>
                <td class="amount">-$66,000.00</td>
              </tr>
              <tr>
                <td>Service fees</td>
                <td class="amount">-$0.00</td>
              </tr>
              <tr>
                <td style="font-weight: 700; padding-top: 10px; border-top: 1px solid #ccc;">Ending balance on July 16, 2026</td>
                <td class="amount" style="font-weight: 700; padding-top: 10px; border-top: 1px solid #ccc;">$18,800.00</td>
              </tr>
            </table>
          </div>

          <div class="transactions-section">
            <h3>Deposits and Other Additions</h3>
            <table class="tx-table">
              <thead>
                <tr>
                  <th class="date-col">Date</th>
                  <th class="desc-col">Description</th>
                  <th class="amt-col">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>24/06/26</td>
                  <td>AMB CHG/General Electrical/126762/ Wire/28928/US Tres/BT</td>
                  <td class="amt-col">$64,800.00</td>
                </tr>
              </tbody>
            </table>

            <h3>Withdrawals and Other Subtractions</h3>
            <table class="tx-table">
              <thead>
                <tr>
                  <th class="date-col">Date</th>
                  <th class="desc-col">Description</th>
                  <th class="amt-col">Amount</th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td>16/07/26</td>
                  <td>Bank of America/Tirthankar/Axis/127627662/(holding)/ Verification 7827/ RBI 872822<br/>
                  <span style="color: #666; font-size: 11px;">Processed at 02:30 PM EST</span></td>
                  <td class="amt-col">-$63,000.00</td>
                </tr>
                <tr>
                  <td>16/07/26</td>
                  <td>ATS/7672/Tirthankar/Axis/1278728/Ns.AJX/(processing)/RBI 892722<br/>
                  <span style="color: #666; font-size: 11px;">Processed at 10:45 AM EST</span></td>
                  <td class="amt-col">-$1,200.00</td>
                </tr>
                <tr>
                  <td>13/07/26</td>
                  <td>Swift transfer/7672/Tirthankar/Axis 1276726/NS.AJX/7862#(processing)<br/>
                  <span style="color: #666; font-size: 11px;">Processed at 09:15 AM EST</span></td>
                  <td class="amt-col">-$800.00</td>
                </tr>
                <tr>
                  <td>02/07/26</td>
                  <td>ACS/processing/charges/76726XG<br/>
                  <span style="color: #666; font-size: 11px;">Processed at 11:20 AM EST</span></td>
                  <td class="amt-col">-$1,000.00</td>
                </tr>
              </tbody>
            </table>
          </div>

          <div class="footer">
            Bank of America, N.A. Member FDIC. © 2026 Bank of America Corporation. All rights reserved.<br/>
            Contact us at 1.800.432.1000 or visit bankofamerica.com
          </div>

          <script>
            window.onload = function() {
              setTimeout(function() {
                window.print();
              }, 500); // Small delay to allow fonts and images to load
            }
          </script>
        </body>
      </html>
    `);
    printWindow.document.close();
  };

  return (
    <div className="dashboard-container" style={{ backgroundColor: appTheme, minHeight: '100vh', fontFamily: 'Arial, sans-serif', color: '#fff', transition: 'background-color 0.5s' }}>
      
      {/* CSS for Mobile Responsiveness */}
      <style>{`
        @keyframes spin { 0% { transform: rotate(0deg); } 100% { transform: rotate(360deg); } }
        
        .header-container { padding: 15px 40px; display: flex; justify-content: space-between; align-items: center; border-bottom: 1px solid rgba(255,255,255,0.1); background-color: rgba(0,0,0,0.2); }
        .theme-banner { padding: 12px 40px; display: flex; justify-content: space-between; align-items: center; background-color: #ffc107; color: #000; }
        .main-content { padding: 40px; max-width: 1400px; margin: 0 auto; }
        
        @media (max-width: 768px) {
          .header-container { flex-direction: column; gap: 15px; padding: 15px; }
          .header-actions { width: 100%; justify-content: space-between; flex-wrap: wrap; }
          .search-bar { width: 100% !important; margin-bottom: 10px; }
          .theme-banner { flex-direction: column; text-align: center; gap: 15px; padding: 15px; }
          .main-content { padding: 20px 15px; }
          .dashboard-grid { flex-direction: column !important; overflow-x: hidden !important; }
          .dashboard-card { min-width: 100% !important; margin-bottom: 15px; }
          .cards-tab-container { flex-direction: column !important; }
          .statement-header { flex-direction: column; gap: 15px; text-align: center; }
          .statement-header > div { width: 100%; text-align: center !important; }
          .statement-filter { flex-direction: column; align-items: stretch !important; gap: 15px; }
          .statement-filter input { width: 100% !important; }
          .modal-box { width: 95% !important; padding: 20px !important; }
          h1 { font-size: 24px !important; }
        }
      `}</style>

      {/* Top Header */}
      <div className="header-container">
        <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
          <div style={{ backgroundColor: '#fff', padding: '5px 15px', borderRadius: '4px' }}>
            <img src="/images/bank_of_america_logo.svg" alt="Bank of America" width="180" style={{ maxWidth: '100%' }} />
          </div>
        </div>

        <div className="header-actions" style={{ display: 'flex', alignItems: 'center', gap: '30px' }}>
          <div className="search-bar" style={{ display: 'flex', alignItems: 'center', backgroundColor: '#fff', padding: '8px 15px', borderRadius: '20px', width: '350px' }}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#666" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
            <input type="text" placeholder="Search..." style={{ border: 'none', background: 'transparent', color: '#333', outline: 'none', marginLeft: '10px', width: '100%', fontSize: '13px' }} />
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }} onClick={() => openModal('Services & Support', 'Help center is loading...')}>
            <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><path d="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3"></path><line x1="12" y1="17" x2="12.01" y2="17"></line></svg>
            <span style={{ fontSize: '14px', display: 'none' }}>Services</span>
          </div>
          
          <svg onClick={() => openModal('Notifications', (
            <div style={{ textAlign: 'left', fontSize: '13px' }}>
              <div style={{ marginBottom: '10px' }}>
                <strong style={{ color: '#fff' }}>16th July 2026, 10:45 AM EST</strong><br/>
                ATS/7672/Tirthankar/Axis/1278728/Ns.AJX/(processing)/RBI 892722.<br/>
                <span style={{ color: '#f43f5e' }}>Debit: $1,200.00</span>
              </div>
              <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '10px' }}>
                <strong style={{ color: '#fff' }}>16th July 2026, 02:30 PM EST</strong><br/>
                Bank of America/Tirthankar/Axis/127627662/(holding)/ Verification 7827/ RBI 872822<br/>
                <span style={{ color: '#f43f5e' }}>Debit: $63,000.00</span>
              </div>
            </div>
          ))} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ cursor: 'pointer' }}><path d="M18 8A6 6 0 0 0 6 8c0 7-3 9-3 9h18s-3-2-3-9"></path><path d="M13.73 21a2 2 0 0 1-3.46 0"></path></svg>
          <svg onClick={() => navigate('/')} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2" style={{ cursor: 'pointer' }}><path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path><polyline points="16 17 21 12 16 7"></polyline><line x1="21" y1="12" x2="9" y2="12"></line></svg>
          
          <div style={{ width: '35px', height: '35px', backgroundColor: '#e31837', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', cursor: 'pointer' }}>TG</div>
        </div>
      </div>

      {/* Yellow Theme Banner */}
      <div className="theme-banner">
        <div style={{ fontSize: '14px' }}>
          <strong>Set a new theme!</strong> Experience your account in a new avatar with a personalised interface crafted just for you.
        </div>
        <button onClick={() => setIsThemeModalOpen(true)} style={{ backgroundColor: '#012169', color: '#fff', border: 'none', padding: '10px 24px', borderRadius: '4px', fontWeight: 'bold', cursor: 'pointer', whiteSpace: 'nowrap' }}>Apply Theme</button>
      </div>

      <div className="main-content">
        
        {/* Welcome Section */}
        <div style={{ marginBottom: '30px' }}>
          <h1 style={{ fontSize: '32px', margin: '0 0 8px 0', fontWeight: 'bold' }}>Welcome, Tirthankar Ghosh</h1>
          <div style={{ color: '#94a3b8', fontSize: '14px' }}>Last logged in at {loginTime}</div>
        </div>

        {/* Navigation Pills */}
        <div style={{ display: 'flex', gap: '15px', marginBottom: '40px', overflowX: 'auto', paddingBottom: '15px', scrollbarWidth: 'none' }}>
          {navItems.map(item => (
            <div 
              key={item} 
              onClick={() => setActiveTab(item)}
              style={{ 
                padding: '12px 24px', 
                cursor: 'pointer', 
                backgroundColor: activeTab === item ? 'rgba(255,255,255,0.15)' : 'rgba(255,255,255,0.05)',
                color: activeTab === item ? '#fff' : '#cbd5e1',
                borderRadius: '25px',
                fontWeight: activeTab === item ? 'bold' : 'normal',
                fontSize: '15px',
                whiteSpace: 'nowrap',
                transition: 'all 0.2s',
                border: activeTab === item ? '1px solid rgba(255,255,255,0.3)' : '1px solid transparent',
                position: 'relative'
              }}
            >
              {item}
              {activeTab === item && (
                <div style={{ position: 'absolute', bottom: '-8px', left: '50%', transform: 'translateX(-50%)', width: '0', height: '0', borderLeft: '8px solid transparent', borderRight: '8px solid transparent', borderTop: '8px solid rgba(255,255,255,0.3)' }} />
              )}
            </div>
          ))}
        </div>

        {/* TAB 1: ACCOUNTS (Dynamic Content Grid) */}
        {activeTab === 'Accounts' && (
          <div className="dashboard-grid" style={{ display: 'flex', gap: '25px', overflowX: 'auto', paddingBottom: '20px', alignItems: 'stretch' }}>
            
            {/* Card 1: Savings Accounts */}
            <div className="dashboard-card" style={{ minWidth: '300px', backgroundColor: '#fff', borderRadius: '16px', padding: '25px', color: '#000', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '20px' }}>
                <div>
                  <div style={{ color: '#666', fontSize: '14px', marginBottom: '5px' }}>Savings Accounts</div>
                  <div style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '1px' }}>{showBalance ? '$800.00' : 'XXXXXXXXX'}</div>
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
                <button onClick={() => { setActiveTab('AccountDetails'); setAccountSubTab('Recent Transactions'); }} style={{ width: '100%', backgroundColor: '#012169', color: '#fff', border: 'none', padding: '15px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer' }}>Recent Transactions</button>
                <button onClick={() => { setActiveTab('AccountDetails'); setAccountSubTab('Account Info'); }} style={{ width: '100%', backgroundColor: 'transparent', color: '#012169', border: '1px solid #012169', padding: '15px', borderRadius: '8px', fontWeight: 'bold', fontSize: '14px', cursor: 'pointer', marginTop: '10px' }}>Account Info</button>
              </div>
            </div>

            {/* Card 2: IRA Purple Gradient */}
            <div className="dashboard-card" style={{ minWidth: '300px', background: 'linear-gradient(135deg, #5b21b6 0%, #7c3aed 100%)', borderRadius: '16px', padding: '25px', color: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '20px' }}>
                <div style={{ fontSize: '20px', fontWeight: 'bold', lineHeight: '1.4', maxWidth: '80%' }}>Enjoy tax advantages with a Merrill Edge® IRA</div>
                <div style={{ backgroundColor: 'rgba(255,255,255,0.2)', padding: '10px', borderRadius: '8px', height: '44px' }}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><line x1="19" y1="5" x2="5" y2="19"></line><circle cx="6.5" cy="6.5" r="2.5"></circle><circle cx="17.5" cy="17.5" r="2.5"></circle></svg>
                </div>
              </div>
              <div style={{ marginTop: 'auto' }}>
                <button onClick={() => setActiveTab('Invest')} style={{ backgroundColor: '#fff', color: '#5b21b6', border: 'none', padding: '12px 25px', borderRadius: '20px', fontWeight: 'bold', fontSize: '13px', cursor: 'pointer' }}>Open an IRA</button>
              </div>
              <div style={{ position: 'absolute', bottom: '25px', right: '25px', cursor: 'pointer' }}>→</div>
            </div>

            {/* Card 3: Credit Card Purple Gradient */}
            <div className="dashboard-card" style={{ minWidth: '300px', background: 'linear-gradient(135deg, #7e22ce 0%, #a855f7 100%)', borderRadius: '16px', padding: '25px', color: '#fff', display: 'flex', flexDirection: 'column', position: 'relative' }}>
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
            <div className="dashboard-card" style={{ minWidth: '300px', backgroundColor: '#e2e8f0', borderRadius: '16px', padding: '25px', color: '#0f172a', display: 'flex', flexDirection: 'column' }}>
              <h3 style={{ margin: '0 0 20px 0', fontSize: '18px', color: '#334155' }}>My Favourite Links</h3>
              <div style={{ display: 'flex', flexDirection: 'column', gap: '15px', flex: 1 }}>
                {['Account Statement', 'Order Checks', 'Replace a lost card', 'Tax Center (1099/W-2)', 'Schedule an Appointment'].map(link => (
                  <div key={link} onClick={() => link === 'Account Statement' ? setActiveTab('AccountDetails') : openModal(link, `Routing to ${link}...`)} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', borderBottom: '1px solid #cbd5e1', paddingBottom: '10px' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#64748b" strokeWidth="2"><path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path><polyline points="14 2 14 8 20 8"></polyline><line x1="16" y1="13" x2="8" y2="13"></line><line x1="16" y1="17" x2="8" y2="17"></line><polyline points="10 9 9 9 8 9"></polyline></svg>
                      <span style={{ fontSize: '14px', color: '#475569' }}>{link}</span>
                    </div>
                    <span style={{ color: '#94a3b8' }}>›</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Card 5: Offers Teal Gradient */}
            <div className="dashboard-card" style={{ minWidth: '150px', background: 'linear-gradient(135deg, #0ea5e9 0%, #14b8a6 100%)', borderRadius: '16px', padding: '25px', color: '#fff', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', cursor: 'pointer' }} onClick={() => openModal('Special Offers', 'Checking for new pre-approved offers...')}>
              <div style={{ backgroundColor: '#fff', borderRadius: '50%', width: '50px', height: '50px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '15px' }}>
                <span style={{ fontSize: '24px' }}>🎁</span>
              </div>
              <div style={{ fontSize: '16px', fontWeight: 'bold', textAlign: 'center', lineHeight: '1.4' }}>Special offers for you!</div>
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
                <div className="cards-tab-container" style={{ display: 'flex', justifyContent: 'center', gap: '20px' }}>
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
            <div className="cards-tab-container" style={{ display: 'flex', gap: '30px', flexWrap: 'wrap' }}>
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

        {/* TAB 4: ACCOUNT DETAILS (Sub-tabs: Recent Transactions, Account Info, Linked Debit Card) */}
        {activeTab === 'AccountDetails' && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '30px' }}>
              <div style={{ display: 'flex', gap: '30px', borderBottom: '1px solid rgba(255,255,255,0.2)', width: '100%' }}>
                {['Recent Transactions', 'Account Info', 'Linked Debit Card'].map(tab => (
                  <div 
                    key={tab}
                    onClick={() => setAccountSubTab(tab)}
                    style={{ 
                      padding: '10px 0', 
                      cursor: 'pointer', 
                      color: accountSubTab === tab ? '#3b82f6' : '#94a3b8',
                      borderBottom: accountSubTab === tab ? '2px solid #3b82f6' : '2px solid transparent',
                      fontWeight: accountSubTab === tab ? 'bold' : 'normal',
                      fontSize: '15px'
                    }}
                  >
                    {tab}
                  </div>
                ))}
              </div>
            </div>

            {accountSubTab === 'Recent Transactions' && (
              <div>
                <div className="statement-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '30px' }}>
                  <div>
                    <h1 style={{ margin: '0 0 10px 0', fontSize: '26px', color: '#fff' }}>Recent Transactions</h1>
                    <div style={{ color: '#94a3b8', fontSize: '15px' }}>Advantage Plus Banking | Account ending in 2378</div>
                  </div>
                  <div style={{ textAlign: 'right' }}>
                    <button onClick={() => setActiveTab('Accounts')} style={{ padding: '10px 20px', backgroundColor: 'transparent', color: '#3b82f6', border: '1px solid #3b82f6', borderRadius: '8px', cursor: 'pointer', marginRight: '10px', marginBottom: '10px' }}>Back to Accounts</button>
                    <button onClick={handleDownloadStatement} style={{ padding: '10px 20px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', cursor: 'pointer' }}>Download PDF</button>
                  </div>
                </div>

                <div className="statement-filter" style={{ display: 'flex', justifyContent: 'flex-end', alignItems: 'center', marginBottom: '20px' }}>
                  <div style={{ display: 'flex', gap: '10px' }}>
                    <input type="text" placeholder="Search transactions..." style={{ padding: '10px', border: '1px solid rgba(255,255,255,0.2)', backgroundColor: 'rgba(0,0,0,0.2)', color: '#fff', borderRadius: '8px', width: '250px', outline: 'none' }} />
                    <button style={{ backgroundColor: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '10px 20px', borderRadius: '8px', cursor: 'pointer' }}>Filter</button>
                  </div>
                </div>

                <div style={{ overflowX: 'auto' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse', textAlign: 'left', fontSize: '15px', minWidth: '600px' }}>
                    <thead>
                      <tr style={{ borderBottom: '2px solid rgba(255,255,255,0.1)', backgroundColor: 'rgba(255,255,255,0.05)' }}>
                        <th style={{ padding: '15px', color: '#cbd5e1' }}>Date</th>
                        <th style={{ padding: '15px', color: '#cbd5e1' }}>Transactions</th>
                        <th style={{ padding: '15px', color: '#cbd5e1', textAlign: 'right' }}>Debit</th>
                        <th style={{ padding: '15px', color: '#cbd5e1', textAlign: 'right' }}>Credit</th>
                      </tr>
                    </thead>
                    <tbody>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '15px', color: '#94a3b8' }}>16th July 2026, 10:45 AM EST</td>
                        <td style={{ padding: '15px', color: '#fff', fontWeight: 'bold' }}>ATS/7672/Tirthankar/Axis/1278728/Ns.AJX/(processing)/RBI 892722.</td>
                        <td style={{ padding: '15px', color: '#f43f5e', textAlign: 'right' }}>$1,200.00</td>
                        <td style={{ padding: '15px', color: '#10b981', textAlign: 'right' }}></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '15px', color: '#94a3b8' }}>16th July 2026, 02:30 PM EST</td>
                        <td style={{ padding: '15px', color: '#fff', fontWeight: 'bold' }}>Bank of America/Tirthankar/Axis/127627662/(holding)/ Verification 7827/ RBI 872822</td>
                        <td style={{ padding: '15px', color: '#f43f5e', textAlign: 'right' }}>$63,000.00</td>
                        <td style={{ padding: '15px', color: '#10b981', textAlign: 'right' }}></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '15px', color: '#94a3b8' }}>13th Jul 2026, 09:15 AM EST</td>
                        <td style={{ padding: '15px', color: '#fff', fontWeight: 'bold' }}>Swift transfer/7672/Tirthankar/Axis 1276726/NS.AJX/7862#(processing)</td>
                        <td style={{ padding: '15px', color: '#f43f5e', textAlign: 'right' }}>$800.00</td>
                        <td style={{ padding: '15px', color: '#10b981', textAlign: 'right' }}></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '15px', color: '#94a3b8' }}>2nd Jul 2026, 11:20 AM EST</td>
                        <td style={{ padding: '15px', color: '#fff', fontWeight: 'bold' }}>ACS/processing/charges/76726XG</td>
                        <td style={{ padding: '15px', color: '#f43f5e', textAlign: 'right' }}>$1,000.00</td>
                        <td style={{ padding: '15px', color: '#10b981', textAlign: 'right' }}></td>
                      </tr>
                      <tr style={{ borderBottom: '1px solid rgba(255,255,255,0.05)' }}>
                        <td style={{ padding: '15px', color: '#94a3b8' }}>24th Jun 2026, 04:55 PM EST</td>
                        <td style={{ padding: '15px', color: '#fff', fontWeight: 'bold' }}>AMB CHG/General Electrical/126762/ Wire/28928/US Tres/BT</td>
                        <td style={{ padding: '15px', color: '#f43f5e', textAlign: 'right' }}></td>
                        <td style={{ padding: '15px', color: '#10b981', textAlign: 'right' }}>$64,800.00</td>
                      </tr>
                    </tbody>
                  </table>
                </div>
              </div>
            )}

            {accountSubTab === 'Account Info' && (
              <div style={{ maxWidth: '800px', margin: '0 auto' }}>
                
                {/* Accordion 1: Account Details */}
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)', marginBottom: '20px' }}>
                  <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer', borderBottom: '1px solid rgba(255,255,255,0.1)' }}>
                    <h3 style={{ margin: 0, fontSize: '18px', color: '#fff' }}>Account details</h3>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="18 15 12 9 6 15"></polyline></svg>
                  </div>
                  
                  <div style={{ padding: '25px' }}>
                    <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '30px', marginBottom: '25px' }}>
                      
                      <div>
                        <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '5px' }}>Account Name</div>
                        <div style={{ color: '#fff', fontSize: '15px' }}>Mr. Tirthankar ghosh</div>
                      </div>

                      <div>
                        <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '5px' }}>Account Number</div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
                          <div style={{ color: '#fff', fontSize: '15px', fontFamily: 'monospace' }}>
                            {showAccountNumber ? '76289112378' : '**** **** 2378'}
                          </div>
                          <svg onClick={() => setShowAccountNumber(!showAccountNumber)} style={{ cursor: 'pointer' }} width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="2"><path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path><line x1="1" y1="1" x2="23" y2="23"></line></svg>
                        </div>
                      </div>

                      <div>
                        <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '5px' }}>ABA Number</div>
                        <div style={{ color: '#fff', fontSize: '15px' }}>673866282</div>
                      </div>

                      <div>
                        <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '5px' }}>MICR Number</div>
                        <div style={{ color: '#fff', fontSize: '15px' }}>456272811138</div>
                      </div>

                      <div>
                        <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '5px' }}>Branch ID</div>
                        <div style={{ color: '#fff', fontSize: '15px' }}>7657</div>
                      </div>

                      <div>
                        <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '5px' }}>Branch Address</div>
                        <div style={{ color: '#fff', fontSize: '15px' }}>550 5th Ave, New York, NY 10036</div>
                      </div>

                      <div>
                        <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '5px' }}>Main Balance</div>
                        <div style={{ color: '#10b981', fontSize: '15px', fontWeight: 'bold' }}>$800.00</div>
                      </div>

                      <div>
                        <div style={{ color: '#94a3b8', fontSize: '13px', marginBottom: '5px' }}>Lien Amount</div>
                        <div style={{ color: '#f43f5e', fontSize: '15px', fontWeight: 'bold' }}>
                          <div>~$1,200.00</div>
                          <div>~$63,000.00</div>
                        </div>
                      </div>

                    </div>
                    
                    <div style={{ borderTop: '1px solid rgba(255,255,255,0.1)', paddingTop: '20px', display: 'flex', alignItems: 'center', gap: '10px', color: '#3b82f6', cursor: 'pointer', fontWeight: 'bold', fontSize: '14px' }} onClick={() => openModal('Share', 'Account details copied to clipboard!')}>
                      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect><path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1"></path></svg>
                      Copy & Share Account Details
                    </div>
                  </div>
                </div>

                {/* Accordion 2: Nominee */}
                <div style={{ backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', border: '1px solid rgba(255,255,255,0.1)' }}>
                  <div style={{ padding: '20px', display: 'flex', justifyContent: 'space-between', alignItems: 'center', cursor: 'pointer' }} onClick={() => openModal('Nominee Details', 'Nominee functionality is currently restricted.')}>
                    <h3 style={{ margin: 0, fontSize: '18px', color: '#fff' }}>Nominee and Account Holder Details</h3>
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#94a3b8" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg>
                  </div>
                </div>
                
              </div>
            )}

            {accountSubTab === 'Linked Debit Card' && (
              <div style={{ textAlign: 'center', padding: '60px' }}>
                <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke="#3b82f6" strokeWidth="1.5" style={{ margin: '0 auto 20px auto' }}><rect x="2" y="5" width="20" height="14" rx="2" ry="2"></rect><line x1="2" y1="10" x2="22" y2="10"></line></svg>
                <h2 style={{ color: '#fff', marginBottom: '15px' }}>Linked Debit Cards</h2>
                <p style={{ color: '#94a3b8', maxWidth: '400px', margin: '0 auto 25px auto' }}>You have one Platinum Debit Card linked to this account.</p>
                <button onClick={() => openModal('Card Settings', 'Opening Debit Card controls...')} style={{ padding: '12px 25px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer' }}>Manage Debit Card</button>
              </div>
            )}

          </div>
        )}

        {/* TAB 5: INVEST (Merrill Edge) */}
        {activeTab === 'Invest' && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <div className="statement-header" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '40px', borderBottom: '1px solid rgba(255,255,255,0.1)', paddingBottom: '20px' }}>
              <div>
                <h1 style={{ fontSize: '28px', color: '#fff', margin: '0 0 10px 0' }}>Merrill Edge® Self-Directed Investing</h1>
                <p style={{ color: '#94a3b8', margin: 0, fontSize: '15px' }}>Take control of your investments and retirement planning.</p>
              </div>
              <div style={{ textAlign: 'right' }}>
                <div style={{ color: '#94a3b8', fontSize: '13px', textTransform: 'uppercase', letterSpacing: '1px' }}>Total Investment Balance</div>
                <div style={{ fontSize: '32px', fontWeight: 'bold', color: '#10b981' }}>$0.00</div>
              </div>
            </div>

            <div style={{ display: 'flex', gap: '25px', flexWrap: 'wrap' }}>
              <div style={{ flex: '1', minWidth: '250px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '30px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '20px', color: '#fff', marginTop: 0 }}>Traditional IRA</h3>
                <p style={{ color: '#cbd5e1', lineHeight: '1.5', flex: 1 }}>Enjoy tax-deferred growth for your retirement savings. Contributions may be tax-deductible.</p>
                <button onClick={() => openModal('Open Traditional IRA', 'Redirecting to Merrill Edge secure application...')} style={{ width: '100%', padding: '15px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>Open Traditional IRA</button>
              </div>
              
              <div style={{ flex: '1', minWidth: '250px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '30px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '20px', color: '#fff', marginTop: 0 }}>Roth IRA</h3>
                <p style={{ color: '#cbd5e1', lineHeight: '1.5', flex: 1 }}>Invest with after-tax dollars and enjoy tax-free growth and withdrawals in retirement.</p>
                <button onClick={() => openModal('Open Roth IRA', 'Redirecting to Merrill Edge secure application...')} style={{ width: '100%', padding: '15px', backgroundColor: '#3b82f6', color: '#fff', border: 'none', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>Open Roth IRA</button>
              </div>

              <div style={{ flex: '1', minWidth: '250px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '12px', padding: '30px', border: '1px solid rgba(255,255,255,0.1)', display: 'flex', flexDirection: 'column' }}>
                <h3 style={{ fontSize: '20px', color: '#fff', marginTop: 0 }}>General Brokerage</h3>
                <p style={{ color: '#cbd5e1', lineHeight: '1.5', flex: 1 }}>Trade stocks, ETFs, mutual funds, and options with $0 online equity and ETF trades.</p>
                <button onClick={() => openModal('Open Brokerage Account', 'Redirecting to Merrill Edge secure application...')} style={{ width: '100%', padding: '15px', backgroundColor: 'transparent', color: '#3b82f6', border: '2px solid #3b82f6', borderRadius: '8px', fontWeight: 'bold', cursor: 'pointer', marginTop: '20px' }}>Open Brokerage Account</button>
              </div>
            </div>
          </div>
        )}

        {/* TAB 6: PLACEHOLDERS */}
        {['CDs', 'Bills & Recharges', 'Loans', 'Insure'].includes(activeTab) && (
          <div style={{ backgroundColor: 'rgba(255,255,255,0.03)', padding: '60px 40px', borderRadius: '16px', border: '1px solid rgba(255,255,255,0.08)', textAlign: 'center', maxWidth: '800px', margin: '0 auto', boxShadow: '0 10px 30px rgba(0,0,0,0.2)' }}>
            <div style={{ fontSize: '50px', marginBottom: '25px', display: 'inline-block', padding: '20px', backgroundColor: 'rgba(255,255,255,0.05)', borderRadius: '50%' }}>
              {activeTab === 'CDs' && '📈'}
              {activeTab === 'Bills & Recharges' && '🧾'}
              {activeTab === 'Loans' && '🏡'}
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
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: modalState.title === 'Notifications' ? 'transparent' : 'rgba(0,0,0,0.8)', display: 'flex', alignItems: modalState.title === 'Notifications' ? 'flex-start' : 'center', justifyContent: modalState.title === 'Notifications' ? 'flex-end' : 'center', zIndex: 1000, padding: modalState.title === 'Notifications' ? '80px 40px 20px 20px' : '20px' }}>
          <div className="modal-box" style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', maxWidth: '400px', width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', textAlign: 'center', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
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

      {/* Theme Selection Modal */}
      {isThemeModalOpen && (
        <div style={{ position: 'fixed', top: 0, left: 0, right: 0, bottom: 0, backgroundColor: 'rgba(0,0,0,0.8)', display: 'flex', alignItems: 'center', justifyContent: 'center', zIndex: 1100, padding: '20px' }}>
          <div className="modal-box" style={{ backgroundColor: '#1e293b', padding: '40px', borderRadius: '16px', maxWidth: '400px', width: '100%', boxShadow: '0 20px 50px rgba(0,0,0,0.5)', textAlign: 'center', color: '#fff', border: '1px solid rgba(255,255,255,0.1)' }}>
            <h2 style={{ margin: '0 0 10px 0', fontSize: '22px' }}>Choose a Theme</h2>
            <p style={{ color: '#94a3b8', fontSize: '15px', marginBottom: '25px' }}>Personalize your banking experience.</p>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px', marginBottom: '30px' }}>
              {themeOptions.map(themeOption => (
                <button 
                  key={themeOption.name}
                  onClick={() => { setAppTheme(themeOption.color); setIsThemeModalOpen(false); }}
                  style={{ 
                    padding: '15px', 
                    backgroundColor: themeOption.color, 
                    color: '#fff', 
                    border: appTheme === themeOption.color ? '2px solid #fff' : '2px solid transparent', 
                    borderRadius: '8px', 
                    fontWeight: 'bold', 
                    cursor: 'pointer',
                    display: 'flex',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                    transition: 'all 0.2s'
                  }}
                >
                  {themeOption.name}
                  {appTheme === themeOption.color && (
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#fff" strokeWidth="2"><polyline points="20 6 9 17 4 12"></polyline></svg>
                  )}
                </button>
              ))}
            </div>

            <button onClick={() => setIsThemeModalOpen(false)} style={{ padding: '15px 40px', backgroundColor: 'transparent', color: '#94a3b8', border: 'none', cursor: 'pointer', fontSize: '16px', width: '100%' }}>Cancel</button>
          </div>
        </div>
      )}

    </div>
  );
}

export default Dashboard;
