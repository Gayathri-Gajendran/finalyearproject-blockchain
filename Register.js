import { useState } from "react";
import { useNavigate } from "react-router-dom";

export default function Register() {
  const navigate = useNavigate();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const storedRole = localStorage.getItem("selectedRole") || "doctor";
const [role] = useState(storedRole);

  const handleRegister = async () => {
    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name,
          email,
          password,
          role,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        alert(data.message);
        return;
      }

      alert("Registration successful! Please login.");
      navigate("/login");

    } catch (error) {
      alert("Registration failed.");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="bg-white p-10 rounded-xl shadow-xl w-full max-w-md">

        <h2 className="text-2xl font-bold mb-6 text-center">
          Register New User
        </h2>

        <input
          type="text"
          placeholder="Full Name"
          className="w-full p-3 mb-4 border rounded-lg"
          value={name}
          onChange={(e) => setName(e.target.value)}
        />

        <input
          type="email"
          placeholder="Email"
          className="w-full p-3 mb-4 border rounded-lg"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border rounded-lg"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

      <input
  type="text"
  value={role}
  disabled
  className="w-full p-3 mb-6 border rounded-lg bg-gray-100 cursor-not-allowed"
/>

        <button
          onClick={handleRegister}
          className="w-full bg-blue-600 text-white py-3 rounded-lg"
        >
          Register
        </button>

      </div>
    </div>
  );
}