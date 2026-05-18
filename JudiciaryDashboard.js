import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function JudiciaryDashboard() {

  const navigate = useNavigate();

  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  const handleLogout = () => {
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };

  useEffect(() => {
    loadRecords();
  }, []);

  const loadRecords = () => {
  fetch("http://localhost:5000/api/records")
    .then(res => res.json())
    .then(data => {

      const submittedCases = data.filter(
        r => r.reportStatus === "Submitted"
      );

      setRecords(submittedCases);

    })
    .catch(err => console.error(err));
};

  const handleDecision = async (caseId, decision) => {

    try {

      await fetch(
        `http://localhost:5000/api/records/update-status/${caseId}`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ status: decision })
        }
      );

      alert(`Case ${decision}`);
      loadRecords();

    } catch (err) {
      console.error(err);
    }

  };

  // Search filter
  const filteredRecords = records.filter(r =>
    r.caseId.toLowerCase().includes(search.toLowerCase())
  );

  const totalCases = records.length;
  const approvedCases = records.filter(r => r.status === "Approved").length;
  const rejectedCases = records.filter(r => r.status === "Rejected").length;

  return (

    <div className="dashboard-bg text-gray-800 p-8">

      {/* Top Buttons */}
      <div className="flex justify-between items-center mb-8">

        <button
          onClick={handleBack}
          className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg"
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
      <div className="mb-8">

        <h1 className="text-3xl font-bold text-gray-900">
          Judiciary Evidence Review
        </h1>

        <p className="text-gray-500 mt-2">
          Review medico-legal evidence secured by blockchain
        </p>

      </div>

      {/* Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">

        <div className="bg-white border p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-600">Total Cases</h3>
          <p className="text-3xl font-bold text-purple-600">{totalCases}</p>
        </div>

        <div className="bg-white border p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-600">Approved Cases</h3>
          <p className="text-3xl font-bold text-green-600">{approvedCases}</p>
        </div>

        <div className="bg-white border p-6 rounded-xl shadow-sm">
          <h3 className="text-gray-600">Rejected Cases</h3>
          <p className="text-3xl font-bold text-red-600">{rejectedCases}</p>
        </div>

      </div>

      {/* Search Bar */}
      <div className="mb-6">

        <div className="relative w-80">

          <span className="absolute left-3 top-2 text-gray-400">🔍</span>

          <input
            type="text"
            placeholder="Search Case ID..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full pl-8 pr-4 py-2 border border-blue-400 rounded-lg focus:ring-2 focus:ring-blue-500"
          />

        </div>

      </div>

      {/* Table */}
      <div className="bg-white border p-6 rounded-xl shadow-sm">

        <h2 className="text-xl font-semibold mb-6">
          Evidence Review Table
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b text-gray-600">
                <th className="p-3">Case ID</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Injury</th>
                <th className="p-3">Date</th>
                <th className="p-3">Decision</th>
                <th className="p-3">Evidence</th>
                <th className="p-3">Verify</th>
                <th className="p-3">Action</th>
              </tr>
            </thead>

            <tbody>

              {filteredRecords.map(record => (

                <tr
                  key={record._id}
                  className="border-b hover:bg-gray-50"
                >

                  <td className="p-3 font-medium">{record.caseId}</td>
                  <td className="p-3">{record.patientName}</td>
                  <td className="p-3">{record.injuryType}</td>
                  <td className="p-3">{record.date}</td>

                  <td className="p-3">

                    <span
                      className={
                        record.status === "Approved"
                          ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                          : record.status === "Rejected"
                          ? "bg-red-100 text-red-700 px-3 py-1 rounded-full text-sm"
                          : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                      }
                    >
                      {record.status || "Pending"}
                    </span>

                  </td>

                  <td className="p-3">

                    <a
                      href={`http://localhost:5000/${record.filePath}`}
                      target="_blank"
                      rel="noreferrer"
                      className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
                    >
                      View
                    </a>

                  </td>

                  <td className="p-3">

                    <button
                      onClick={() => navigate(`/verify?caseId=${record.caseId}`)}
                      className="bg-indigo-600 hover:bg-indigo-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      Verify
                    </button>

                  </td>

                  <td className="p-3 flex gap-2">

                    <button
                      onClick={() => handleDecision(record.caseId, "Approved")}
                      disabled={record.status === "Approved" || record.status === "Rejected"}
                      className="bg-green-600 text-white px-3 py-1 rounded-md text-sm disabled:opacity-40"
                    >
                      Approve
                    </button>

                    <button
                      onClick={() => handleDecision(record.caseId, "Rejected")}
                      disabled={record.status === "Approved" || record.status === "Rejected"}
                      className="bg-red-600 text-white px-3 py-1 rounded-md text-sm disabled:opacity-40"
                    >
                      Reject
                    </button>

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