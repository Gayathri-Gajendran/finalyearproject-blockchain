import MainLayout from "../layout/MainLayout";

export default function Dashboard() {
  return (
    <MainLayout>
      <div className="space-y-10">

        {/* HERO SECTION */}
        <div className="bg-gradient-to-r from-cyan-600 to-blue-700 p-8 rounded-3xl shadow-xl">
          <h2 className="text-3xl font-bold mb-3">
            Smart Medico-Legal Record System
          </h2>
          <p className="text-slate-200 max-w-2xl">
            AI-powered indexing with blockchain integrity verification.
            Secure. Tamper-proof. Trusted.
          </p>

          <div className="flex gap-4 mt-6">
            <button className="bg-white text-slate-900 px-6 py-3 rounded-xl font-semibold hover:scale-105 transition">
              Upload Record
            </button>
            <button className="border border-white px-6 py-3 rounded-xl hover:bg-white hover:text-slate-900 transition">
              Verify Integrity
            </button>
          </div>
        </div>

        {/* STATS CARDS */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">

          <StatCard title="Records Stored" value="1,245" icon="📁" />
          <StatCard title="Verified Files" value="1,220" icon="✅" />
          <StatCard title="Tamper Alerts" value="2" icon="⚠️" />
          <StatCard title="Active Users" value="58" icon="👥" />

        </div>

        {/* AI SEARCH */}
        <div className="bg-slate-900 p-6 rounded-2xl shadow-lg">
          <h3 className="text-xl font-semibold mb-4">
            🤖 AI Smart Search
          </h3>

          <input
            type="text"
            placeholder="Search by patient name, case ID, keywords..."
            className="w-full bg-slate-800 p-4 rounded-xl focus:outline-none focus:ring-2 focus:ring-cyan-500"
          />

          <div className="mt-4 text-sm text-slate-400">
            AI Suggestions: Head Injury | Case 2026 | Dr Smith
          </div>
        </div>

      </div>
    </MainLayout>
  );
}

function StatCard({ title, value, icon }) {
  return (
    <div className="bg-slate-900 p-6 rounded-2xl shadow-md hover:scale-105 transition">
      <div className="text-2xl">{icon}</div>
      <div className="text-2xl font-bold mt-2">{value}</div>
      <div className="text-slate-400 text-sm">{title}</div>
    </div>
  );
}
