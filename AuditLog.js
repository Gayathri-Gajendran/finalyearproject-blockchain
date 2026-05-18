const mongoose = require("mongoose");

const auditLogSchema = new mongoose.Schema(
{
  user: String,
  role: String,
  action: String
},
{ timestamps: true }
);

module.exports = mongoose.model("AuditLog", auditLogSchema);