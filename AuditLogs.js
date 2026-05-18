import { useState, useEffect } from "react";

export default function AuditLogs() {

  const [logs, setLogs] = useState([]);

  useEffect(() => {

    fetch("http://localhost:5000/api/AuditLog")
      .then(res => res.json())
      .then(data => setLogs(data))
      .catch(err => console.error(err));

  }, []);

  return (

    <div className="dashboard-bg text-gray-800 p-8">

      <div className="max-w-6xl mx-auto">

        <h1 className="text-3xl font-bold mb-8">
          System Audit Logs
        </h1>

        <div className="bg-white rounded-xl shadow p-6">

          <table className="w-full text-left">

            <thead>
              <tr className="border-b">
                <th className="p-3">User</th>
                <th className="p-3">Role</th>
                <th className="p-3">Action</th>
                <th className="p-3">Time</th>
              </tr>
            </thead>

           <tbody>

{logs.length === 0 ? (

<tr>
<td colSpan="4" className="text-center p-6 text-gray-500">
No audit logs found
</td>
</tr>

) : (

logs.map((log) => (

<tr key={log._id} className="border-b hover:bg-gray-50">

<td className="p-3">{log.user}</td>
<td className="p-3">{log.role}</td>
<td className="p-3">{log.action}</td>
<td className="p-3">
{new Date(log.createdAt).toLocaleString()}
</td>

</tr>

))

)}

</tbody>

          </table>

        </div>

      </div>

    </div>

  );

}