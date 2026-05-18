import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import { jsPDF } from "jspdf";

export default function ReporterDashboard() {

  const navigate = useNavigate();
  const [reports, setReports] = useState([]);

  const handleLogout = () => navigate("/");
  const handleBack = () => navigate(-1);

  useEffect(() => {

    fetch("http://localhost:5000/api/records")
      .then(res => res.json())
      .then(data => setReports(data))
      .catch(err => console.error(err));

  }, []);

  // PDF DOWNLOAD
  const downloadReport = (record) => {

    const doc = new jsPDF();

    doc.setFontSize(18);
    doc.text("Medico-Legal Report", 20, 20);

    doc.setFontSize(12);

    doc.text(`Case ID: ${record.caseId}`, 20, 40);
    doc.text(`Patient Name: ${record.patientName}`, 20, 50);
    doc.text(`Injury Type: ${record.injuryType}`, 20, 60);
    doc.text(`Doctor: ${record.uploadedBy}`, 20, 70);
    doc.text(`Date: ${record.date}`, 20, 80);

    doc.text("Blockchain Secured Medical Evidence", 20, 100);

    doc.save(`${record.caseId}_report.pdf`);
  };

  // SUBMIT REPORT
  const submitReport = async (caseId) => {

    try {

      await fetch("http://localhost:5000/api/records/generate-report", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          caseId: caseId,
          summary: "Official medico-legal summary submitted by reporter."
        })
      });

      alert("Report submitted successfully");

      window.location.reload();

    } catch (err) {

      console.error(err);

    }

  };

  const totalReports = reports.length;
  const submittedReports = reports.filter(r => r.reportStatus === "Submitted").length;
  const pendingReports = reports.filter(r => !r.reportStatus).length;

  return (

    <div className="dashboard-bg text-gray-800 p-8">

      {/* Top Buttons */}
      <div className="flex justify-between mb-8">

        <button
          onClick={handleBack}
          className="bg-gray-200 px-4 py-2 rounded-lg"
        >
          🔙 Back
        </button>

        <button
          onClick={handleLogout}
          className="bg-red-500 text-white px-4 py-2 rounded-lg"
        >
          Logout
        </button>

      </div>

      {/* Header */}
      <div className="mb-10">

        <h1 className="text-3xl font-bold">
          Medical Reporter Panel
        </h1>

        <p className="text-gray-600">
          Generate and manage medico-legal reports
        </p>

      </div>

      {/* Summary */}
      <div className="grid grid-cols-3 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Total Reports</h3>
          <p className="text-3xl font-bold text-blue-600">
            {totalReports}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Submitted</h3>
          <p className="text-3xl font-bold text-green-600">
            {submittedReports}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Pending</h3>
          <p className="text-3xl font-bold text-yellow-600">
            {pendingReports}
          </p>
        </div>

      </div>

      {/* Table */}
      <div className="bg-white p-6 rounded-xl shadow">

        <h2 className="text-xl font-semibold mb-6">
          Report Management
        </h2>

        <table className="w-full text-left">

          <thead>
            <tr className="border-b">
              <th className="p-3">Case ID</th>
              <th className="p-3">Patient</th>
              <th className="p-3">Report Status</th>
              <th className="p-3">Actions</th>
            </tr>
          </thead>

          <tbody>

            {reports.map((r) => (

              <tr key={r._id} className="border-b hover:bg-gray-50">

                <td className="p-3">{r.caseId}</td>

                <td className="p-3">{r.patientName}</td>

                <td className="p-3">

                  <span
                    className={
                      r.reportStatus === "Submitted"
                        ? "text-green-600 font-semibold"
                        : "text-yellow-600 font-semibold"
                    }
                  >
                    {r.reportStatus || "Pending"}
                  </span>

                </td>

                <td className="p-3 flex gap-2">

                  <button
                    onClick={() => navigate(`/generate-report?caseId=${r.caseId}`)}
                    className="bg-indigo-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>

                <button
  onClick={() => submitReport(r.caseId)}
  disabled={r.reportStatus === "Submitted"}
  className="bg-green-600 text-white px-3 py-1 rounded disabled:opacity-40"
>
  {r.reportStatus === "Submitted" ? "Submitted" : "Submit"}
</button>

                  <button
                    onClick={() => downloadReport(r)}
                    className="bg-gray-600 text-white px-3 py-1 rounded"
                  >
                    Download
                  </button>

                </td>

              </tr>

            ))}

          </tbody>

        </table>

      </div>

      {/* Quick Actions */}
      <div className="grid grid-cols-2 gap-6 mt-10">

        <div
          onClick={() => navigate("/generate-report")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow"
        >
          <h3 className="text-xl font-semibold text-purple-700">
            Generate New Report
          </h3>
          <p>Create medico-legal documentation</p>
        </div>

        <div
          onClick={() => navigate("/verify")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow"
        >
          <h3 className="text-xl font-semibold text-green-700">
            Verify Blockchain
          </h3>
          <p>Verify evidence integrity</p>
        </div>

      </div>

    </div>

  );

}