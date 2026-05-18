import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function PoliceDashboard() {

  const navigate = useNavigate();

  const handleLogout = () => {
    navigate("/");
  };

  const handleBack = () => {
    navigate(-1);
  };

  const [records, setRecords] = useState([]);
  const [search, setSearch] = useState("");

  useEffect(() => {

    fetch("http://localhost:5000/api/records")
      .then(res => res.json())
      .then(data => setRecords(data))
      .catch(err => console.error(err));

  }, []);

  // Filter records using search
  const filteredRecords = records.filter(record =>
    record.caseId.toString().includes(search) ||
    record.patientName.toLowerCase().includes(search.toLowerCase())
  );

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
      <div className="mb-6">

        <h1 className="text-3xl font-bold text-gray-900">
          Police Investigation Dashboard
        </h1>

        <p className="text-gray-500 mt-2">
          View medico-legal records and verify blockchain integrity.
        </p>

      </div>


      {/* Search Box */}
      <div className="mb-6">

      <div className="relative w-80 mb-6">

  {/* Search Icon */}
  <span className="absolute left-3 top-2.5 text-gray-400">
    🔍
  </span>

<div className="flex items-center border border-blue-400 rounded-lg px-3 py-2 w-80 shadow-sm focus-within:ring-2 focus-within:ring-blue-500">

  <span className="text-gray-400 mr-2">🔍</span>

  <input
    type="text"
    placeholder="Search Case ID or Patient..."
    value={search}
    onChange={(e) => setSearch(e.target.value)}
    className="w-full outline-none bg-transparent"
  />

</div>

</div>

      </div>


      {/* Records Table */}
      <div className="bg-white border border-gray-200 rounded-xl shadow-sm p-6">

        <h2 className="text-xl font-semibold mb-6">
          Medico-Legal Case Records
        </h2>

        <div className="overflow-x-auto">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b border-gray-200 text-gray-600">
                <th className="p-3">Case ID</th>
                <th className="p-3">Patient</th>
                <th className="p-3">Injury</th>
                <th className="p-3">Date</th>
                <th className="p-3">Status</th>
                <th className="p-3">Evidence</th>
                <th className="p-3">Verify</th>
                <th className="p-3">Details</th>
              </tr>
            </thead>

            <tbody>

              {filteredRecords.map((record) => (

                <tr
                  key={record._id}
                  className="border-b border-gray-100 hover:bg-gray-50"
                >

                  <td className="p-3 font-medium">
                    {record.caseId}
                  </td>

                  <td className="p-3">
                    {record.patientName}
                  </td>

                  <td className="p-3">
                    {record.injuryType}
                  </td>

                  <td className="p-3">
                    {record.date}
                  </td>

                  <td className="p-3">

                    <span
                      className={
                        record.status === "Verified"
                          ? "text-green-600 font-semibold"
                          : record.status === "Tampered"
                          ? "text-red-600 font-semibold"
                          : "text-yellow-600 font-semibold"
                      }
                    >
                      {record.status}
                    </span>

                  </td>

                  <td className="p-3">

<a
 href={`http://localhost:5000/api/records/download/${record.filePath.split("/").pop()}`}
 className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
>
 Download
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

                  <td className="p-3">

                    <button
                      onClick={() => navigate(`/record/${record._id}`)}
                      className="bg-gray-600 hover:bg-gray-700 text-white px-3 py-1 rounded-md text-sm"
                    >
                      View
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