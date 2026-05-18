export default function Sidebar() {
  return (
    <div className="hidden lg:flex w-64 bg-slate-900 border-r border-slate-800 p-6 flex-col gap-6">
      <div className="text-slate-400 text-xs uppercase tracking-wider">
        Navigation
      </div>

      <button className="text-left hover:text-cyan-400 transition">
        📊 Dashboard
      </button>

      <button className="text-left hover:text-cyan-400 transition">
        📁 Patient Records
      </button>

      <button className="text-left hover:text-cyan-400 transition">
        🔎 AI Search & Indexing
      </button>

      <button className="text-left hover:text-cyan-400 transition">
        🔐 Blockchain Verification
      </button>

      <button className="text-left hover:text-cyan-400 transition">
        📄 Reports & Logs
      </button>

      <button className="text-left hover:text-cyan-400 transition">
        ⚙ Settings
      </button>
    </div>
  );
}
