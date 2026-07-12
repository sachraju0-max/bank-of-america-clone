import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

function Home() {
  const navigate = useNavigate();
  const [userId, setUserId] = useState('');
  const [password, setPassword] = useState('');
  const [loginError, setLoginError] = useState('');

  const handleLogin = (e) => {
    e.preventDefault();
    if (userId === '67282212' && password === '336728sS') {
      setLoginError('');
      navigate('/dashboard');
    } else {
      setLoginError('Invalid User ID or Password.');
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="hero-section">
        {/* Left Login Area */}
        <div className="login-box">
          <div className="login-header-accent"></div>
          <div className="login-form-container">
            <form onSubmit={handleLogin}>
              {loginError && <div style={{ color: '#e31837', fontSize: '14px', marginBottom: '10px' }}>{loginError}</div>}
              <div className="input-group">
                <label>User ID</label>
                <input type="text" value={userId} onChange={(e) => setUserId(e.target.value)} />
              </div>
              <div className="input-group">
                <label>Password</label>
                <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
              </div>
              <div className="checkbox-group">
                <input type="checkbox" id="saveId" />
                <label htmlFor="saveId">Save user ID</label>
              </div>
              <button type="submit" className="login-btn">Log in</button>
            </form>
            <div className="login-links" style={{marginTop: '15px'}}>
              <div style={{marginBottom: '5px'}}>
                <a href="https://secure.bankofamerica.com/login/reset/entry/forgotIDPwdScreen.go" target="_blank" rel="noopener noreferrer">Forgot user ID/password</a>
              </div>
              <div>
                <Link to="/security">Security & Help</Link> &nbsp;&nbsp;&nbsp; <a href="https://secure.bankofamerica.com/login/enroll/entry/secureIdEnroll.go" target="_blank" rel="noopener noreferrer">Enroll</a>
              </div>
            </div>
          </div>
        </div>

        {/* Right Cards Area */}
        <div className="cards-section">
          <h1>Choose the card that works for you</h1>
          <div className="cards-grid">
            
            {/* Card 1 */}
            <div className="card-col">
              <div className="card-offer">6<span>%</span></div>
              <div className="card-desc">cash back offer</div>
              <div className="card-fee">No annual fee.</div>
              <div className="card-image-wrapper">
                <img src="/content/images/ContextualSiteGraphics/CreditCardArt/en_US/Approved_PCM/8blm_trvsigcm_v_250x158.png" alt="Customized Cash Rewards" style={{width: '100%', borderRadius: '8px', filter: 'hue-rotate(140deg) saturate(2.5) brightness(0.9)'}} />
              </div>
              <div className="card-title">Customized Cash Rewards</div>
            </div>

            {/* Card 2 */}
            <div className="card-col">
              <div className="card-offer">2<span>%</span></div>
              <div className="card-desc">cash back offer</div>
              <div className="card-fee">No annual fee.</div>
              <div className="card-image-wrapper">
                <img src="/content/images/ContextualSiteGraphics/CreditCardArt/en_US/Approved_PCM/8blm_trvsigcm_v_250x158.png" alt="Unlimited Cash Rewards" style={{width: '100%', borderRadius: '8px', filter: 'grayscale(0.8) brightness(1.4) contrast(1.1)'}} />
              </div>
              <div className="card-title">Unlimited Cash Rewards</div>
            </div>

            {/* Card 3 */}
            <div className="card-col">
              <div className="card-offer">1.5</div>
              <div className="card-desc">points for every $1</div>
              <div className="card-fee">No annual fee.</div>
              <div className="card-image-wrapper">
                <img src="/content/images/ContextualSiteGraphics/CreditCardArt/en_US/Approved_PCM/8blm_trvsigcm_v_250x158.png" alt="Travel Rewards" style={{width: '100%', borderRadius: '8px'}} />
              </div>
              <div className="card-title">Travel Rewards</div>
            </div>

            {/* Card 4 */}
            <div className="card-col">
              <div className="card-offer">0<span>%</span></div>
              <div className="card-desc">intro APR offer</div>
              <div className="card-fee">No annual fee.</div>
              <div className="card-image-wrapper">
                <img src="/content/images/ContextualSiteGraphics/CreditCardArt/en_US/Approved_PCM/8blm_trvsigcm_v_250x158.png" alt="BankAmericard" style={{width: '100%', borderRadius: '8px', filter: 'grayscale(100%) brightness(0.55) contrast(1.2)'}} />
              </div>
              <div className="card-title">BankAmericard®</div>
            </div>

          </div>
        </div>
      </section>

      {/* Global Notification Banner */}
      <div className="global-notification" style={{backgroundColor: '#fff', width: '100%', borderBottom: '1px solid #ccc'}}>
        <div style={{display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderLeft: '4px solid #e31837', padding: '15px 20px', margin: '0 auto', maxWidth: '1200px'}}>
          <div style={{display: 'flex', alignItems: 'center'}}>
            <div style={{width: '32px', height: '32px', borderRadius: '50%', border: '2px solid #e31837', color: '#e31837', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 'bold', fontSize: '18px', marginRight: '15px'}}>
              $
            </div>
            <div style={{fontSize: '16px', color: '#333'}}>
              <strong>CASH OFFER UP TO $500</strong> for new checking customers <Link to="/checking" style={{color: '#0052c2', textDecoration: 'none'}}>See details &gt;</Link>
            </div>
          </div>
          <div style={{color: '#666', cursor: 'pointer', fontSize: '20px', padding: '0 10px'}}>
            &times;
          </div>
        </div>
      </div>

      {/* Features Section */}
      <section className="features-section">
        
        <div className="feature-item">
          <div className="feature-icon">
            <svg width="60" height="40" viewBox="0 0 60 40">
              <rect x="2" y="2" width="56" height="36" rx="4" fill="none" stroke="#012169" strokeWidth="2"/>
              <rect x="6" y="8" width="12" height="8" rx="2" fill="none" stroke="#012169" strokeWidth="2"/>
              <line x1="6" y1="28" x2="20" y2="28" stroke="#012169" strokeWidth="2"/>
              <line x1="24" y1="28" x2="38" y2="28" stroke="#012169" strokeWidth="2"/>
              <line x1="42" y1="28" x2="54" y2="28" stroke="#012169" strokeWidth="2"/>
            </svg>
          </div>
          <h3>6% customized<br/>cash back offer</h3>
          <p>Earn more cash back in the category of your choice with the Customized Cash Rewards credit card.</p>
          <Link to="/credit-cards">Apply now</Link>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <rect x="2" y="8" width="36" height="24" rx="2" fill="none" stroke="#e31837" strokeWidth="2"/>
              <circle cx="20" cy="20" r="6" fill="none" stroke="#e31837" strokeWidth="2"/>
              <text x="20" y="25" fontSize="14" fill="#e31837" textAnchor="middle" fontWeight="bold">$</text>
            </svg>
          </div>
          <h3>Cash offer up to $500</h3>
          <p>Check out this offer for new checking customers.</p>
          <Link to="/checking">See details</Link>
        </div>

        <div className="feature-item">
          <div className="feature-icon">
            <svg width="40" height="40" viewBox="0 0 40 40">
              <path d="M20 4 C14 4, 10 10, 10 16 L8 28 L32 28 L30 16 C30 10, 26 4, 20 4 Z" fill="none" stroke="#e31837" strokeWidth="2"/>
              <path d="M16 30 C16 33, 24 33, 24 30" fill="none" stroke="#e31837" strokeWidth="2"/>
            </svg>
          </div>
          <h3>Custom mobile alerts</h3>
          <p>With our Mobile Banking app alerts, prioritize what you see based on what matters most to you.</p>
          <Link to="/mobile-app">Get the app</Link>
        </div>

        <div className="feature-item merrill">
          <div className="feature-icon">
             <svg width="150" height="40" viewBox="0 0 150 40">
               <text x="0" y="20" fontSize="18" fontWeight="bold" fill="#012169" letterSpacing="2">MERRILL</text>
               <text x="0" y="32" fontSize="9" fill="#012169" letterSpacing="0.5">A BANK OF AMERICA COMPANY</text>
               <path d="M120 10 Q125 5 130 10 Q135 15 130 25 L120 25 Z" fill="#012169"/>
               <circle cx="120" cy="15" r="2" fill="white"/>
             </svg>
          </div>
          <h3>Solutions built around you</h3>
          <p>At Merrill, we provide the tools, people and know-how to help you pursue your financial goals.</p>
          <a href="https://www.merrilledge.com" target="_blank" rel="noopener noreferrer">Get started</a>
        </div>

      </section>

      {/* Better Money Habits Section */}
      <section className="bmh-section">
        <h2 className="bmh-title">Your financial goals matter</h2>
        <p className="bmh-subtitle">We can help you achieve them through Better Money Habits® financial education and programs that make communities stronger.</p>
        
        <div className="bmh-grid">
          <a href="https://bettermoneyhabits.bankofamerica.com" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="bmh-card">
              <div className="bmh-card-image">
                <img src="/images/assets-images-site-homepage-bmh-module-default-education-bac-edu-tile-397x360-tablet-1-q2-new-CSX4ac217ce.jpg" alt="Money Confessions" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <div className="bmh-card-content">
                <h3>Money Confessions ‐ real people share their experiences and get helpful guidance</h3>
              </div>
            </div>
          </a>
          <a href="https://bettermoneyhabits.bankofamerica.com" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="bmh-card">
              <div className="bmh-card-image">
                <img src="/images/assets-images-site-homepage-bmh-module-default-education-bac-edu-tile-397x360-tablet-1-new-CSXf09a6c23.jpg" alt="Home Equity" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <div className="bmh-card-content">
                <h3>How does a home equity line of credit work—and how can it help?</h3>
              </div>
            </div>
          </a>
          <a href="https://bettermoneyhabits.bankofamerica.com" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="bmh-card">
              <div className="bmh-card-image">
                <img src="/images/assets-images-site-homepage-bmh-module-default-education-bac-edu-tile-397x360-tablet-3-q2-CSX378d7c3d.jpg" alt="Savings and CDs" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <div className="bmh-card-content">
                <h3>Savings accounts and CDs: Which should I choose?</h3>
              </div>
            </div>
          </a>
          <a href="https://bettermoneyhabits.bankofamerica.com" target="_blank" rel="noopener noreferrer" style={{textDecoration: 'none', color: 'inherit'}}>
            <div className="bmh-card">
              <div className="bmh-card-image">
                <img src="/images/assets-images-site-homepage-bmh-module-default-education-bac-edu-tile-397x360-tablet-4-new-CSXb13ca8f4.jpg" alt="Savings Success" style={{width: '100%', height: '100%', objectFit: 'cover'}} />
              </div>
              <div className="bmh-card-content">
                <h3>Retrain your brain for savings success with these money-saving challenges</h3>
              </div>
            </div>
          </a>
        </div>
        
        <div className="bmh-footer">
          <p>Explore more topics and build your financial know-how.</p>
          <a href="https://bettermoneyhabits.bankofamerica.com" target="_blank" rel="noopener noreferrer" className="bmh-btn">Visit Better Money Habits®</a>
        </div>
      </section>

      {/* Security & Mobile Section */}
      <section className="security-mobile-section">
        <div className="security-block">
          <h3>Level up your account security</h3>
          <p>Watch your security meter rise as you take action to help protect against fraud. See it in the Security Center in Mobile and Online Banking.</p>
          <img src="/images/assets-images-site-homepage-news-life-services-yni_sec_phone_4657392_e-CSX2a8c4a8a.png" alt="Security Meter" style={{height: '100px', display: 'block', margin: '15px 0'}} />
          <Link to="/security" className="action-link">Check your account security level</Link>
        </div>
        <div className="mobile-block">
          <h3>Convenient banking with our Mobile app</h3>
          <img src="/images/assets-images-site-homepage-news-mobileAppIPhone-CSX16b160ab.png" alt="Mobile App" style={{height: '100px', display: 'block', margin: '15px 0'}} />
          <Link to="/mobile-app" className="action-link">Explore our mobile app</Link>
        </div>
      </section>
    </>
  );
}

export default Home;
