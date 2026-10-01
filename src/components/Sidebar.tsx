import { LayoutDashboard, FileText, ShoppingCart, Package, LogOut, LayoutGrid } from 'lucide-react';
import { motion } from 'motion/react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
  isCollapsed: boolean;
  isDarkMode: boolean;
}

export default function Sidebar({ activeTab, setActiveTab, isCollapsed, isDarkMode }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ledger', label: 'Vendor Ledger', icon: FileText },
    { id: 'orders', label: 'Purchase Order History', icon: ShoppingCart },
    { id: 'inventory', label: 'Inventory available', icon: Package },
  ];

  return (
    <aside className={`flex flex-col border-r z-20 transition-all duration-300 ${isCollapsed ? 'w-24' : 'w-72'} ${
      isDarkMode 
      ? 'border-slate-800 bg-slate-950' 
      : 'border-slate-200 bg-white'
    }`}>
      <div className={`p-6 flex flex-col h-full ${isCollapsed ? 'items-center' : ''}`}>
        <div className={`flex items-center gap-4 mb-12 ${isCollapsed ? 'justify-center' : ''}`}>
          <div className="w-12 h-12 shrink-0 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center font-black text-xl text-white shadow-xl shadow-blue-900/40 transform rotate-3">
            D
          </div>
          {!isCollapsed && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
              <h1 className={`text-base font-black uppercase tracking-tighter whitespace-nowrap ${isDarkMode ? 'text-white' : 'text-slate-900'}`}>Demo Group</h1>
              <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest leading-none">ERP Solution</p>
            </motion.div>
          )}
        </div>

        <div className="mb-8 w-full">
          {!isCollapsed && (
            <div className="flex items-center gap-2 mb-4 px-2">
              <LayoutGrid size={12} className="text-slate-600" />
              <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em] whitespace-nowrap">Workspace</p>
            </div>
          )}
          <div className={`bg-blue-600/5 border border-blue-600/20 rounded-xl py-3 text-xs font-bold text-blue-400 shadow-inner flex items-center justify-center ${isCollapsed ? 'px-0' : 'px-5'}`}>
            {isCollapsed ? <LayoutGrid size={16} /> : <span className="whitespace-nowrap">Vendor Portal</span>}
          </div>
        </div>

        <nav className="space-y-2 flex-1 w-full">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              title={isCollapsed ? item.label : ''}
              className={`w-full flex items-center rounded-xl text-sm font-bold transition-all duration-300 relative group ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                  : isDarkMode 
                    ? 'text-slate-500 hover:text-slate-200 hover:bg-slate-900/50'
                    : 'text-slate-400 hover:text-slate-900 hover:bg-slate-100'
              } ${isCollapsed ? 'justify-center p-4' : 'px-5 py-4 gap-4'}`}
            >
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} className="shrink-0" />
              {!isCollapsed && (
                <span className="whitespace-nowrap truncate">{item.label}</span>
              )}
              {activeTab === item.id && !isCollapsed && (
                <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        <div className={`mt-auto pt-8 border-t w-full ${isDarkMode ? 'border-slate-900' : 'border-slate-100'}`}>
          <button 
            onClick={() => setActiveTab('logout')}
            title={isCollapsed ? 'Logout' : ''}
            className={`w-full flex items-center text-rose-500 text-sm font-black uppercase tracking-widest hover:text-rose-400 hover:bg-rose-500/5 rounded-xl transition-all active:scale-95 group ${isCollapsed ? 'justify-center p-4' : 'px-5 py-4 gap-4'}`}
          >
            <LogOut size={20} className="shrink-0 group-hover:-translate-x-0.5 transition-transform" />
            {!isCollapsed && <span className="whitespace-nowrap">Logout</span>}
          </button>
        </div>
      </div>
    </aside>
  );
}
