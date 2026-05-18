import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

function RecordDetails() {

  const { id } = useParams();
  const [record, setRecord] = useState(null);

  useEffect(() => {

    fetch(`http://localhost:5000/api/records/record/${id}`)
      .then(res => res.json())
      .then(data => setRecord(data));

  }, [id]);

  if (!record) return <h2>Loading...</h2>;

  return (
    <div className="p-10">

      <h1 className="text-2xl font-bold mb-6">Patient Record Details</h1>

      <p><b>Case ID:</b> {record.caseId}</p>
      <p><b>Patient Name:</b> {record.patientName}</p>
      <p><b>Injury Type:</b> {record.injuryType}</p>
      <p><b>Date:</b> {record.date}</p>
      <p><b>Status:</b> {record.status}</p>
      <p><b>Description:</b> {record.description}</p>

    </div>
  );
}

export default RecordDetails;