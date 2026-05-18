import { useNavigate } from "react-router-dom";

export default function Landing() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="w-1/2 relative flex items-center justify-center overflow-hidden h-screen">

        <img
          src="https://images.unsplash.com/photo-1588776814546-1ffcf47267a5?auto=format&fit=crop&w=1200&q=80"
          alt="Medical Background"
          className="absolute inset-0 w-full h-full object-cover"
        />

        <div className="absolute inset-0 bg-gradient-to-r from-blue-900/60 via-cyan-900/40 to-transparent"></div>

        <div className="absolute inset-0 z-10 pointer-events-none">
          {[...Array(20)].map((_, i) => (
            <span
              key={i}
              className="absolute w-2 h-2 bg-cyan-400 rounded-full opacity-50 animate-float"
              style={{
                left: `${Math.random() * 100}%`,
                top: `${Math.random() * 100}%`,
                animationDuration: `${3 + Math.random() * 5}s`
              }}
            ></span>
          ))}
        </div>

        <div className="relative z-20 text-white p-16">
          <h1 className="text-4xl font-bold mb-6">
            MedicoLedger AI
          </h1>

          <p className="text-lg text-cyan-400 mb-6">
            Blockchain secured • AI powered • HIPAA compliant
          </p>

          <div className="space-y-3 text-blue-200 mt-8">
            <p>✔ Secure Evidence Management</p>
            <p>✔ AI Indexing & Smart Search</p>
            <p>✔ Blockchain Tamper Detection</p>
            <p>✔ Law Enforcement Integration</p>
          </div>
        </div>

      </div>

      {/* RIGHT SIDE - FULL WHITE */}
      <div className="w-1/2 flex items-center justify-center bg-white p-16">

        <div className="max-w-xl">

          <h1 className="text-4xl md:text-5xl font-bold text-[#1e293b] mb-6">
            Secure Medico-Legal Records
          </h1>

          <h2 className="text-3xl md:text-4xl font-bold text-[#2563eb] mb-6">
            Powered by AI & Blockchain
          </h2>

          <p className="text-gray-600 mb-10 text-lg">
            Intelligent document indexing, tamper-proof verification,
            and secure digital evidence management for healthcare
            and law enforcement.
          </p>

          <div className="flex gap-6 flex-wrap">

            <button
              onClick={() => navigate("/roles")}
              className="px-8 py-3 bg-[#334155] text-white rounded-lg hover:bg-[#1e293b] transition font-semibold"
            >
              Get Started
            </button>

            <button
              onClick={() => navigate("/ai-search")}
              className="px-8 py-3 border border-[#334155] text-[#334155] rounded-lg hover:bg-[#334155] hover:text-white transition font-semibold"
            >
              Explore AI Search
            </button>
            <p className="text-center mt-4 text-sm">
  Already have an account? 
  <span 
    onClick={() => navigate("/login")} 
    className="text-blue-600 cursor-pointer"
  >
    Login
  </span>
</p>

          </div>

        </div>

      </div>

      <style>
        {`
        @keyframes float {
          0% { transform: translateY(0px); opacity: 0.6; }
          50% { transform: translateY(-20px); opacity: 1; }
          100% { transform: translateY(0px); opacity: 0.6; }
        }

        .animate-float {
          animation: float linear infinite;
        }
        `}
      </style>

    </div>
  );
}