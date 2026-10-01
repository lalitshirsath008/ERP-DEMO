import { Search, Download, Calendar, Scale, FileText, CreditCard, Wallet, Banknote } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function VendorLedger() {
  const ledgerEntries = [
    { date: '02-Apr-2026', type: 'Invoice', docNo: '15', particulars: 'Based On Purchase Orders 2558, 4290, 5203. Based On Goods Receipt PO 1. | TDS COI2 ₹353', offset: 'Machining Expense', debit: '-', credit: '₹41,272.00', tds: '₹353.00', balance: '-₹26,48,288.60' },
    { date: '02-Apr-2026', type: 'TDS', docNo: '15', particulars: 'COI2', offset: 'Withholding Tax', debit: '-', credit: '-', tds: '₹353.00', balance: '-₹26,48,288.60' },
    { date: '02-Apr-2026', type: 'Invoice', docNo: '16', particulars: 'Based On Purchase Orders 4290. Based On Goods Receipt PO 4. | TDS COI2 ₹434', offset: 'Machining Expense', debit: '-', credit: '₹50,778.00', tds: '₹434.00', balance: '-₹26,99,066.60' },
    { date: '02-Apr-2026', type: 'TDS', docNo: '16', particulars: 'COI2', offset: 'Withholding Tax', debit: '-', credit: '-', tds: '₹434.00', balance: '-₹26,99,066.60' },
    { date: '02-Apr-2026', type: 'Invoice', docNo: '406', particulars: 'Based On Purchase Orders 4679. Based On Goods Receipt PO 13. | TDS COI2 ₹170', offset: 'Machining Expense', debit: '-', credit: '₹19,890.00', tds: '₹170.00', balance: '-₹27,18,956.60' },
    { date: '02-Apr-2026', type: 'TDS', docNo: '406', particulars: 'COI2', offset: 'Withholding Tax', debit: '-', credit: '-', tds: '₹170.00', balance: '-₹27,18,956.60' },
  ];

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(ledgerEntries);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Vendor Ledger");
    XLSX.writeFile(workbook, "Vendor_Ledger.xlsx");
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-100">Vendor Ledger</h2>
        <p className="text-slate-500 text-sm">S0826 — DEMO USER — Period: 01-Apr-2026 to 01-Oct-2026</p>
      </header>

      <div className="flex flex-wrap gap-4 items-end bg-slate-900/40 border border-slate-800 p-6 rounded-2xl">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">From Date</label>
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300">
            <Calendar size={14} className="text-slate-500" />
            <span>01-04-2026</span>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">To Date</label>
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300">
            <Calendar size={14} className="text-slate-500" />
            <span>01-10-2026</span>
          </div>
        </div>
        <button className="px-6 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20 transition-all">
          Fetch
        </button>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 border border-slate-700 rounded-lg text-sm font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
        >
          <Download size={14} /> Export
        </button>

        <div className="flex-1 flex gap-4 overflow-x-auto pb-1 scrollbar-hide">
          {[
            { label: 'OPENING BALANCE', value: '-₹26,07,016.60', icon: Scale, color: 'text-blue-400' },
            { label: 'INVOICES', value: '₹8,45,253.00', icon: FileText, color: 'text-sky-400' },
            { label: 'PAYMENTS MADE', value: '₹0.00', icon: CreditCard, color: 'text-emerald-400' },
            { label: 'TDS DEDUCTED', value: '₹7,061.00', icon: Wallet, color: 'text-amber-400' },
            { label: 'CLOSING BALANCE', value: '-₹34,52,269.60', icon: Banknote, color: 'text-purple-400' },
          ].map((item) => (
            <div key={item.label} className="min-w-[180px] bg-slate-950 border border-slate-800 rounded-xl p-3 flex items-center gap-3">
              <div className={`p-2 rounded-lg bg-slate-900 ${item.color}`}>
                <item.icon size={16} />
              </div>
              <div>
                <p className="text-[9px] font-bold text-slate-500 uppercase tracking-tight">{item.label}</p>
                <p className={`text-xs font-mono font-bold ${item.color}`}>{item.value}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60">
                {['DATE', 'TYPE', 'DOC NO', 'PARTICULARS', 'OFFSET A/C', 'DEBIT (₹)', 'CREDIT (₹)', 'TDS (₹)', 'BALANCE (₹)'].map((head) => (
                  <th key={head} className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              <tr className="bg-slate-900/20">
                <td className="px-6 py-4 text-xs font-bold text-slate-300 whitespace-nowrap">—</td>
                <td className="px-6 py-4 whitespace-nowrap"><span className="px-2 py-1 rounded bg-slate-800 text-slate-400 text-[10px] font-bold uppercase">Opening Balance</span></td>
                <td className="px-6 py-4 text-xs font-bold text-slate-300 whitespace-nowrap">—</td>
                <td className="px-6 py-4 text-xs font-bold text-slate-300 whitespace-nowrap">—</td>
                <td className="px-6 py-4 text-xs font-bold text-slate-300 whitespace-nowrap">—</td>
                <td className="px-6 py-4 text-xs font-bold text-slate-300 whitespace-nowrap">—</td>
                <td className="px-6 py-4 text-xs font-bold text-slate-300 whitespace-nowrap">—</td>
                <td className="px-6 py-4 text-xs font-bold text-slate-300 whitespace-nowrap">—</td>
                <td className="px-6 py-4 text-xs font-mono font-bold text-slate-300 tabular-nums whitespace-nowrap">-₹26,07,016.60</td>
              </tr>
              {ledgerEntries.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4 text-[11px] text-slate-400 whitespace-nowrap">{row.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`px-2 py-0.5 rounded text-[9px] font-bold uppercase tracking-wider ${
                      row.type === 'Invoice' ? 'bg-blue-600/10 text-blue-400 border border-blue-600/20' : 'bg-amber-600/10 text-amber-400 border border-amber-600/20'
                    }`}>
                      {row.type}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-[11px] text-slate-400 whitespace-nowrap">{row.docNo}</td>
                  <td className="px-6 py-4 text-[10px] leading-relaxed text-slate-500 max-w-xs truncate whitespace-nowrap group-hover:max-w-none group-hover:whitespace-normal transition-all">{row.particulars}</td>
                  <td className="px-6 py-4 text-[10px] text-slate-500 whitespace-nowrap">{row.offset}</td>
                  <td className="px-6 py-4 text-[11px] font-mono text-slate-400 tabular-nums whitespace-nowrap">{row.debit}</td>
                  <td className="px-6 py-4 text-[11px] font-mono text-slate-400 tabular-nums whitespace-nowrap">{row.credit}</td>
                  <td className="px-6 py-4 text-[11px] font-mono text-amber-500/80 font-bold tabular-nums whitespace-nowrap">{row.tds}</td>
                  <td className="px-6 py-4 text-[11px] font-mono font-bold text-slate-300 tabular-nums whitespace-nowrap">{row.balance}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
