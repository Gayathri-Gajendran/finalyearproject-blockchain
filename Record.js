const mongoose = require("mongoose");

const recordSchema = new mongoose.Schema({
    blockIndex: {
    type: Number,
  },

  previousHash: {
    type: String,
  },
  hash: {
    type: String,
    required: true,
  },

  caseId: {
    type: String,
    required: true,
  },

  patientName: {
    type: String,
    required: true,
  },

  injuryType: {
    type: String,
    required: true,
  },
  age: {
  type: Number,
},

phone: {
  type: String,
},

bloodGroup: {
  type: String,
},

  date: {
    type: String,
    required: true,
  },

  status: {
    type: String,
    required: true,
  },

  description: {
    type: String,
    required: true,
  },

  filePath: {
    type: String,
    required: true,
  },

  uploadedBy: {
    type: String,
    required: true,
  },
  reportSummary: {
  type: String
},

reportStatus: {
  type: String,
  default: "Draft"
},
originalData: {
  type: Object
},
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

recordSchema.index({
  caseId: "text",
  patientName: "text",
  injuryType: "text",
  uploadedBy: "text",
  status: "text",
  description: "text",
});

module.exports = mongoose.model("Record", recordSchema);