import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Layout from './Layout';
import Home from './pages/Home';
import Mortgage from './pages/Mortgage';
import Checking from './pages/Checking';
import Savings from './pages/Savings';
import CreditCards from './pages/CreditCards';
import Help from './pages/Help';
import AutoLoans from './pages/AutoLoans';
import PlaceholderPage from './pages/PlaceholderPage';
import Dashboard from './pages/Dashboard';
import './index.css';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Home />} />
          <Route path="mortgage" element={<Mortgage />} />
          <Route path="checking" element={<Checking />} />
          <Route path="savings" element={<Savings />} />
          <Route path="credit-cards" element={<CreditCards />} />
          <Route path="help" element={<Help />} />
          <Route path="auto-loans" element={<AutoLoans />} />
          <Route path="*" element={<PlaceholderPage />} />
        </Route>
        
        {/* Secure Logged-in Area */}
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </Router>
  );
}

export default App;
