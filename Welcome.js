import { useNavigate } from "react-router-dom";
import { ShieldCheck } from "lucide-react";

function Welcome() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f172a] via-[#111827] to-black text-white flex flex-col">

      {/* Navbar */}
      <nav className="flex justify-between items-center px-8 py-5 border-b border-gray-700">
        <div className="flex items-center gap-2 text-2xl font-bold text-cyan-400">
          <ShieldCheck size={28} />
          MedicoLedger AI
        </div>

        <button
          onClick={() => navigate("/login")}
          className="bg-cyan-500 hover:bg-cyan-600 px-5 py-2 rounded-lg font-semibold transition"
        >
          Login
        </button>
      </nav>

      {/* Hero Section */}
      <div className="flex flex-1 items-center justify-center text-center px-6">
        <div className="max-w-3xl">

          <h1 className="text-5xl md:text-6xl font-extrabold mb-6 leading-tight">
            Secure Medico-Legal Records <br />
            <span className="text-cyan-400">
              Powered by AI & Blockchain
            </span>
          </h1>

          <p className="text-gray-400 text-lg mb-10">
            Intelligent document indexing, tamper-proof verification,
            and secure digital evidence management for healthcare and law enforcement.
          </p>

          <div className="flex flex-col md:flex-row justify-center gap-6">

            <button
              onClick={() => navigate("/login")}
              className="bg-gradient-to-r from-cyan-500 to-blue-600 px-8 py-4 rounded-xl text-lg font-semibold hover:scale-105 transition"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/ai-search")}
              className="border border-cyan-400 px-8 py-4 rounded-xl text-lg font-semibold hover:bg-cyan-500 hover:text-white transition"
            >
              Explore AI Search
            </button>

          </div>

        </div>
      </div>

      {/* Footer */}
      <div className="text-center py-6 border-t border-gray-700 text-gray-500 text-sm">
        © 2026 MedicoLedger AI | Smart Medico-Legal Management System
      </div>

    </div>
  );
}

export default Welcome;
