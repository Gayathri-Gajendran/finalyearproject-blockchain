import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);

  return (
    <div className="w-full bg-slate-900 border-b border-slate-800 px-6 py-4 flex justify-between items-center">
      <div className="flex items-center gap-3">
        <div className="text-2xl">🛡️</div>
        <h1 className="text-xl font-bold text-cyan-400">
          MedicoLedger AI
        </h1>
      </div>

      {/* Desktop Menu */}
      <div className="hidden lg:flex gap-6 text-sm text-slate-300">
        <span className="hover:text-cyan-400 cursor-pointer">Dashboard</span>
        <span className="hover:text-cyan-400 cursor-pointer">AI Search</span>
        <span className="hover:text-cyan-400 cursor-pointer">Blockchain</span>
        <span className="hover:text-cyan-400 cursor-pointer">Reports</span>
      </div>

      {/* Mobile Hamburger */}
      <button
        className="lg:hidden text-xl"
        onClick={() => setOpen(!open)}
      >
        ☰
      </button>

      {open && (
        <div className="absolute top-16 right-6 bg-slate-800 p-4 rounded-xl shadow-xl flex flex-col gap-3 text-sm">
          <span>Dashboard</span>
          <span>AI Search</span>
          <span>Blockchain</span>
          <span>Reports</span>
        </div>
      )}
    </div>
  );
}
