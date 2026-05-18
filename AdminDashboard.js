import { useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function AdminDashboard() {

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [records, setRecords] = useState([]);
  const [stats, setStats] = useState({});

  const handleLogout = () => navigate("/");
  const handleBack = () => navigate(-1);

  useEffect(() => {

    // Load users
    fetch("http://localhost:5000/api/auth/users")
      .then(res => res.json())
      .then(data => setUsers(data))
      .catch(err => console.error(err));

    // Load records
    fetch("http://localhost:5000/api/records")
      .then(res => res.json())
      .then(data => setRecords(data));

    // Load system stats
    fetch("http://localhost:5000/api/records/stats/dashboard")
      .then(res => res.json())
      .then(data => setStats(data));

  }, []);

  // BLOCK USER
  const blockUser = async (id) => {

    await fetch(`http://localhost:5000/api/auth/users/block/${id}`, {
      method: "PUT"
    });

    alert("User blocked");
    window.location.reload();

  };

  const totalUsers = users.length;
  const totalRecords = records.length;
  const tamperAlerts = stats.tamperAlerts || 0;

  return (

    <div className="dashboard-bg text-gray-800 p-8">

      {/* Top Buttons */}
      <div className="flex justify-between mb-8">

        <button
          onClick={handleBack}
          className="bg-gray-200 px-4 py-2 rounded-lg"
        >
          Back
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
          System Admin Panel
        </h1>

        <p className="text-gray-600">
          Monitor system security and manage users
        </p>

      </div>

      {/* Analytics */}
      <div className="grid grid-cols-4 gap-6 mb-10">

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Total Users</h3>
          <p className="text-3xl font-bold text-blue-600">
            {totalUsers}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Total Records</h3>
          <p className="text-3xl font-bold text-green-600">
            {totalRecords}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Approved Cases</h3>
          <p className="text-3xl font-bold text-purple-600">
            {stats.approvedCases || 0}
          </p>
        </div>

        <div className="bg-white p-6 rounded-xl shadow">
          <h3>Tamper Alerts</h3>
          <p className="text-3xl font-bold text-red-600">
            {tamperAlerts}
          </p>
        </div>

      </div>

      {/* USER MANAGEMENT */}
      <div className="bg-white p-6 rounded-xl shadow mb-10">

        <h2 className="text-xl font-semibold mb-6">
          User Management
        </h2>

        <table className="w-full text-left">

<thead>
<tr className="border-b">
<th className="p-3">Name</th>
<th className="p-3">Email</th>
<th className="p-3">Role</th>
<th className="p-3">Status</th>
<th className="p-3">Action</th>
</tr>
</thead>
<tbody>
{users.map((u) => (

<tr
 key={u._id}
 className={`border-b ${u.status === "Blocked" ? "bg-gray-200 opacity-60" : ""}`}
>

<td className="p-3">{u.name}</td>

<td className="p-3">{u.email}</td>

<td className="p-3">{u.role}</td>

<td className="p-3">
<span
className={
u.status === "Blocked"
? "text-red-600 font-semibold"
: "text-green-600 font-semibold"
}
>
{u.status || "Active"}
</span>
</td>

<td className="p-3">

<button
disabled={u.status === "Blocked"}
onClick={() => blockUser(u._id)}
className={`px-3 py-1 rounded text-white ${
u.status === "Blocked"
? "bg-gray-400 cursor-not-allowed"
: "bg-red-500 hover:bg-red-600"
}`}
>
{u.status === "Blocked" ? "Blocked" : "Block"}
</button>

</td>

</tr>

))}
</tbody>

        </table>

      </div>

      {/* SYSTEM CONTROL */}
      <div className="grid grid-cols-3 gap-6">

        <div
          onClick={() => navigate("/blockchain-verify")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow"
        >
          <h3 className="text-xl font-semibold text-green-700">
            Blockchain Monitor
          </h3>
          <p>Track evidence integrity</p>
        </div>

        <div
          onClick={() => navigate("/ai-search")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow"
        >
          <h3 className="text-xl font-semibold text-blue-700">
            AI Search Control
          </h3>
          <p>Search records using AI index</p>
        </div>

        <div
          onClick={() => navigate("/audit-logs")}
          className="cursor-pointer bg-white p-6 rounded-xl shadow"
        >
          <h3 className="text-xl font-semibold text-purple-700">
            Audit Logs
          </h3>
          <p>Track all system activities</p>
        </div>

      </div>

    </div>

  );

}