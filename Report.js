const mongoose = require("mongoose");

const reportSchema = new mongoose.Schema({

  caseId: String,
  summary: String,
  reporter: String,

  status: {
    type: String,
    default: "Draft"
  },

  createdAt: {
    type: Date,
    default: Date.now
  }

});

module.exports = mongoose.model("Report", reportSchema);