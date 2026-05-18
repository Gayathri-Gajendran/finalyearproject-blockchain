import React, { useState } from "react";

function Upload() {
  const [file, setFile] = useState(null);
  const [caseId, setCaseId] = useState("");
  const [patientName, setPatientName] = useState("");
  const [injuryType, setInjuryType] = useState("");
  const [uploadedBy, setUploadedBy] = useState("");
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [status, setStatus] = useState("");
  const [description, setDescription] = useState("");
  const [age, setAge] = useState("");
const [phone, setPhone] = useState("");
const [bloodGroup, setBloodGroup] = useState("");

  const handleUpload = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append("caseId", caseId);
    formData.append("patientName", patientName);
    formData.append("injuryType", injuryType);
    formData.append("date", date);
    formData.append("status", status);
    formData.append("description", description);
    formData.append("uploadedBy", uploadedBy);
    formData.append("age", age);
    formData.append("phone", phone);
    formData.append("bloodGroup", bloodGroup);

    if (file) {
      formData.append("document", file);
    }

    try {
      const res = await fetch("http://localhost:5000/api/records/upload", {
        method: "POST",
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage("✅ Upload successful");
      } else {
        setMessage("❌ " + data.message);
      }

    } catch (err) {
      setMessage("❌ Upload failed");
    }
  };

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">
      <div className="w-full max-w-2xl bg-white border rounded-2xl shadow-sm p-10">

        <h2 className="text-3xl font-bold mb-6 text-center">
          Upload Medico-Legal Record
        </h2>

        <form onSubmit={handleUpload} className="space-y-5">

          <input
            type="text"
            placeholder="Case ID"
            value={caseId}
            onChange={(e) => setCaseId(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            type="text"
            placeholder="Patient Name"
            value={patientName}
            onChange={(e) => setPatientName(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />

          <input
            type="text"
            placeholder="Injury Type"
            value={injuryType}
            onChange={(e) => setInjuryType(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />
          <input
  type="number"
  placeholder="Patient Age"
  value={age}
  onChange={(e) => setAge(e.target.value)}
  className="w-full p-3 border rounded-lg"
/>

<input
  type="text"
  placeholder="Phone Number"
  value={phone}
  onChange={(e) => setPhone(e.target.value)}
  className="w-full p-3 border rounded-lg"
/>

<select
  value={bloodGroup}
  onChange={(e) => setBloodGroup(e.target.value)}
  className="w-full p-3 border rounded-lg"
>
  <option value="">Select Blood Group</option>
  <option value="A+">A+</option>
  <option value="A-">A-</option>
  <option value="B+">B+</option>
  <option value="B-">B-</option>
  <option value="O+">O+</option>
  <option value="O-">O-</option>
  <option value="AB+">AB+</option>
  <option value="AB-">AB-</option>
</select>
          <input
  type="date"
  value={date}
  onChange={(e) => setDate(e.target.value)}
  placeholder="Enter Date"
/>
<select
  value={status}
  onChange={(e) => setStatus(e.target.value)}
>
  <option value="">Select Status</option>
  <option value="Pending">Pending</option>
  <option value="Verified">Verified</option>
</select>
<textarea
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  placeholder="Enter Case Description"
/>

          <input
            type="text"
            placeholder="Uploaded By"
            value={uploadedBy}
            onChange={(e) => setUploadedBy(e.target.value)}
            className="w-full p-3 border rounded-lg"
            required
          />

          {/* FILE OPTIONAL */}
          <input
            type="file"
            onChange={(e) => setFile(e.target.files[0])}
            className="w-full"
          />

          <button
            type="submit"
            className="w-full py-3 bg-blue-600 text-white rounded-lg"
          >
            Upload Record
          </button>

          {message && (
            <p className="text-center mt-3">{message}</p>
          )}

        </form>

      </div>
    </div>
  );
}

export default Upload;