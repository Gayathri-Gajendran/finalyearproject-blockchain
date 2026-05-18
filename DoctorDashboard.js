import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function DoctorDashboard() {
  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };
  const [stats, setStats] = useState({
  totalRecords: 0,
  verifiedFiles: 0,
  tamperAlerts: 0
});
const [recentRecords, setRecentRecords] = useState([]);
useEffect(() => {

  // fetch stats
  fetch("http://localhost:5000/api/records/stats/dashboard")
    .then(res => res.json())
    .then(data => {
      setStats(data);
    })
    .catch(err => console.error(err));

  // fetch recent records
  fetch("http://localhost:5000/api/records")
    .then(res => res.json())
    .then(data => {
      setRecentRecords(data.slice(0,5)); // show last 5 records
    })
    .catch(err => console.error(err));

}, []);


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
          className="bg-red-500 hover:bg-red-600 text-white px-4 py-2 rounded-lg font-medium"
        >
          🚪 Logout
        </button>
      </div>

      {/* Header */}
      <div className="flex flex-col md:flex-row md:justify-between md:items-center mb-12">
        <div>
          <h1 className="text-3xl md:text-4xl font-bold text-gray-900">
            Doctor Dashboard
          </h1>
          <p className="text-gray-500 mt-2">
            Manage medico-legal cases securely with AI & Blockchain
          </p>
        </div>

        <button
          onClick={() => navigate("/upload")}
          className="mt-4 md:mt-0 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition"
        >
          + Upload Record
        </button>
      </div>

      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <h3 className="text-gray-600">Records Uploaded</h3>
          <p className="text-3xl font-bold mt-2 text-blue-600">{stats.totalRecords}</p>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <h3 className="text-gray-600">Verified Files</h3>
          <p className="text-3xl font-bold mt-2 text-green-600">{stats.verifiedFiles}</p>
        </div>

        <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
          <h3 className="text-gray-600">Tamper Alerts</h3>
          <p className="text-3xl font-bold mt-2 text-red-600">{stats.tamperAlerts}</p>
        </div>

      </div>

      {/* Action Cards */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">

        <div
          onClick={() => navigate("/upload")}
          className="cursor-pointer bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Upload New Case
          </h2>
          <p className="text-gray-600">
            Securely upload medical evidence and generate blockchain hash.
          </p>
        </div>

        <div
          onClick={() => navigate("/ai-search")}
          className="cursor-pointer bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            AI Search
          </h2>
          <p className="text-gray-600">
            Smart search by patient, case ID, keywords.
          </p>
        </div>

        <div
          onClick={() => navigate("/verify")}
          className="cursor-pointer bg-white border border-gray-200 p-8 rounded-2xl shadow-sm hover:shadow-md transition"
        >
          <h2 className="text-xl font-semibold mb-3 text-gray-800">
            Verify Integrity
          </h2>
          <p className="text-gray-600">
            Check tamper-proof blockchain verification.
          </p>
        </div>

      </div>

      {/* Recent Records */}
      <div className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm">
        <h2 className="text-xl font-semibold mb-6 text-gray-800">
          Recent Case Files
        </h2>

        <div className="space-y-4">

{recentRecords.map((record) => (

  <div
    key={record._id}
    className="flex justify-between items-center bg-gray-100 p-4 rounded-xl"
  >

    <div>
      <p className="font-semibold text-gray-800">{record.caseId}</p>

      <p className="text-gray-500 text-sm">
        {record.injuryType} - {record.patientName}
      </p>

      <p className="text-gray-400 text-xs">
        Age: {record.age} | Blood: {record.bloodGroup}
      </p>
    </div>

    <span
      className={
        record.status === "Verified"
          ? "text-green-600 font-semibold"
          : "text-yellow-600 font-semibold"
      }
    >
      {record.status}
    </span>

  </div>

))}

</div>
      </div>

    </div>
  );
}