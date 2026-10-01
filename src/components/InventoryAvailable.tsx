import { useState } from 'react';
import { Search, FileSpreadsheet } from 'lucide-react';
import * as XLSX from 'xlsx';

export default function InventoryAvailable() {
  const [itemCodeSearch, setItemCodeSearch] = useState('');
  const [partNoSearch, setPartNoSearch] = useState('');

  const initialInventory = [
    { sapCode: 'DEMO000335EQ', itemName: 'DEMO ITEM - COMPONENT SIZE 27" X 51"', partNo: 'A/450', uom: 'NOS', closingStock: '14.00' },
    { sapCode: 'DEMO000831TL', itemName: 'DEMO TOOL - HOLDER MVJNL 2525 M16', partNo: '33428', uom: 'NOS', closingStock: '1.00' },
    { sapCode: 'DEMO001052EQ', itemName: 'DEMO THREAD GAUGE SIZE3/8-16 UNC-2B', partNo: '—', uom: 'NOS', closingStock: '1.00' },
    { sapCode: 'DEMO004056EQ', itemName: 'DEMO SNAP GAUGE SIZE:- 13.8 MM', partNo: '43005', uom: 'NOS', closingStock: '1.00' },
    { sapCode: 'DEMO004370EQ', itemName: 'DEMO RECEIVING GAUGE FOR PARTNO. 414283', partNo: '414283', uom: 'NOS', closingStock: '1.00' },
    { sapCode: 'DEMO005799EQ', itemName: 'DEMO RECEIVING GAUGE - DOUBLE UPPER MOUNT', partNo: '439092', uom: 'NOS', closingStock: '1.00' },
    { sapCode: 'DEMO005852EQ', itemName: 'DEMO THREAD PLUG GAUGE 0.562-12 UNC-2B', partNo: 'WAL04-03581', uom: 'NOS', closingStock: '1.00' },
    { sapCode: 'DEMO000003CA', itemName: 'DEMO ADJUSTING WHEEL - SERIES 301', partNo: 'SP0301', uom: 'NOS', closingStock: '394.00' },
    { sapCode: 'DEMO000004CA', itemName: 'DEMO ADJUSTING WHEEL - SERIES 234', partNo: 'SP0234', uom: 'NOS', closingStock: '52.00' },
    { sapCode: 'DEMO000006CA', itemName: 'DEMO SPRING BUSHING 12" PIPE', partNo: 'SP0233', uom: 'NOS', closingStock: '41.00' },
  ];

  const [inventory, setInventory] = useState(initialInventory);

  const handleSearch = () => {
    const filtered = initialInventory.filter(item => 
      item.sapCode.toLowerCase().includes(itemCodeSearch.toLowerCase()) &&
      item.partNo.toLowerCase().includes(partNoSearch.toLowerCase())
    );
    setInventory(filtered);
  };

  const handleExport = () => {
    const worksheet = XLSX.utils.json_to_sheet(inventory);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Inventory");
    XLSX.writeFile(workbook, "Inventory_Available.xlsx");
  };

  return (
    <div className="space-y-6">
      <header>
        <h2 className="text-2xl font-bold text-slate-900 dark:text-slate-100">Inventory available</h2>
        <p className="text-slate-500 text-sm">View your closing stock summary</p>
      </header>

      <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 p-6 rounded-2xl flex flex-wrap gap-4 items-end shadow-sm dark:shadow-none">
        <div className="space-y-2 flex-1 min-w-[200px]">
          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">Item Code</label>
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus-within:border-blue-500 transition-all">
            <Search size={14} className="text-slate-400 dark:text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by SAP Code..." 
              value={itemCodeSearch}
              onChange={(e) => setItemCodeSearch(e.target.value)}
              className="bg-transparent border-none outline-none w-full placeholder:text-slate-400" 
            />
          </div>
        </div>
        <div className="space-y-2 flex-1 min-w-[200px]">
          <label className="text-[10px] font-bold text-slate-500 dark:text-slate-500 uppercase tracking-widest">DEMO PART NO.</label>
          <div className="flex items-center gap-2 bg-slate-50 dark:bg-slate-950 border border-slate-200 dark:border-slate-800 rounded-lg px-3 py-2 text-sm text-slate-700 dark:text-slate-300 focus-within:border-blue-500 transition-all">
            <Search size={14} className="text-slate-400 dark:text-slate-500" />
            <input 
              type="text" 
              placeholder="Search by DEMO Part No..." 
              value={partNoSearch}
              onChange={(e) => setPartNoSearch(e.target.value)}
              className="bg-transparent border-none outline-none w-full placeholder:text-slate-400" 
            />
          </div>
        </div>
        <button 
          onClick={handleSearch}
          className="px-8 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg text-sm font-bold shadow-lg shadow-blue-900/20 transition-all flex items-center gap-2 active:scale-95"
        >
          <Search size={16} /> Search
        </button>
        <button 
          onClick={handleExport}
          className="flex items-center gap-2 px-4 py-2 border border-slate-200 dark:border-slate-700 rounded-lg text-sm font-semibold text-slate-700 dark:text-slate-300 hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors active:scale-95"
        >
          <FileSpreadsheet size={16} /> Excel
        </button>
      </div>

      <div className="bg-white dark:bg-slate-900/40 border border-slate-200 dark:border-slate-800 rounded-2xl overflow-hidden shadow-sm dark:shadow-none">
        <div className="overflow-x-auto">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b border-slate-200 dark:border-slate-800 bg-slate-50 dark:bg-slate-900/60">
                {['SAP CODE', 'ITEM NAME', 'DEMO PART NO', 'UOM', 'CLOSING STOCK'].map((head) => (
                  <th key={head} className="px-6 py-4 text-[10px] font-black text-slate-600 dark:text-slate-500 uppercase tracking-widest whitespace-nowrap">{head}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100 dark:divide-slate-800">
              {inventory.length > 0 ? (
                inventory.map((row, idx) => (
                  <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/30 transition-colors group">
                    <td className="px-6 py-4 text-[11px] font-bold text-blue-600 dark:text-blue-400 whitespace-nowrap">{row.sapCode}</td>
                    <td className="px-6 py-4 text-[11px] font-medium text-slate-900 dark:text-slate-300 whitespace-nowrap">{row.itemName}</td>
                    <td className="px-6 py-4 text-[11px] text-slate-600 dark:text-slate-400 whitespace-nowrap">{row.partNo}</td>
                    <td className="px-6 py-4 text-[11px] text-slate-600 dark:text-slate-400 whitespace-nowrap">{row.uom}</td>
                    <td className="px-6 py-4 text-[11px] font-bold text-blue-600 dark:text-blue-400 text-right tabular-nums whitespace-nowrap">{row.closingStock}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={5} className="px-6 py-20 text-center text-slate-400 dark:text-slate-500 font-bold uppercase tracking-widest">
                    No matching inventory records found.
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
