import { LayoutDashboard, FileText, ShoppingCart, Package, LogOut, LayoutGrid } from 'lucide-react';

interface SidebarProps {
  activeTab: string;
  setActiveTab: (tab: string) => void;
}

export default function Sidebar({ activeTab, setActiveTab }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'ledger', label: 'Vendor Ledger', icon: FileText },
    { id: 'orders', label: 'Purchase Order History', icon: ShoppingCart },
    { id: 'inventory', label: 'Inventory available', icon: Package },
  ];

  return (
    <aside className="w-72 flex flex-col border-r border-slate-800/60 bg-slate-950 z-20">
      <div className="p-8 flex flex-col h-full">
        <div className="flex items-center gap-4 mb-12">
          <div className="w-12 h-12 rounded-2xl bg-gradient-to-br from-blue-600 to-blue-700 flex items-center justify-center font-black text-xl text-white shadow-xl shadow-blue-900/40 transform rotate-3">
            D
          </div>
          <div>
            <h1 className="text-base font-black text-white uppercase tracking-tighter">Demo Group</h1>
            <p className="text-[10px] text-blue-500 font-bold uppercase tracking-widest leading-none">ERP Solution</p>
          </div>
        </div>

        <div className="mb-8">
          <div className="flex items-center gap-2 mb-4 px-2">
            <LayoutGrid size={12} className="text-slate-600" />
            <p className="text-[10px] font-black text-slate-500 uppercase tracking-[0.2em]">Workspace</p>
          </div>
          <div className="bg-blue-600/5 border border-blue-600/20 rounded-xl px-5 py-3 text-xs font-bold text-blue-400 shadow-inner">
            Vendor Portal
          </div>
        </div>

        <nav className="space-y-2 flex-1">
          {menuItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveTab(item.id)}
              className={`w-full flex items-center gap-4 px-5 py-4 rounded-xl text-sm font-bold transition-all duration-300 relative group ${
                activeTab === item.id
                  ? 'bg-blue-600 text-white shadow-lg shadow-blue-900/20'
                  : 'text-slate-500 hover:text-slate-200 hover:bg-slate-900/50'
              }`}
            >
              <item.icon size={20} strokeWidth={activeTab === item.id ? 2.5 : 2} />
              {item.label}
              {activeTab === item.id && (
                <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-white animate-pulse" />
              )}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-8 border-t border-slate-900">
          <button 
            onClick={() => setActiveTab('logout')}
            className="w-full flex items-center gap-4 px-5 py-4 text-rose-500 text-sm font-black uppercase tracking-widest hover:text-rose-400 hover:bg-rose-500/5 rounded-xl transition-all active:scale-95 group"
          >
            <LogOut size={20} className="group-hover:-translate-x-0.5 transition-transform" />
            Logout
          </button>
        </div>
      </div>
    </aside>
  );
}
