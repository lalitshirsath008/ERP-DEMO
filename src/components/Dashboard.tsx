import { RefreshCcw, User, ExternalLink, FileText, ShoppingCart, Package, ArrowRight } from 'lucide-react';
import { motion } from 'motion/react';

export default function Dashboard({ setActiveTab }: { setActiveTab: (tab: string) => void }) {
  const stats = [
    { label: 'CLOSING BALANCE (FY)', value: '-₹34,52,270', color: 'text-blue-600 dark:text-blue-400' },
    { label: 'OPENING BALANCE (FY)', value: '-₹26,07,017', color: 'text-slate-600 dark:text-slate-300' },
    { label: 'INVOICES (FY)', value: '₹8,45,253', color: 'text-blue-700 dark:text-blue-500' },
    { label: 'PAYMENTS (FY)', value: '₹0', color: 'text-blue-600 dark:text-blue-400' },
    { label: 'TDS (FY)', value: '₹7,061', color: 'text-rose-600 dark:text-rose-400' },
    { label: 'OPEN PURCHASE ORDERS', value: '13', color: 'text-blue-600 dark:text-blue-400' },
    { label: 'CLOSED PURCHASE ORDERS', value: '3', color: 'text-slate-600 dark:text-slate-400' },
    { label: 'PENDING PO QTY', value: '32,702', color: 'text-blue-700 dark:text-blue-500' },
    { label: 'SKUS WITH STOCK', value: '42', color: 'text-blue-600 dark:text-blue-400' },
    { label: 'STOCK QTY TOTAL', value: '8,414', color: 'text-blue-600 dark:text-blue-400' },
  ];

  const modules = [
    { id: 'ledger', title: 'Vendor Ledger', desc: 'Opening, invoices, payments, TDS, and closing balance for the financial year.', value: '-₹34,52,270', color: 'bg-blue-500' },
    { id: 'orders', title: 'Purchase Order', desc: 'Open and closed purchase orders with line details and attachments.', value: '13', color: 'bg-blue-600' },
    { id: 'inventory', title: 'Inventory', desc: 'Stock summary of items available against your vendor code.', value: '42', color: 'bg-blue-500' },
  ];

  return (
    <div className="space-y-10 max-w-7xl mx-auto">
      <header className="flex items-center justify-between">
        <div className="space-y-1">
          <div className="flex items-center gap-3">
            <span className="text-[10px] font-bold text-slate-500 uppercase tracking-[0.2em]">Vendor Home</span>
            <span className="px-2 py-0.5 rounded-full bg-blue-500/10 text-blue-400 text-[10px] font-bold border border-blue-500/20 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-blue-500 animate-pulse" /> LIVE
            </span>
          </div>
          <h2 className="text-4xl font-bold text-slate-900 dark:text-white tracking-tight leading-tight">Welcome back, <span className="text-blue-500">Demo User</span></h2>
          <p className="text-slate-500 dark:text-slate-400 text-sm font-medium">Live totals for the current Indian financial year from ledger, purchase orders, and stock.</p>
        </div>
        <div className="flex gap-3">
          <button className="flex items-center gap-2.5 px-5 py-2.5 bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-xl text-xs font-bold text-slate-600 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 hover:border-slate-300 dark:hover:border-slate-700 transition-all active:scale-95 shadow-sm">
            <RefreshCcw size={16} /> Refresh
          </button>
          <button className="flex items-center gap-2.5 px-5 py-2.5 bg-blue-600 border border-blue-500 text-xs font-bold text-white rounded-xl shadow-lg shadow-blue-900/20 hover:bg-blue-500 transition-all active:scale-95">
            <User size={16} /> Profile <ExternalLink size={14} />
          </button>
        </div>
      </header>

      <section className="space-y-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-1 rounded-full bg-blue-600" />
          <h3 className="text-[10px] font-bold text-slate-400 dark:text-slate-400 uppercase tracking-[0.2em]">Financial Overview</h3>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-5">
          {stats.map((stat, idx) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: idx * 0.05 }}
              className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 p-6 rounded-2xl hover:border-blue-500/30 transition-all group cursor-default shadow-sm dark:shadow-none"
            >
              <p className="text-[9px] font-bold text-slate-400 dark:text-slate-500 uppercase tracking-[0.15em] mb-3 group-hover:text-slate-600 dark:group-hover:text-slate-400 transition-colors">{stat.label}</p>
              <p className={`text-2xl tabular-nums font-bold ${stat.color} tracking-tight`}>{stat.value}</p>
            </motion.div>
          ))}
        </div>
      </section>

      <section className="space-y-8">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
          <h3 className="text-xl font-bold text-slate-900 dark:text-white tracking-tight">Business Operations</h3>
          <span className="px-2 py-0.5 rounded-md bg-slate-100 dark:bg-slate-800 text-slate-500 text-[10px] font-bold tracking-widest uppercase border border-slate-200 dark:border-transparent">3 Modules Available</span>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {modules.map((mod) => (
            <button
              key={mod.id}
              onClick={() => setActiveTab(mod.id)}
              className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800/60 p-8 rounded-[2rem] hover:border-blue-600/40 hover:bg-slate-50 dark:hover:bg-slate-900/60 text-left transition-all duration-500 group relative overflow-hidden active:scale-[0.98] shadow-sm hover:shadow-xl dark:shadow-none"
            >
              <div className="flex justify-between items-start mb-10">
                <div className={`w-14 h-14 rounded-2xl ${mod.color} flex items-center justify-center shadow-xl shadow-blue-900/20 group-hover:scale-110 transition-all duration-500`}>
                  <div className="text-white">
                    {mod.id === 'ledger' && <FileText size={28} strokeWidth={2} />}
                    {mod.id === 'orders' && <ShoppingCart size={28} strokeWidth={2} />}
                    {mod.id === 'inventory' && <Package size={28} strokeWidth={2} />}
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] tabular-nums font-bold px-3 py-1.5 rounded-lg border ${mod.id === 'ledger' ? 'text-blue-400 bg-blue-500/5 border-blue-500/20' : 'text-slate-500 dark:text-slate-400 bg-slate-50 dark:bg-slate-950 border-slate-200 dark:border-slate-800'}`}>
                    {mod.value}
                  </span>
                  <div className="w-8 h-8 rounded-full bg-slate-100 dark:bg-slate-800 flex items-center justify-center group-hover:bg-blue-600 transition-all duration-500">
                    <ExternalLink size={14} className="text-slate-400 dark:text-slate-500 group-hover:text-white transition-colors" />
                  </div>
                </div>
              </div>
              <h4 className="text-2xl font-bold text-slate-900 dark:text-white mb-3 group-hover:text-blue-600 dark:group-hover:text-blue-500 transition-colors">{mod.title}</h4>
              <p className="text-slate-600 dark:text-slate-500 text-sm leading-relaxed mb-8 font-medium">{mod.desc}</p>
              <div className="flex items-center gap-2 text-xs font-bold text-blue-500 uppercase tracking-widest">
                Explore Module <ArrowRight size={14} className="group-hover:translate-x-1.5 transition-transform" />
              </div>
              <div className="absolute -bottom-12 -right-12 w-48 h-48 bg-blue-600/5 rounded-full blur-3xl group-hover:bg-blue-600/10 transition-all duration-700" />
            </button>
          ))}
        </div>
      </section>
    </div>
  );
}
