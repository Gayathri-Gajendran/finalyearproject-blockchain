import { useNavigate } from "react-router-dom";

export default function RoleSelection() {
  const navigate = useNavigate();

  const roles = [
    { name: "Doctor", icon: "👨‍⚕️", roleValue: "doctor" },
    { name: "Patient", icon: "🧑‍🦽", roleValue: "patient" },
    { name: "Police", icon: "🚔", roleValue: "police" },
    { name: "Judiciary", icon: "⚖️", roleValue: "judiciary" },
    { name: "Medical Reporter", icon: "📝", roleValue: "medical reporter" },
    { name: "Administrator", icon: "🛡️", roleValue: "admin"  },
  ];

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center justify-center p-10">

      {/* Title Section */}
      <h1 className="text-4xl font-bold text-gray-800 mb-4">
        Choose Your Portal
      </h1>

      <p className="text-gray-500 mb-12 text-center">
        Select your access level to proceed securely into MedicoLedger AI
      </p>

      {/* Role Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl w-full">

        {roles.map((role, index) => (
          <div
            key={index}
  onClick={() => {
  localStorage.setItem("selectedRole", role.roleValue);
  navigate("/register");
}}
            className="cursor-pointer bg-white border border-gray-200 hover:border-blue-500 
                       hover:shadow-xl transition-all duration-300 rounded-2xl p-10 text-center"
          >
            <div className="text-5xl mb-4">
              {role.icon}
            </div>

            <h2 className="text-xl font-semibold text-gray-800">
              {role.name}
            </h2>
          </div>
        ))}

      </div>

    </div>
  );
}