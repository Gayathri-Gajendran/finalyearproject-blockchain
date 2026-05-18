import { useNavigate } from "react-router-dom";

export default function PatientDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };

  return (

    <div className="dashboard-bg text-gray-800 p-8">

      {/* Top Buttons */}
      <div className="flex justify-between items-center mb-8">

        <button
          onClick={handleBack}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg font-medium"
        >
          🔙 Back
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>


      {/* Header */}
      <div className="mb-12">

        <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
          Patient Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          Access your medico-legal records and verify blockchain security.
        </p>

      </div>


      {/* Patient Features */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">


        {/* My Records */}
        <div
          onClick={() => navigate("/patient-records")}
          className="cursor-pointer bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition"
        >

          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            📄 My Medical Records
          </h2>

          <p className="text-gray-600">
            View your personal medico-legal case files uploaded by the doctor.
          </p>

        </div>


        {/* Blockchain Verification */}
        <div
          onClick={() => navigate("/verify")}
          className="cursor-pointer bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition"
        >

          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            🔐 Verify Record Integrity
          </h2>

          <p className="text-gray-600">
            Check whether your medical record has been tampered using blockchain verification.
          </p>

        </div>

      </div>

    </div>

  );

}