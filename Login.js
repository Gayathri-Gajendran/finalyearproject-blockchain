import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaFingerprint } from "react-icons/fa";

export default function Login() {
  const navigate = useNavigate();

  const [scanning, setScanning] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

const handleLogin = async () => {
  try {
    const res = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email, password }),
    });

    const data = await res.json();

    if (!res.ok) {
      alert(data.message);
      return;
    }

    // Save login state
    localStorage.setItem("isLoggedIn", "true");
    localStorage.setItem("userRole", data.user.role);
    localStorage.setItem("patientName", data.user.name);

    const role = data.user.role;

    // Redirect based on role
    if (role === "doctor") {
      navigate("/doctor");
    } 
    else if (role === "patient") {
      navigate("/patient");
    } 
    else if (role === "police") {
      navigate("/police");
    } 
    else if (role === "judiciary") {
      navigate("/judiciary");
    } 
    else if (role === "medical reporter") {
      navigate("/reporter");
    } 
    else if (role === "admin") {
      navigate("/admin");
    } 
    else {
      navigate("/roles");
    }

  } catch (error) {
    alert("Login failed. Server error.");
  }
};
  // 👆 Fingerprint Login (Simulated)
  const handleFingerprintLogin = async () => {
    setScanning(true);

    await new Promise((resolve) => setTimeout(resolve, 2000));

    handleLogin();

    setScanning(false);
  };

  return (
    <div className="min-h-screen flex">

      {/* LEFT SIDE */}
      <div className="hidden md:flex w-1/2 relative bg-gradient-to-br from-blue-900 via-indigo-900 to-slate-900 text-white p-12 items-center">
        <div className="absolute inset-0 bg-black/40"></div>

        <div className="relative z-10">
          <h1 className="text-4xl font-bold mb-4">
            Smart Medico-Legal RMS
          </h1>

          <p className="text-lg mb-6 opacity-90">
            Blockchain secured • AI powered • HIPAA compliant
          </p>

          <div className="mt-10 space-y-3 text-blue-200">
            <p>✔ Secure Evidence Management</p>
            <p>✔ AI Indexing & Smart Search</p>
            <p>✔ Blockchain Tamper Detection</p>
            <p>✔ Judiciary & Law Integration</p>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE */}
      <div className="w-full md:w-1/2 flex items-center justify-center bg-gray-50 p-8">
        <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-10">

          <h2 className="text-2xl font-bold mb-2 text-gray-800">
            Secure Login
          </h2>

          <p className="text-sm text-gray-500 mb-6">
            Access your medico-legal dashboard securely
          </p>

          <input
            type="text"
            placeholder="Email or Phone"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />

          <button
            onClick={handleLogin}
            className="w-full bg-slate-700 hover:bg-slate-800 text-white py-3 rounded-lg font-semibold transition"
          >
            🔐 Secure Login
          </button>

          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-3 text-gray-400 text-sm">OR LOGIN WITH</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          <div className="flex flex-col items-center">
            <button
              onClick={handleFingerprintLogin}
              className="w-16 h-16 flex items-center justify-center rounded-full border border-gray-300 hover:bg-gray-100 transition"
            >
              <FaFingerprint
                size={28}
                className={
                  scanning
                    ? "animate-pulse text-blue-600"
                    : "text-gray-700"
                }
              />
            </button>

            <p className="text-xs text-gray-500 mt-2">
              Touch ID
            </p>
          </div>

          <div className="mt-8 text-center text-xs text-gray-400">
            🛡️ Blockchain Secured & AI Powered
          </div>

        </div>
      </div>
    </div>
  );
}