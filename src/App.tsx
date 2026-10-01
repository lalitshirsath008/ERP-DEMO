import { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import VendorLedger from './components/VendorLedger';
import PurchaseOrderHistory from './components/PurchaseOrderHistory';
import InventoryAvailable from './components/InventoryAvailable';
import LoginPage from './components/LoginPage';
import { Maximize2, Moon, User, Menu, Sun, LogOut, Settings, Bell, ChevronDown, Minimize2 } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [activeTab, setActiveTab] = useState('dashboard');
  const [isSidebarCollapsed, setIsSidebarCollapsed] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(true);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const [showProfile, setShowProfile] = useState(false);

  // Check if already logged in
  useEffect(() => {
    const savedAuth = localStorage.getItem('erp_auth');
    if (savedAuth === 'true') {
      setIsLoggedIn(true);
    }
  }, []);

  // Sync theme with body class
  useEffect(() => {
    if (isDarkMode) {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [isDarkMode]);

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
    setShowProfile(false);
  };

  const toggleFullscreen = () => {
    if (!document.fullscreenElement) {
      document.documentElement.requestFullscreen();
      setIsFullscreen(true);
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
        setIsFullscreen(false);
      }
    }
  };

  if (!isLoggedIn) {
    return <LoginPage onLogin={handleLogin} />;
  }

  return (
    <div className={`flex h-screen transition-all duration-500 ${isDarkMode ? 'dark bg-slate-950 text-slate-200' : 'bg-slate-50 text-slate-900'} font-sans selection:bg-blue-500/30`}>
      <Sidebar 
        activeTab={activeTab} 
        isCollapsed={isSidebarCollapsed}
        isDarkMode={isDarkMode}
        setActiveTab={(tab) => {
          if (tab === 'logout') handleLogout();
          else setActiveTab(tab);
        }} 
      />
      
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        <header className={`h-16 border-b ${isDarkMode ? 'border-slate-800 bg-slate-950/50' : 'border-slate-200 bg-white/80'} backdrop-blur-md flex items-center justify-between px-8 shrink-0 sticky top-0 z-30 transition-all duration-300`}>
          <div className="flex items-center gap-6">
            <button 
              onClick={() => setIsSidebarCollapsed(!isSidebarCollapsed)}
              className={`w-10 h-10 rounded-xl border flex items-center justify-center transition-all active:scale-95 ${
                isDarkMode 
                ? 'bg-slate-900 border-slate-800 text-slate-400 hover:text-white hover:border-slate-700 shadow-lg shadow-black/20' 
                : 'bg-white border-slate-200 text-slate-500 hover:text-slate-900 hover:border-slate-300 shadow-sm'
              }`}
            >
              <Menu size={20} />
            </button>
            <div className="flex items-center gap-3 text-[10px] font-bold text-slate-600 dark:text-slate-500 uppercase tracking-[0.2em]">
              <span>Vendor Portal</span>
              <span className={isDarkMode ? 'text-slate-800' : 'text-slate-200'}>/</span>
              <span className="text-blue-600 dark:text-blue-500 font-black">
                {activeTab === 'dashboard' && 'Dashboard'}
                {activeTab === 'ledger' && 'Vendor Ledger'}
                {activeTab === 'orders' && 'Purchase Order History'}
                {activeTab === 'inventory' && 'Inventory available'}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <div className={`flex items-center gap-1 border-r pr-4 mr-2 ${isDarkMode ? 'border-slate-800/50' : 'border-slate-200'}`}>
              <button 
                onClick={toggleFullscreen}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-500/10 transition-colors"
                title="Toggle Fullscreen"
              >
                {isFullscreen ? <Minimize2 size={18} /> : <Maximize2 size={18} />}
              </button>
              <button 
                onClick={() => setIsDarkMode(!isDarkMode)}
                className="w-9 h-9 rounded-lg flex items-center justify-center text-slate-500 hover:bg-slate-500/10 transition-colors"
                title="Toggle Theme"
              >
                {isDarkMode ? <Sun size={18} /> : <Moon size={18} />}
              </button>
            </div>

            <div className="relative">
              <button 
                onClick={() => setShowProfile(!showProfile)}
                className="flex items-center gap-3 p-1 rounded-full hover:bg-slate-500/10 transition-all active:scale-95"
              >
                <div className="w-9 h-9 rounded-full bg-gradient-to-br from-blue-500 to-blue-700 flex items-center justify-center text-sm font-black text-white shadow-lg shadow-blue-500/40 ring-2 ring-blue-500/20">
                  D
                </div>
                <div className="hidden md:block text-left mr-1">
                  <p className={`text-[11px] font-black uppercase tracking-wider leading-none ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Demo User</p>
                  <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight mt-0.5">S0826 — Admin</p>
                </div>
                <ChevronDown size={14} className={`text-slate-500 transition-transform duration-300 ${showProfile ? 'rotate-180' : ''}`} />
              </button>

              <AnimatePresence>
                {showProfile && (
                  <>
                    <div 
                      className="fixed inset-0 z-40" 
                      onClick={() => setShowProfile(false)} 
                    />
                    <motion.div
                      initial={{ opacity: 0, y: 10, scale: 0.95 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: 10, scale: 0.95 }}
                      className={`absolute right-0 mt-3 w-64 rounded-2xl border shadow-2xl z-50 overflow-hidden ${
                        isDarkMode 
                        ? 'bg-slate-900 border-slate-800 shadow-black' 
                        : 'bg-white border-slate-200 shadow-slate-200'
                      }`}
                    >
                      <div className={`p-5 border-b ${isDarkMode ? 'border-slate-800 bg-slate-800/30' : 'border-slate-100 bg-slate-50/50'}`}>
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 rounded-2xl bg-blue-600 flex items-center justify-center text-xl font-black text-white shadow-xl shadow-blue-900/40 transform rotate-3">D</div>
                          <div>
                            <h3 className={`text-sm font-black ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>DEMO USER</h3>
                            <p className="text-[10px] font-bold text-blue-500 uppercase tracking-widest">Administrator</p>
                          </div>
                        </div>
                      </div>
                      <div className="p-2">
                        <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
                          <User size={16} /> View Profile
                        </button>
                        <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
                          <Settings size={16} /> Account Settings
                        </button>
                        <button className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-bold transition-colors ${isDarkMode ? 'text-slate-400 hover:text-white hover:bg-slate-800' : 'text-slate-500 hover:text-slate-900 hover:bg-slate-100'}`}>
                          <Bell size={16} /> Notifications
                        </button>
                        <div className={`h-px my-2 mx-2 ${isDarkMode ? 'bg-slate-800' : 'bg-slate-100'}`} />
                        <button 
                          onClick={handleLogout}
                          className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-xs font-black text-rose-500 hover:bg-rose-500/10 transition-colors uppercase tracking-widest"
                        >
                          <LogOut size={16} /> Logout Account
                        </button>
                      </div>
                    </motion.div>
                  </>
                )}
              </AnimatePresence>
            </div>
          </div>
        </header>

        <main className="flex-1 overflow-y-auto p-8 scroll-smooth">
          {activeTab === 'dashboard' && <Dashboard setActiveTab={setActiveTab} />}
          {activeTab === 'ledger' && <VendorLedger />}
          {activeTab === 'orders' && <PurchaseOrderHistory />}
          {activeTab === 'inventory' && <InventoryAvailable />}
        </main>

        <footer className={`h-12 border-t ${isDarkMode ? 'border-slate-800 bg-slate-950' : 'border-slate-200 bg-white'} flex items-center justify-between px-8 text-[10px] font-semibold transition-colors duration-300`}>
          <div className="flex items-center gap-6 text-slate-500">
            <span>Version 1.2.70</span>
            <span>Copyright © 2026 Demo Group of Industries</span>
          </div>
          <div className="tracking-widest uppercase text-right text-slate-400 dark:text-slate-500">
            Developed by <span className="text-blue-500 font-bold">Crafto DIGITAL</span>
          </div>
        </footer>
      </div>
    </div>
  );
}
