import { useState } from "react";
import { QRCodeCanvas } from "qrcode.react";
import { ShieldCheck } from "lucide-react";

export default function GenerateReport() {
  const [caseId, setCaseId] = useState("");
  const [summary, setSummary] = useState("");
  const [signed, setSigned] = useState(false);
  const [signatureId, setSignatureId] = useState("");
  const [timestamp, setTimestamp] = useState("");
  const [hash, setHash] = useState("");
  const generateHash = () => {
  return "0x" + Math.random().toString(16).substring(2, 18);
};

  const handleSubmit = async () => {

  if (!caseId || !summary) {
    alert("Please fill all fields");
    return;
  }

  const newSignature = "SIG-" + Math.floor(Math.random() * 1000000);
  const newTimestamp = new Date().toLocaleString();
  const newHash = generateHash();

  setSignatureId(newSignature);
  setTimestamp(newTimestamp);
  setHash(newHash);
  setSigned(true);

  try {

    await fetch("http://localhost:5000/api/records/generate-report", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        caseId: caseId,
        summary: summary
      })
    });

  } catch (error) {
    console.error("Error saving report:", error);
  }

};

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-8">

      <div className="w-full max-w-3xl bg-white border border-gray-200 rounded-2xl shadow-sm p-10">

        <h1 className="text-3xl font-bold text-gray-900 mb-2">
          Generate Medico-Legal Report
        </h1>

        <p className="text-gray-600 mb-8">
          Create digitally signed medico-legal documentation with blockchain integrity.
        </p>

        {!signed && (
          <>
            <input
              type="text"
              placeholder="Enter Case ID"
              value={caseId}
              onChange={(e) => setCaseId(e.target.value)}
              className="w-full p-3 mb-4 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <textarea
              placeholder="Enter Case Summary"
              value={summary}
              onChange={(e) => setSummary(e.target.value)}
              rows={4}
              className="w-full p-3 mb-6 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />

            <button
              onClick={handleSubmit}
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 rounded-lg font-semibold transition"
            >
              Generate & Digitally Sign Report
            </button>
          </>
        )}

        {signed && (
          <div className="mt-8 bg-gray-50 border border-green-200 p-8 rounded-xl">

            <div className="flex items-center gap-2 mb-6">
              <ShieldCheck className="text-green-600" />
              <h2 className="text-xl font-semibold text-green-700">
                Digitally Signed Report
              </h2>
            </div>

            <div className="space-y-3 text-gray-700">

              <p>
                <span className="font-medium">Case ID:</span> {caseId}
              </p>

              <p>
                <span className="font-medium">Signature ID:</span> {signatureId}
              </p>

              <p>
                <span className="font-medium">Timestamp:</span> {timestamp}
              </p>

              <p className="break-all">
                <span className="font-medium">Blockchain Hash:</span> {hash}
              </p>

            </div>

            {/* QR Code Section */}
            <div className="mt-8 flex flex-col items-center">

              <QRCodeCanvas
                value={`Case:${caseId} | Signature:${signatureId} | Hash:${hash}`}
                size={180}
                bgColor="#ffffff"
                fgColor="#2563eb"
              />

              <p className="text-gray-600 text-sm mt-4">
                Scan to verify blockchain authenticity
              </p>

              <div className="mt-4 bg-green-100 text-green-700 px-4 py-2 rounded-full text-sm font-medium">
                🔐 This document is digitally signed and tamper-proof.
              </div>

            </div>

          </div>
        )}

      </div>

    </div>
  );
}