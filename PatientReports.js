import { useState, useEffect } from "react";

export default function PatientReports() {

  const [records, setRecords] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/api/records")
      .then(res => res.json())
      .then(data => {
        setRecords(data);
      });

  }, []);

  return (

    <div className="min-h-screen bg-gray-50 p-8">

      <h1 className="text-3xl font-bold mb-8">
        Download My Reports
      </h1>

      <div className="space-y-4">

        {records.map((record) => (

          <div
            key={record._id}
            className="bg-white p-4 rounded-xl flex justify-between items-center"
          >

            <div>

              <p className="font-semibold">{record.caseId}</p>

              <p className="text-gray-500 text-sm">
                {record.patientName} - {record.injuryType}
              </p>

            </div>

<a
 href={`http://localhost:5000/api/records/download/${record.filePath.split("/").pop()}`}
 className="bg-blue-600 text-white px-3 py-1 rounded-md text-sm"
>
 Download
</a>

          </div>

        ))}

      </div>

    </div>

  );

}