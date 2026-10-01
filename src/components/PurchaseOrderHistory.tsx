import { useState } from 'react';
import { Search, ChevronRight, Calendar, Download, ChevronDown } from 'lucide-react';
import * as XLSX from 'xlsx';
import { motion, AnimatePresence } from 'motion/react';

export default function PurchaseOrderHistory() {
  const [expandedRows, setExpandedRows] = useState<string[]>([]);
  const [statusFilter, setStatusFilter] = useState('All');
  const [docTypeFilter, setDocTypeFilter] = useState('All');
  
  const allOrders = [
    { poNo: 'PO-2026-0498', date: '27-Sep-2026', type: 'Service', jobNo: 'SFCI', lines: 1, totalQty: '1,000', grpoQty: 50, pendingQty: 950, amount: '₹23,600.00', pendingAmt: '₹22,420.00', status: 'Partially Received' },
    { poNo: 'PO-2026-0494', date: '01-Sep-2026', type: 'Items', jobNo: 'SFCI', lines: 1, totalQty: '2', grpoQty: 0, pendingQty: 2, amount: '—', pendingAmt: '—', status: 'Open' },
    { poNo: 'PO-2026-0492', date: '31-Aug-2026', type: 'Items', jobNo: 'SFCI', lines: 1, totalQty: '5', grpoQty: 0, pendingQty: 5, amount: '—', pendingAmt: '—', status: 'Open' },
    { poNo: 'PO-2026-0491', date: '24-Aug-2026', type: 'Service', jobNo: 'SFCI', lines: 1, totalQty: '50', grpoQty: 0, pendingQty: 50, amount: '₹0.00', pendingAmt: '₹0.00', status: 'Open' },
    { poNo: 'PO-2026-0490', date: '15-Aug-2026', type: 'Items', jobNo: 'SFCI', lines: 1, totalQty: '1,000', grpoQty: 0, pendingQty: '1,000', amount: '—', pendingAmt: '—', status: 'Open' },
    { poNo: 'PO-2026-0160', date: '09-Apr-2026', type: 'Items', jobNo: 'KSF1738', lines: 3, totalQty: '12', grpoQty: 12, pendingQty: 0, amount: '—', pendingAmt: '—', status: 'Closed' },
    { poNo: 'PO-2026-0143', date: '07-Apr-2026', type: 'Items', jobNo: 'KSF1478', lines: 1, totalQty: '1', grpoQty: 1, pendingQty: 0, amount: '—', pendingAmt: '—', status: 'Closed' },
  ];

  const [filteredOrders, setFilteredOrders] = useState(allOrders);

  const handleSearch = () => {
    let results = allOrders;
    if (statusFilter !== 'All') {
      results = results.filter(order => order.status === statusFilter);
    }
    if (docTypeFilter !== 'All') {
      results = results.filter(order => order.type === docTypeFilter);
    }
    setFilteredOrders(results);
  };

  const toggleRow = (poNo: string) => {
    setExpandedRows(prev => 
      prev.includes(poNo) ? prev.filter(r => r !== poNo) : [...prev, poNo]
    );
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(filteredOrders);
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
          <select 
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 w-40 outline-none focus:border-blue-500 transition-all"
          >
            <option>All</option>
            <option>Open</option>
            <option>Closed</option>
            <option>Partially Received</option>
          </select>
        </div>
        <div className="space-y-2">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Doc Type</label>
          <select 
            value={docTypeFilter}
            onChange={(e) => setDocTypeFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300 w-40 outline-none focus:border-blue-500 transition-all"
          >
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
          className="flex items-center gap-2 px-6 py-2 border border-slate-700 rounded-lg text-sm font-semibold text-slate-300 hover:bg-slate-800 transition-all active:scale-95"
        >
          <Download size={14} /> Export
        </button>
        <button 
          onClick={handleSearch}
          className="px-8 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20 transition-all active:scale-95"
        >
          Search
        </button>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl shadow-black/50">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60">
                <th className="px-6 py-4 w-10 shrink-0"></th>
                {['PO NO.', 'PO DATE', 'TYPE', 'JOB NO', 'LINES', 'TOTAL QTY', 'GRPO QTY', 'PENDING QTY', 'PO AMOUNT', 'PENDING AMT', 'STATUS'].map((head) => (
                  <th key={head} className="px-4 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/50">
              {filteredOrders.length > 0 ? (
                filteredOrders.map((row, idx) => (
                  <React.Fragment key={row.poNo}>
                    <tr 
                      onClick={() => toggleRow(row.poNo)}
                      className="hover:bg-slate-800/40 transition-colors group cursor-pointer"
                    >
                      <td className="px-6 py-4 shrink-0">
                        {expandedRows.includes(row.poNo) ? (
                          <ChevronDown size={14} className="text-blue-500" />
                        ) : (
                          <ChevronRight size={14} className="text-slate-600 group-hover:text-blue-400" />
                        )}
                      </td>
                      <td className="px-4 py-4 text-[11px] font-bold text-blue-400 whitespace-nowrap">{row.poNo}</td>
                      <td className="px-4 py-4 text-[11px] text-slate-400 whitespace-nowrap">{row.date}</td>
                      <td className="px-4 py-4 text-[11px] text-slate-400 whitespace-nowrap">{row.type}</td>
                      <td className="px-4 py-4 text-[11px] text-slate-400 whitespace-nowrap">{row.jobNo}</td>
                      <td className="px-4 py-4 text-[11px] font-bold text-slate-300 whitespace-nowrap">{row.lines}</td>
                      <td className="px-4 py-4 text-[11px] font-mono font-bold text-slate-300 tabular-nums whitespace-nowrap">{row.totalQty}</td>
                      <td className="px-4 py-4 text-[11px] font-mono text-slate-400 tabular-nums whitespace-nowrap">{row.grpoQty}</td>
                      <td className="px-4 py-4 text-[11px] font-mono font-bold text-slate-300 tabular-nums whitespace-nowrap">{row.pendingQty}</td>
                      <td className="px-4 py-4 text-[11px] font-mono text-slate-400 tabular-nums whitespace-nowrap">{row.amount}</td>
                      <td className="px-4 py-4 text-[11px] font-mono text-slate-400 tabular-nums whitespace-nowrap">{row.pendingAmt}</td>
                      <td className="px-4 py-4 whitespace-nowrap">
                        <span className={`px-2 py-0.5 rounded text-[9px] font-bold tracking-wider uppercase ${
                          row.status === 'Open' ? 'bg-emerald-600/10 text-emerald-400 border border-emerald-600/20' : 
                          row.status === 'Partially Received' ? 'bg-amber-600/10 text-amber-400 border border-amber-600/20' :
                          row.status === 'Closed' ? 'bg-slate-600/10 text-slate-400 border border-slate-600/20' :
                          'bg-slate-600/10 text-slate-400 border border-slate-600/20'
                        }`}>
                          {row.status}
                        </span>
                      </td>
                    </tr>
                    {expandedRows.includes(row.poNo) && (
                      <tr className="bg-slate-950/40 border-l-2 border-l-blue-600">
                        <td colSpan={12} className="px-6 py-0">
                          <div className="py-6 space-y-4">
                            <div className="flex items-center gap-4 text-[10px] font-bold text-slate-500 uppercase tracking-widest">
                              <span>DETAILS — {row.poNo}</span>
                              <span className="text-slate-700">|</span>
                              <span>Vendor: DEMO USER</span>
                              <span className="text-slate-700">|</span>
                              <span>Job No: {row.jobNo}</span>
                            </div>
                            
                            <div className="overflow-hidden border border-slate-800 rounded-xl">
                              <table className="w-full text-left border-collapse">
                                <thead className="bg-slate-900/40">
                                  <tr>
                                  {['ITEM CODE', 'ITEM NAME', 'TOTAL QTY', 'RATE', 'LINE TOTAL', 'PO AMT', 'GRPO QTY', 'GRPO AMT', 'PENDING QTY', 'PENDING AMT', 'STATUS'].map((h) => (
                                    <th key={h} className="px-4 py-3 text-[9px] font-black text-slate-500 uppercase tracking-wider whitespace-nowrap">{h}</th>
                                  ))}
                                  </tr>
                                </thead>
                                <tbody>
                                  <tr className="border-t border-slate-800 hover:bg-slate-900/20 transition-colors">
                                  <td className="px-4 py-3 text-[10px] font-bold text-blue-400 whitespace-nowrap">DEMO{idx}00989</td>
                                  <td className="px-4 py-3 text-[10px] text-slate-300 font-medium whitespace-nowrap">HOUSING MACHINED 180 DEG AM55 P/N-OG-520720-201-C</td>
                                  <td className="px-4 py-3 text-[10px] font-mono font-bold text-slate-300 whitespace-nowrap">{row.totalQty}</td>
                                  <td className="px-4 py-3 text-[10px] font-mono text-slate-400 whitespace-nowrap">₹0.00</td>
                                  <td className="px-4 py-3 text-[10px] font-mono text-slate-400 whitespace-nowrap">₹0.00</td>
                                  <td className="px-4 py-3 text-[10px] font-mono text-slate-400 whitespace-nowrap">₹0.00</td>
                                  <td className="px-4 py-3 text-[10px] font-mono text-slate-400 whitespace-nowrap">{row.grpoQty}</td>
                                  <td className="px-4 py-3 text-[10px] font-mono text-slate-400 whitespace-nowrap">₹0.00</td>
                                  <td className="px-4 py-3 text-[10px] font-mono font-bold text-slate-300 whitespace-nowrap">{row.pendingQty}</td>
                                  <td className="px-4 py-3 text-[10px] font-mono text-slate-400 whitespace-nowrap">₹0.00</td>
                                  <td className="px-4 py-3 text-[10px] whitespace-nowrap">
                                    <span className="text-emerald-400 font-bold uppercase tracking-widest text-[9px]">{row.status === 'Partially Received' ? 'Open' : row.status}</span>
                                  </td>
                                  </tr>
                                </tbody>
                              </table>
                            </div>
                            <p className="text-[9px] font-bold text-slate-600 uppercase tracking-widest">AP attachments on this purchase order.</p>
                          </div>
                        </td>
                      </tr>
                    )}
                  </React.Fragment>
                ))
              ) : (
                <tr>
                  <td colSpan={12} className="px-6 py-20 text-center text-slate-500 font-bold uppercase tracking-widest">
                    No records found for the selected status.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
// React import for Fragment
import React from 'react';
