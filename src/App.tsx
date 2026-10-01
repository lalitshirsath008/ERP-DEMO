import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import VendorLedger from './components/VendorLedger';
import PurchaseOrderHistory from './components/PurchaseOrderHistory';
import InventoryAvailable from './components/InventoryAvailable';
import LoginPage from './components/LoginPage';
import { Maximize2, Moon, User } from 'lucide-react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');

  // Check if already logged in (optional persistence)
  useEffect(() => {
    const savedAuth = localStorage.getItem('erp_auth');
    if (savedAuth === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  const handleLogin = (user: string, pass: string) => {
    if (user === 'admin' && pass === 'admin123') {
      setIsLoggedIn(true);
      localStorage.setItem('erp_auth', 'true');
      return true;
    }
    return false;
  };

  const handleLogout = () => {
    setIsLoggedIn(false);
    localStorage.removeItem('erp_auth');
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className="flex h-screen bg-slate-950 text-slate-200 font-sans selection:bg-blue-500/30">
      <Sidebar activeTab={activeTab} setActiveTab={(tab) => {
        if (tab === 'logout') handleLogout();
        else setActiveTab(tab);
      }} />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden">
        <header className="h-16 border-b border-slate-800 bg-slate-950/50 backdrop-blur-md flex items-center justify-between px-8 shrink-0 sticky top-0 z-10">
          <div className="flex items-center gap-3 text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">
            <span>Vendor Portal</span>
            <span className="text-slate-800">/</span>
            <span className="text-blue-500">
              {activeTab === 'dashboard' && 'Dashboard'}
              {activeTab === 'ledger' && 'Vendor Ledger'}
              {activeTab === 'orders' && 'Purchase Order History'}
              {activeTab === 'inventory' && 'Inventory available'}
            </span>
          </div>
          
          <div className="flex items-center gap-4">
            <button className="text-slate-500 hover:text-slate-300 transition-colors">
              <Maximize2 size={16} />
            </button>
            <button className="text-slate-500 hover:text-slate-300 transition-colors">
              <Moon size={16} />
            </button>
            <div className="w-8 h-8 rounded-full bg-blue-600 flex items-center justify-center text-xs font-bold text-white shadow-lg shadow-blue-900/20">
              D
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
          {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'ledger' && <VendorLedger />}
          {activeTab === 'orders' && <PurchaseOrderHistory />}
          {activeTab === 'inventory' && <InventoryAvailable />}
        </main>

        <footer className="h-12 border-t border-slate-800 bg-slate-950 flex items-center justify-between px-8 text-[10px] font-semibold text-slate-500 shrink-0">
          <div className="flex items-center gap-6">
            <span>Version 1.2.70</span>
            <span>Copyright © 2026 Demo Group of Industries</span>
          </div>
          <div className="tracking-widest uppercase">
            Developed by <span className="text-blue-500 font-bold">Crafto DIGITAL</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
