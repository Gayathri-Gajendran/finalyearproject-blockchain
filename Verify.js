import { useState } from "react";

export default function Verify() {

  const [recordId, setRecordId] = useState("");
  const [result, setResult] = useState("");

  const verifyRecord = async () => {

    if (!recordId) {
      setResult("❌ Please enter a Case ID.");
      return;
    }

    try {

      const res = await fetch(
        `http://localhost:5000/api/records/verify/${recordId}`
      );

      const data = await res.json();

      // RECORD NOT FOUND
      if (res.status === 404) {
        setResult("❌ Record not found.");
        return;
      }

      // SAFE RECORD
      if (data.status === "SAFE") {
        setResult(
          "✅ Blockchain Verified\n\nFile is authentic and no tampering detected."
        );
        return;
      }

      // TAMPERED RECORD
      if (data.status === "TAMPERED") {

        let changeText = "⚠ Tampering detected!\n\n";

        if (data.changes && data.changes.length > 0) {

          data.changes.forEach(change => {

            changeText +=
              `Field: ${change.field}\n` +
              `Before: ${change.before}\n` +
              `After: ${change.after}\n\n`;

          });

        } else {

          changeText += data.message || "Record integrity failed.";

        }

        setResult(changeText);
      }

    } catch (error) {

      setResult("❌ Error verifying blockchain record.");

    }

  };

  return (

    <div className="dashboard-bg text-center pt-32">

      <h2>Blockchain Record Verification</h2>

      <input
        type="text"
        placeholder="Enter Case ID"
        value={recordId}
        onChange={(e)=>setRecordId(e.target.value)}
        style={{
          padding:"10px",
          width:"260px",
          border:"1px solid #ccc",
          borderRadius:"6px"
        }}
      />

      <br/><br/>

      <button
        onClick={verifyRecord}
        style={{
          padding:"10px 20px",
          background:"#007bff",
          color:"white",
          border:"none",
          borderRadius:"6px",
          cursor:"pointer"
        }}
      >
        Verify Record
      </button>

      <br/><br/>

      <pre
        style={{
          color: result.includes("⚠") || result.includes("❌") ? "red" : "green",
          background: "#f4f4f4",
          padding: "15px",
          width: "420px",
          margin: "auto",
          textAlign: "left",
          borderRadius: "6px",
          whiteSpace: "pre-wrap"
        }}
      >
        {result}
      </pre>

    </div>

  );

}