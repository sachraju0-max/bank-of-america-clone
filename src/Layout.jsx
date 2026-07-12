import React from 'react';
import { Outlet, Link } from 'react-router-dom';

function Layout() {
  return (
    <div>
      {/* Utility Bar */}
      <div className="utility-bar">
        <span>Bank of America deposit products: </span>
        <strong className="fdic-logo">FDIC</strong>
        <span> FDIC-Insured - Backed by the full faith and credit of the U.S. Government</span>
      </div>

      {/* Secondary Nav */}
      <div className="secondary-nav">
        <div className="sec-nav-left">
          <Link to="/" className="active">Personal</Link>
          <a href="https://www.ml.com" target="_blank" rel="noopener noreferrer">Wealth Management</a>
          <Link to="/business">Business</Link>
          <a href="https://business.bofa.com" target="_blank" rel="noopener noreferrer">Corporations &amp; Institutions</a>
        </div>
        <div className="sec-nav-right">
          <Link to="/security">Security</Link>
          <Link to="/about">About Us</Link>
          <Link to="/es" className="lang-toggle">
            <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="12" cy="12" r="10"></circle><line x1="2" y1="12" x2="22" y2="12"></line><path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path></svg>
            En español
          </Link>
          <Link to="/contact">Contact Us</Link>
          <Link to="/help">Help</Link>
        </div>
      </div>

      {/* Header */}
      <header className="header">
        <div className="logo-container">
          <Link to="/" style={{display: 'flex', alignItems: 'center', gap: '10px'}}>
            <img src="/images/bank_of_america_logo.svg" alt="Bank of America Logo" width="260" style={{marginTop: '5px'}} />
          </Link>
        </div>
        <div className="search-bar">
          <input type="text" placeholder="Search" />
          <div className="search-icon">
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>
          </div>
        </div>
      </header>

      {/* Main Nav */}
      <nav className="main-nav">
        <Link to="/checking">Checking <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></Link>
        <Link to="/savings">Savings & CDs <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></Link>
        <Link to="/credit-cards">Credit Cards <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></Link>
        <Link to="/mortgage">Home Loans <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></Link>
        <Link to="/auto-loans">Auto Loans <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></Link>
        <a href="https://www.merrilledge.com" target="_blank" rel="noopener noreferrer">Merrill Investing <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
        <a href="https://bettermoneyhabits.bankofamerica.com" target="_blank" rel="noopener noreferrer">Better Money Habits® <svg width="10" height="10" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><polyline points="6 9 12 15 18 9"></polyline></svg></a>
      </nav>

      <main>
        <Outlet />
      </main>

      {/* Footer Nav */}
      <section style={{display: 'flex', justifyContent: 'center', gap: '20px', padding: '40px 0', borderBottom: '1px solid #ccc', maxWidth: '1200px', margin: '0 auto', backgroundColor: '#fff'}}>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', padding: '20px', width: '200px', borderRadius: '4px'}}>
          <div style={{color: '#0052c2', marginBottom: '10px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><rect x="3" y="4" width="18" height="18" rx="2" ry="2"></rect><line x1="16" y1="2" x2="16" y2="6"></line><line x1="8" y1="2" x2="8" y2="6"></line><line x1="3" y1="10" x2="21" y2="10"></line></svg></div>
          <Link to="/appointments" style={{color: '#0052c2', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px'}}>Schedule an appointment</Link>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', padding: '20px', width: '200px', borderRadius: '4px'}}>
          <div style={{color: '#0052c2', marginBottom: '10px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z"></path><circle cx="12" cy="10" r="3"></circle></svg></div>
          <a href="https://locators.bankofamerica.com" target="_blank" rel="noopener noreferrer" style={{color: '#0052c2', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px'}}>Find a location</a>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', padding: '20px', width: '200px', borderRadius: '4px'}}>
          <div style={{color: '#0052c2', marginBottom: '10px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z"></path></svg></div>
          <Link to="/contact" style={{color: '#0052c2', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px'}}>Contact us</Link>
        </div>
        <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', border: '1px solid #ccc', padding: '20px', width: '200px', borderRadius: '4px'}}>
          <div style={{color: '#0052c2', marginBottom: '10px'}}><svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><line x1="12" y1="16" x2="12" y2="12"></line><line x1="12" y1="8" x2="12.01" y2="8"></line></svg></div>
          <Link to="/help" style={{color: '#0052c2', textDecoration: 'none', fontWeight: 'bold', fontSize: '14px'}}>Help center</Link>
        </div>
      </section>

      {/* Investment Grid & Disclosures */}
      <section className="disclosures-section" style={{maxWidth: '1200px', margin: '40px auto', padding: '0 20px', fontFamily: 'Arial, sans-serif', fontSize: '11px', color: '#666'}}>
        <div style={{marginBottom: '10px', fontSize: '12px'}}>Investment and insurance products:</div>
        <table style={{width: '100%', borderCollapse: 'collapse', textAlign: 'center', marginBottom: '30px', backgroundColor: '#f9f9f9'}}>
          <tbody>
            <tr>
              <td style={{border: '1px solid #ccc', padding: '20px 10px'}}><strong>Are Not FDIC Insured</strong></td>
              <td style={{border: '1px solid #ccc', padding: '20px 10px'}}><strong>Are Not Bank Guaranteed</strong></td>
              <td style={{border: '1px solid #ccc', padding: '20px 10px'}}><strong>May Lose Value</strong></td>
            </tr>
            <tr>
              <td style={{border: '1px solid #ccc', padding: '20px 10px'}}><strong>Are Not Deposits</strong></td>
              <td style={{border: '1px solid #ccc', padding: '20px 10px'}}><strong>Are Not Insured by Any Federal Government Agency</strong></td>
              <td style={{border: '1px solid #ccc', padding: '20px 10px'}}><strong>Are Not a Condition to Any Banking Service or Activity</strong></td>
            </tr>
          </tbody>
        </table>

        <div style={{lineHeight: '1.6'}}>
          <p><a href="/www.bankofamerica.com/online-banking/online-banking-security-guarantee/index.html" style={{color: '#0052c2', textDecoration: 'none', fontWeight: 'bold', fontSize: '12px'}}>Online Banking Service Agreement</a></p>
          <p style={{margin: '15px 0'}}>Investing in securities involves risks, and there is always the potential of losing money when you invest in securities. You should review any planned financial transactions that may have tax or legal implications with your personal tax or legal advisor.</p>
          <p style={{margin: '15px 0'}}>Securities products are provided by Merrill Lynch, Pierce, Fenner & Smith Incorporated (also referred to as "MLPF&S", or "Merrill"), a registered broker-dealer, registered investment adviser, <a href="https://www.sipc.org" target="_blank" rel="noopener noreferrer" style={{color: '#0052c2', textDecoration: 'underline'}}>Member SIPC</a>, and a wholly-owned subsidiary of Bank of America Corporation. MLPF&S makes available certain investment products sponsored, managed, distributed or provided by companies that are affiliates of Bank of America Corporation.</p>
          <p style={{margin: '15px 0'}}>Bank of America Private Bank is a division of Bank of America, N.A., Member FDIC and a wholly owned subsidiary of Bank of America Corporation. Trust and fiduciary services are provided by Bank of America, N.A. and U.S. Trust Company of Delaware. Both are indirect subsidiaries of Bank of America Corporation.</p>
          <p style={{margin: '15px 0'}}>Insurance Products are offered through Merrill Lynch Life Agency Inc. (MLLA) and/or Banc of America Insurance Services, Inc., both of which are licensed insurance agencies and wholly-owned subsidiaries of Bank of America Corporation.</p>
          <p style={{margin: '15px 0'}}>Banking, credit card, automobile loans, mortgage and home equity products are provided by Bank of America, N.A. and affiliated banks, Members FDIC and wholly owned subsidiaries of Bank of America Corporation. Credit and collateral are subject to approval. Terms and conditions apply. This is not a commitment to lend. Programs, rates, terms and conditions are subject to change without notice.</p>
        </div>
      </section>

      {/* Dark Blue Footer */}
      <footer style={{backgroundColor: '#012169', color: '#fff', textAlign: 'center', padding: '50px 20px', fontFamily: 'Arial, sans-serif', fontSize: '12px'}}>
        <div style={{maxWidth: '1200px', margin: '0 auto'}}>
          <div style={{marginBottom: '15px'}}>
            <a href="https://locators.bankofamerica.com" target="_blank" rel="noopener noreferrer" style={{color: '#fff', textDecoration: 'none', margin: '0 8px', fontWeight: 'bold'}}>Locations</a> | 
            <Link to="/contact" style={{color: '#fff', textDecoration: 'none', margin: '0 8px', fontWeight: 'bold'}}>Contact Us</Link> | 
            <Link to="/help" style={{color: '#fff', textDecoration: 'none', margin: '0 8px', fontWeight: 'bold'}}>Help & Support</Link> | 
            <Link to="/accessible-banking" style={{color: '#fff', textDecoration: 'none', margin: '0 8px', fontWeight: 'bold'}}>Browse with Specialist</Link> | 
            <Link to="/accessible-banking" style={{color: '#fff', textDecoration: 'none', margin: '0 8px', fontWeight: 'bold'}}>Accessible Banking</Link> | 
            <Link to="/privacy" style={{color: '#fff', textDecoration: 'none', margin: '0 8px', fontWeight: 'bold'}}>Privacy</Link> | 
            <Link to="/childrens-privacy" style={{color: '#fff', textDecoration: 'none', margin: '0 8px', fontWeight: 'bold'}}>Children's Privacy</Link> | 
            <Link to="/security" style={{color: '#fff', textDecoration: 'none', margin: '0 8px', fontWeight: 'bold'}}>Security</Link> | 
            <Link to="/online-banking-security" style={{color: '#fff', textDecoration: 'none', margin: '0 8px', fontWeight: 'bold'}}>Online Banking Service Agreement</Link> | 
            <Link to="/privacy" style={{color: '#fff', textDecoration: 'none', margin: '0 8px', fontWeight: 'bold'}}>AdChoices</Link>
          </div>
          <div style={{marginBottom: '40px'}}>
            <Link to="/privacy" style={{color: '#fff', textDecoration: 'none', margin: '0 8px', fontWeight: 'bold'}}>Your Privacy Choices</Link> | 
            <Link to="/sitemap" style={{color: '#fff', textDecoration: 'none', margin: '0 8px', fontWeight: 'bold'}}>Site Map</Link> | 
            <a href="https://careers.bankofamerica.com" target="_blank" rel="noopener noreferrer" style={{color: '#fff', textDecoration: 'none', margin: '0 8px', fontWeight: 'bold'}}>Careers</a> | 
            <a href="https://www.bankofamerica.com" target="_blank" rel="noopener noreferrer" style={{color: '#fff', textDecoration: 'none', margin: '0 8px', fontWeight: 'bold'}}>Share Your Feedback</a> | 
            <a href="https://www.bankofamerica.com" target="_blank" rel="noopener noreferrer" style={{color: '#fff', textDecoration: 'none', margin: '0 8px', fontWeight: 'bold'}}>View Full Online Banking Site</a>
          </div>
          
          <div style={{marginBottom: '15px', fontWeight: 'bold', fontSize: '13px'}}>Connect with us</div>
          <div style={{display: 'flex', justifyContent: 'center', gap: '20px', marginBottom: '40px'}}>
            <a href="https://www.facebook.com/BankofAmerica/" target="_blank" rel="noopener noreferrer" style={{color: '#fff', textDecoration: 'none', border: '1px solid #fff', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3.61l.39-4H14V7a1 1 0 011-1h3z"></path></svg></a>
            <a href="https://www.instagram.com/bankofamerica/" target="_blank" rel="noopener noreferrer" style={{color: '#fff', textDecoration: 'none', border: '1px solid #fff', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><rect x="2" y="2" width="20" height="20" rx="5" ry="5"></rect><path d="M16 11.37A4 4 0 1112.63 8 4 4 0 0116 11.37z"></path><line x1="17.5" y1="6.5" x2="17.51" y2="6.5"></line></svg></a>
            <a href="https://www.linkedin.com/company/bank-of-america/" target="_blank" rel="noopener noreferrer" style={{color: '#fff', textDecoration: 'none', border: '1px solid #fff', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z"></path><circle cx="4" cy="4" r="2"></circle></svg></a>
            <a href="https://www.pinterest.com/bankofamerica/" target="_blank" rel="noopener noreferrer" style={{color: '#fff', textDecoration: 'none', border: '1px solid #fff', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 2C6.5 2 2 6.5 2 12c0 4.3 2.6 8 6.4 9.4-.1-.8-.2-2 .04-2.9l1.2-5.1s-.3-.6-.3-1.5c0-1.4.8-2.5 1.8-2.5.8 0 1.2.6 1.2 1.4 0 .9-.5 2.1-.8 3.3-.2 1 .5 1.8 1.5 1.8 1.8 0 3.1-1.9 3.1-4.6 0-2.4-1.7-4.1-4.2-4.1-2.9 0-4.6 2.2-4.6 4.4 0 .8.3 1.7.7 2.2.1.1.1.2.1.3-.1.4-.3 1.1-.3 1.3 0 .2-.2.2-.4.1-1.5-.7-2.4-2.8-2.4-4.5 0-3.6 2.6-7 7.6-7 4.1 0 7.2 2.9 7.2 6.8 0 4.1-2.6 7.4-6.2 7.4-1.2 0-2.4-.6-2.8-1.4l-.8 2.9c-.3 1.1-1.1 2.5-1.6 3.4 1 .3 2.1.5 3.3.5 5.5 0 10-4.5 10-10S17.5 2 12 2z"></path></svg></a>
            <a href="https://twitter.com/BankofAmerica" target="_blank" rel="noopener noreferrer" style={{color: '#fff', textDecoration: 'none', border: '1px solid #fff', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z"></path></svg></a>
            <a href="https://www.youtube.com/user/bankofamerica" target="_blank" rel="noopener noreferrer" style={{color: '#fff', textDecoration: 'none', border: '1px solid #fff', borderRadius: '50%', width: '30px', height: '30px', display: 'flex', alignItems: 'center', justifyContent: 'center'}}><svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M22.54 6.42a2.78 2.78 0 00-1.94-2C18.88 4 12 4 12 4s-6.88 0-8.6.46a2.78 2.78 0 00-1.94 2A29 29 0 001 11.75a29 29 0 00.46 5.33 2.78 2.78 0 001.94 2C5.12 19.5 12 19.5 12 19.5s6.88 0 8.6-.46a2.78 2.78 0 001.94-2 29 29 0 00.46-5.33 29 29 0 00-.46-5.33zM9.75 15.02V8.48L15.5 11.75l-5.75 3.27z"></path></svg></a>
          </div>
          
          <div style={{fontSize: '11px', lineHeight: '1.8'}}>
            <p style={{margin: '0'}}>Bank of America, N.A. Member FDIC. Equal Housing Lender</p>
            <p style={{margin: '0'}}>&copy; 2026 Bank of America Corporation. All rights reserved.</p>
            <p style={{margin: '0'}}><a href="https://patents.bankofamerica.com" target="_blank" rel="noopener noreferrer" style={{color: '#fff', textDecoration: 'underline'}}>Patent: patents.bankofamerica.com</a></p>
          </div>
        </div>
      </footer>
    </div>
  );
}

export default Layout;
