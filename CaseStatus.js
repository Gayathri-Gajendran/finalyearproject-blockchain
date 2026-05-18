import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function CaseStatus() {
  const navigate = useNavigate();

  const handleBack = () => {
    navigate(-1);
  };

  const handleLogout = () => {
    navigate("/");
  };

  const [cases, setCases] = useState([]);

useEffect(() => {
  fetch("http://localhost:5000/api/records")
    .then(res => res.json())
    .then(data => setCases(data));
}, []);

  return (
    <div className="min-h-screen bg-gray-50 text-gray-800 p-8">

      {/* Top Navigation */}
      <div className="flex justify-between items-center mb-8">
        <button
          onClick={handleBack}
          className="bg-gray-700 hover:bg-gray-800 text-white px-4 py-2 rounded-lg"
        >
          🔙 Back
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg"
        >
          🚪 Logout
        </button>
      </div>

      {/* Page Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold">
          Case Status Tracker
        </h1>
        <p className="text-gray-500 mt-2">
          Monitor your legal case progress and court updates.
        </p>
      </div>
     {/* Case Table */}
<div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">

  <div className="overflow-x-auto">
    <table className="w-full text-left">

      <thead>
        <tr className="border-b border-gray-200 text-gray-500">
          <th className="p-3">Case ID</th>
          <th className="p-3">Injury Type</th>
          <th className="p-3">Patient Name</th>
          <th className="p-3">Created Date</th>
          <th className="p-3">Status</th>
        </tr>
      </thead>

      <tbody>
        {cases.map((c, index) => (
          <tr key={index} className="border-b border-gray-100 hover:bg-gray-50">

            <td className="p-3 font-medium">{c.caseId}</td>

            <td className="p-3">{c.injuryType}</td>

            <td className="p-3">{c.patientName}</td>

            <td className="p-3">
              {c.createdAt
                ? new Date(c.createdAt).toLocaleDateString()
                : "N/A"}
            </td>

            <td className="p-3">
              <span
                className={
                  c.status === "Verified"
                    ? "text-green-600 font-medium"
                    : c.status === "Pending"
                    ? "text-yellow-600 font-medium"
                    : "text-blue-600 font-medium"
                }
              >
                {c.status}
              </span>
            </td>

          </tr>
        ))}
      </tbody>

    </table>
  </div>

</div>

    </div>
  );
}