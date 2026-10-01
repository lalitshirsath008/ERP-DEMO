import { Search, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function InventoryAvailable() {
  const inventory = [
    { sapCode: 'AST000335EQ', itemName: 'MATCH PLATE OF SIZE 27" X 51"', partNo: 'A/450', uom: 'NOS', closingStock: '14.00' },
    { sapCode: 'AST000831TL', itemName: 'TOOL HOLDER MVJNL 2525 M16', partNo: '33428', uom: 'NOS', closingStock: '1.00' },
    { sapCode: 'AST001052EQ', itemName: 'THREAD GAUGE SIZE3/8-16 UNC-2B MAKE BAKER', partNo: '—', uom: 'NOS', closingStock: '1.00' },
    { sapCode: 'AST004056EQ', itemName: 'SNAP GAUGE SIZE:- 13.8 MM FOR SADDLE P/N-43005', partNo: '43005', uom: 'NOS', closingStock: '1.00' },
    { sapCode: 'AST004370EQ', itemName: 'RECEIVING GAUGE FOR PARTNO. 414283', partNo: '414283', uom: 'NOS', closingStock: '1.00' },
    { sapCode: 'AST005799EQ', itemName: 'RECEIVING GAUGE FOR P/N-439092 DOUBLE UPPER DAMPER MOUNT', partNo: '439092', uom: 'NOS', closingStock: '1.00' },
    { sapCode: 'AST005852EQ', itemName: 'THREAD PLUG GAUGE 0.562-12 UNC-2B FOR WAL04-03581', partNo: 'WAL04-03581', uom: 'NOS', closingStock: '1.00' },
    { sapCode: 'RGK000003CA', itemName: 'SP0301-ADJUSTING WHEEL', partNo: 'SP0301', uom: 'NOS', closingStock: '394.00' },
    { sapCode: 'RGK000004CA', itemName: 'SP0234 - ADJUSTING WHEEL', partNo: 'SP0234', uom: 'NOS', closingStock: '52.00' },
    { sapCode: 'RGK000006CA', itemName: 'SP0233 - TIGHT SPRING BUSHING 12" PIPE', partNo: 'SP0233', uom: 'NOS', closingStock: '41.00' },
  ];

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(inventory);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
    XLSX.writeFile(workbook, "Inventory_Available.xlsx");
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-100">Inventory available</h2>
        <p className="text-slate-500 text-sm">View your closing stock summary</p>
      </header>

      <div className="bg-slate-900/40 border border-slate-800 p-6 rounded-2xl flex flex-wrap gap-4 items-end">
        <div className="space-y-2 flex-1 min-w-[200px]">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">Item Code</label>
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300">
            <Search size={14} className="text-slate-500" />
            <input type="text" placeholder="Search by SAP Code..." className="bg-transparent border-none outline-none w-full" />
          </div>
        </div>
        <div className="space-y-2 flex-1 min-w-[200px]">
          <label className="text-[10px] font-bold text-slate-500 uppercase tracking-widest">RGK Part No.</label>
          <div className="flex items-center gap-2 bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-300">
            <Search size={14} className="text-slate-500" />
            <input type="text" placeholder="Search by RGK Part No..." className="bg-transparent border-none outline-none w-full" />
          </div>
        </div>
        <button className="px-8 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2">
          <Search size={16} /> Search
        </button>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 border border-slate-700 rounded-lg text-sm font-semibold text-slate-300 hover:bg-slate-800 transition-colors"
        >
          <FileSpreadsheet size={16} /> Excel
        </button>
      </div>

      <div className="bg-slate-900/40 border border-slate-800 rounded-2xl overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-800 bg-slate-900/60">
                {['SAP CODE', 'ITEM NAME', 'RGK PART NO', 'UOM', 'CLOSING STOCK'].map((head) => (
                  <th key={head} className="px-6 py-4 text-[10px] font-black text-slate-500 uppercase tracking-widest whitespace-nowrap">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800">
              {inventory.map((row, idx) => (
                <tr key={idx} className="hover:bg-slate-800/30 transition-colors group">
                  <td className="px-6 py-4 text-[11px] font-bold text-blue-400 whitespace-nowrap">{row.sapCode}</td>
                  <td className="px-6 py-4 text-[11px] font-medium text-slate-300 whitespace-nowrap">{row.itemName}</td>
                  <td className="px-6 py-4 text-[11px] text-slate-400 whitespace-nowrap">{row.partNo}</td>
                  <td className="px-6 py-4 text-[11px] text-slate-400 whitespace-nowrap">{row.uom}</td>
                  <td className="px-6 py-4 text-[11px] font-mono font-bold text-blue-400 text-right tabular-nums whitespace-nowrap">{row.closingStock}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
