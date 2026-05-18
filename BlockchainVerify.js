import { useState, useEffect } from "react";

export default function BlockchainVerify() {

  const [caseId, setCaseId] = useState("");
  const [records, setRecords] = useState([]);
  const [result, setResult] = useState(null);

  useEffect(() => {

    // Admin can see all cases
    fetch("http://localhost:5000/api/records")
      .then(res => res.json())
      .then(data => setRecords(data))
      .catch(err => console.error(err));

  }, []);

  const handleVerify = async () => {

    if (!caseId) return;

    const res = await fetch(
      `http://localhost:5000/api/records/verify/${caseId}`
    );

    const data = await res.json();

    setResult(data);

  };

  return (

    <div className="min-h-screen bg-gray-50 p-8">

      <h1 className="text-3xl font-bold mb-6">
        Blockchain Verification
      </h1>

      {/* Case dropdown */}
      <select
        value={caseId}
        onChange={(e)=>setCaseId(e.target.value)}
        className="border p-3 rounded mr-4"
      >

        <option value="">Select Case</option>

        {records.map((r)=>(
          <option key={r._id} value={r.caseId}>
            {r.caseId} - {r.patientName}
          </option>
        ))}

      </select>

      <button
        onClick={handleVerify}
        className="bg-blue-600 text-white px-4 py-2 rounded"
      >
        Verify
      </button>

      {result && (

        <div className="mt-6 bg-white p-6 rounded shadow">

          <p>
            <strong>Status:</strong> {result.status}
          </p>

          <p>
            <strong>Message:</strong> {result.message}
          </p>

        </div>

      )}

    </div>

  );

}