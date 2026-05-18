import { useNavigate } from "react-router-dom";
import React, { useState } from "react";
import { Search, Sparkles } from "lucide-react";

function AISearch() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();


  const handleSearch = async () => {
  if (!query) return;

  const res = await fetch(
    `http://localhost:5000/api/records/search?q=${query}`
  );

  const data = await res.json();
  setResults(data);
};

  return (
    <div className="dashboard-bg text-gray-800 p-8">

      <div className="max-w-6xl mx-auto">

        {/* Header */}
        <div className="mb-10">
          <h1 className="text-3xl font-bold flex items-center gap-2 text-gray-900">
            <Sparkles className="text-blue-600" />
            AI Smart Search
          </h1>
          <p className="text-gray-600 mt-2">
            Search medical-legal records using AI-powered indexing
          </p>
        </div>

        {/* Search Box */}
        <div className="flex bg-white border border-gray-300 rounded-xl overflow-hidden shadow-sm">
          <input
            type="text"
            placeholder="Search by patient name, case ID, date..."
            className="flex-1 p-4 outline-none"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
          />
          <button
            onClick={handleSearch}
            className="bg-blue-600 hover:bg-blue-700 text-white px-6 flex items-center gap-2 transition"
          >
            <Search size={18} />
            Search
          </button>
        </div>

        {/* AI Suggestions */}
        <div className="mt-6">
          <h3 className="text-gray-600 mb-3 font-medium">AI Suggestions</h3>
          <div className="flex gap-3 flex-wrap">
            <button
              onClick={() => setQuery("Head Injury")}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
            >
              Head Injury Cases
            </button>
            <button
              onClick={() => setQuery("2026")}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
            >
              2026 Records
            </button>
            <button
              onClick={() => setQuery("Pending")}
              className="bg-gray-200 hover:bg-gray-300 px-4 py-2 rounded-lg transition"
            >
              Pending Verification
            </button>
          </div>
        </div>

        {/* Results */}
        <div className="mt-10 grid md:grid-cols-2 gap-6">
          {results.map((item, index) => (
            <div
  key={index}
  onClick={() => navigate(`/record/${item._id}`)}
  className="bg-white border border-gray-200 p-6 rounded-xl shadow-sm hover:shadow-md transition cursor-pointer"
>
<h2 className="text-xl font-semibold mb-2 text-gray-900">
  Case ID: {item.caseId}
</h2>

<p className="text-gray-700">
  <span className="font-medium">Patient:</span> {item.patientName}
</p>

<p className="text-gray-700">
  <span className="font-medium">Injury:</span> {item.injuryType}
</p>

<p className="text-gray-700">
  <span className="font-medium">Date:</span> {item.date}
</p>

<p className="text-gray-700">
  <span className="font-medium">Status:</span> {item.status}
</p>

<span
  className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-medium ${
    item.status === "Verified"
      ? "bg-green-100 text-green-700"
      : "bg-yellow-100 text-yellow-700"
  }`}
>
  {item.status}
</span>
              <span
                className={`mt-3 inline-block px-3 py-1 rounded-full text-sm font-medium ${
                  item.status === "Verified"
                    ? "bg-green-100 text-green-700"
                    : "bg-yellow-100 text-yellow-700"
                }`}
              >
                {item.status}
              </span>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
}

export default AISearch;