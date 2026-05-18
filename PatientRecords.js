import { useEffect, useState } from "react";

export default function PatientRecords() {

  const [records, setRecords] = useState([]);

  const patientName = localStorage.getItem("patientName");

  useEffect(() => {

    fetch(`http://localhost:5000/api/records/patient/${patientName}`)
      .then(res => res.json())
      .then(data => setRecords(data));

  }, [patientName]);

  return (

    <div className="min-h-screen bg-gray-50 p-10">

      {/* Page Header */}
      <h1 className="text-3xl font-bold mb-2">
        My Medical Records
      </h1>

      <p className="text-gray-500 mb-8">
        View and download your medico-legal documents securely.
      </p>

      {records.length === 0 ? (

        <div className="bg-white p-8 rounded-xl shadow-sm text-center text-gray-500">
          No medical records found.
        </div>

      ) : (

        <div className="grid md:grid-cols-2 gap-6">

          {records.map((record) => (

            <div
              key={record._id}
              className="bg-white border border-gray-200 p-6 rounded-2xl shadow-sm hover:shadow-md transition"
            >

              {/* Case Header */}
              <div className="flex justify-between items-center mb-4">

                <h2 className="text-lg font-semibold text-gray-800">
                  Case ID: {record.caseId}
                </h2>

                <span
                  className={
                    record.status === "Verified"
                      ? "bg-green-100 text-green-700 px-3 py-1 rounded-full text-sm"
                      : "bg-yellow-100 text-yellow-700 px-3 py-1 rounded-full text-sm"
                  }
                >
                  {record.status}
                </span>

              </div>

              {/* Record Details */}
              <p className="text-gray-600">
                <b>Patient:</b> {record.patientName}
              </p>

              <p className="text-gray-600">
                <b>Injury:</b> {record.injuryType}
              </p>

              <p className="text-gray-600">
                <b>Date:</b> {record.date}
              </p>

              {/* Action Buttons */}
              <div className="flex gap-3 mt-6">

                <a
                  href={`http://localhost:5000/${record.filePath}`}
                  download
                  className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Download Report
                </a>

                <a
                  href={`/verify?caseId=${record.caseId}`}
                  className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded-lg text-sm"
                >
                  Verify Blockchain
                </a>

              </div>

            </div>

          ))}

        </div>

      )}

    </div>

  );

}