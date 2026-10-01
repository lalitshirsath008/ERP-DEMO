import { Search, ChevronRight, Calendar, Download } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function PurchaseOrderHistory() {
  const orders = [
    { poNo: 'PO-2026-0498', date: '27-Sep-2026', type: 'Service', jobNo: 'SFCI', lines: 1, totalQty: '1,000', grpoQty: 50, pendingQty: 950, amount: '₹23,600.00', pendingAmt: '₹22,420.00', status: 'Partially Received' },
    { poNo: 'PO-2026-0494', date: '01-Sep-2026', type: 'Items', jobNo: 'SFCI', lines: 1, totalQty: '2', grpoQty: 0, pendingQty: 2, amount: '—', pendingAmt: '—', status: 'Open' },
    { poNo: 'PO-2026-0492', date: '31-Aug-2026', type: 'Items', jobNo: 'SFCI', lines: 1, totalQty: '5', grpoQty: 0, pendingQty: 5, amount: '—', pendingAmt: '—', status: 'Open' },
    { poNo: 'PO-2026-0491', date: '24-Aug-2026', type: 'Service', jobNo: 'SFCI', lines: 1, totalQty: '50', grpoQty: 0, pendingQty: 50, amount: '₹0.00', pendingAmt: '₹0.00', status: 'Open' },
    { poNo: 'PO-2026-0490', date: '15-Aug-2026', type: 'Items', jobNo: 'SFCI', lines: 1, totalQty: '1,000', grpoQty: 0, pendingQty: '1,000', amount: '—', pendingAmt: '—', status: 'Open' },
  ];

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(orders);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Purchase Orders");
    XLSX.writeFile(workbook, "Purchase_Order_History.xlsx");
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-100">Purchase Order History</h2>
      </header>

      <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-wrap gap-4 items-end">
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">PO Status</label>
          <select className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 w-40 outline-none focus:border-blue-500">
            <option>All</option>
            <option>Open</option>
            <option>Closed</option>
            <option>Partially Received</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Doc Type</label>
          <select className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 w-40 outline-none focus:border-blue-500">
            <option>All</option>
            <option>Items</option>
            <option>Service</option>
          </select>
        </div>
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
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-6 py-2 border border-slate-700 rounded-lg text-sm font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
        >
          <Download size={14} /> Export
        </button>
        <button className="px-8 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20 transition-all">
          Search
        </button>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60">
                <th className="px-6 py-4 w-10"></th>
                {['PO NO.', 'PO DATE', 'TYPE', 'JOB NO', 'LINES', 'TOTAL PO QTY', 'TOTAL GRPO QTY', 'PENDING QTY', 'PO AMOUNT', 'PENDING AMT', 'STATUS'].map((head) => (
                  <th key={head} className="px-6 py-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {orders.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4"><ChevronRight size={14} className="text-slate-600 group-hover:text-blue-400" /></td>
                  <td className="px-6 py-4 text-xs font-bold text-blue-400">{row.poNo}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">{row.date}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">{row.type}</td>
                  <td className="px-6 py-4 text-xs text-slate-400">{row.jobNo}</td>
                  <td className="px-6 py-4 text-xs font-bold text-slate-300">{row.lines}</td>
                  <td className="px-6 py-4 text-xs font-mono font-bold text-slate-300">{row.totalQty}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.grpoQty}</td>
                  <td className="px-6 py-4 text-xs font-mono font-bold text-slate-300">{row.pendingQty}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.amount}</td>
                  <td className="px-6 py-4 text-xs font-mono text-slate-400">{row.pendingAmt}</td>
                  <td className="px-6 py-4">
                    <span className={`px-2 py-0.5 rounded text-[10px] font-bold ${
                      row.status === 'Open' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-600/20' : 
                      row.status === 'Partially Received' ? 'bg-amber-600/10 text-amber-400 border border-amber-600/20' :
                      'bg-slate-600/10 text-slate-400 border border-slate-600/20'
                    }`}>
                      {row.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
