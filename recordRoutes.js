const express = require("express");
const Record = require("../models/Record");
const upload = require("../config/multer");
const crypto = require("crypto");
const AuditLog = require("../models/AuditLog");

const router = express.Router();

// FINAL RECORD UPLOAD ROUTE
router.post("/upload", upload.single("document"), async (req, res) => {
  try {

   const {
  caseId,
  patientName,
  injuryType,
  uploadedBy,
  date,
  status,
  description,
  age,
  phone,
  bloodGroup
} = req.body;

   const filePath = req.file ? `uploads/${req.file.filename}` : "";
// Get last block
const lastRecord = await Record.findOne().sort({ blockIndex: -1 });

let blockIndex = 1;
let previousHash = "0";

if (lastRecord) {
  blockIndex = lastRecord.blockIndex + 1;
  previousHash = lastRecord.hash;
}
    // Generate blockchain hash
const recordData =
  blockIndex +
  previousHash +
  caseId +
  patientName +
  injuryType +
  age +
  phone +
  bloodGroup +
  uploadedBy +
  date +
  description +
  filePath;

    const hash = crypto
      .createHash("sha256")
      .update(recordData)
      .digest("hex");

const newRecord = new Record({
  blockIndex,
  previousHash,
  caseId,
  patientName,
  injuryType,
  age,
  phone,
  bloodGroup,
  uploadedBy,
  date,
  status,
  description,
  filePath,

originalData: {
  caseId,
  patientName,
  injuryType,
  age,
  phone,
  bloodGroup,
  uploadedBy,
  date,
  status,
  description,
  filePath
},
  hash
});

    await newRecord.save();

    res.status(201).json({
      message: "Medico-legal record saved successfully",
      record: newRecord
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
// GET ALL MEDICO-LEGAL RECORDS
router.get("/", async (req, res) => {
  try {
    const records = await Record.find().sort({ createdAt: -1 });
    res.status(200).json(records);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// AI-BASED SMART SEARCH
router.get("/search", async (req, res) => {
  try {
    const { q } = req.query;

    if (!q) {
      return res.status(400).json({ message: "Search query is required" });
    }

    const results = await Record.find({
      $text: { $search: q },
    });

    res.status(200).json(results);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// 🔍 VERIFY RECORD INTEGRITY (BLOCKCHAIN CHECK)
router.get("/verify/:caseId", async (req, res) => {
  try {

    const record = await Record.findOne({ caseId: req.params.caseId });

    if (!record) {
      return res.status(404).json({
        message: "Record not found"
      });
    }

const recordData =
  record.blockIndex +
  record.previousHash +
  record.caseId +
  record.patientName +
  record.injuryType +
  record.age +
  record.phone +
  record.bloodGroup +
  record.uploadedBy +
  record.date +
  record.description +
  record.filePath;

const recalculatedHash = crypto
  .createHash("sha256")
  .update(recordData)
  .digest("hex");

// CHECK HASH
if (recalculatedHash === record.hash) {

  // CHECK PREVIOUS BLOCK LINK
  if (record.blockIndex > 1) {

    const previousBlock = await Record.findOne({
      blockIndex: record.blockIndex - 1
    });

    if (previousBlock && record.previousHash !== previousBlock.hash) {

      return res.json({
        status: "TAMPERED",
        message: "Previous block has been modified. Blockchain link broken."
      });

    }

  }

  return res.json({
    status: "SAFE",
    message: "Record is authentic and blockchain link is valid"
  });

} else {

  const changes = [];

if (!record.originalData) {
  return res.json({
    status: "TAMPERED",
    message: "Original data not found for comparison"
  });
}

  if (record.patientName !== record.originalData.patientName) {
    changes.push({
      field: "patientName",
      before: record.originalData.patientName,
      after: record.patientName
    });
  }

  if (record.injuryType !== record.originalData.injuryType) {
    changes.push({
      field: "injuryType",
      before: record.originalData.injuryType,
      after: record.injuryType
    });
  }
 if (String(record.age) !== String(record.originalData.age)) {
  changes.push({
    field: "age",
    before: record.originalData.age,
    after: record.age
  });
}

if (String(record.phone) !== String(record.originalData.phone)){
  changes.push({
    field: "phone",
    before: record.originalData.phone,
    after: record.phone
  });
}

if (String(record.bloodGroup) !== String(record.originalData.bloodGroup)){
  changes.push({
    field: "bloodGroup",
    before: record.originalData.bloodGroup,
    after: record.bloodGroup
  });
}


  if (record.description !== record.originalData.description) {
    changes.push({
      field: "description",
      before: record.originalData.description,
      after: record.description
    });
  }

  return res.json({
    status: "TAMPERED",
    message: "Record has been modified!",
    changes
  });
}

  } catch (error) {
    res.status(500).json({
      message: error.message
    });
  }
});
router.get("/record/:id", async (req, res) => {
  try {

    const record = await Record.findById(req.params.id);

    if (!record) {
      return res.status(404).json({ message: "Record not found" });
    }

    res.json(record);

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});
router.get("/stats/dashboard", async (req, res) => {

  try {

    const totalRecords = await Record.countDocuments();

   const approvedCases = await Record.countDocuments({
  status: "Approved"
});

    // CHECK FOR TAMPERED RECORDS
    const records = await Record.find();

    let tamperAlerts = 0;

    for (const record of records) {

      const recordData =
        record.blockIndex +
        record.previousHash +
        record.caseId +
        record.patientName +
        record.injuryType +
        record.age +
        record.phone +
        record.bloodGroup +
        record.uploadedBy +
        record.date +
        record.description +
        record.filePath;

      const recalculatedHash = crypto
        .createHash("sha256")
        .update(recordData)
        .digest("hex");

      if (recalculatedHash !== record.hash) {
        tamperAlerts++;
      }

    }

   res.json({
  totalRecords,
  approvedCases,
  tamperAlerts
});

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
router.post("/generate-report", async (req,res)=>{

  try{

    const { caseId, summary } = req.body;

    const record = await Record.findOne({caseId});

    if(!record){
      return res.status(404).json({message:"Record not found"});
    }

    record.reportSummary = summary;
    record.reportStatus = "Submitted";

    await record.save();

    res.json(record);

  }catch(error){
    res.status(500).json({message:error.message});
  }

});
// CHECK FULL BLOCKCHAIN INTEGRITY
router.get("/check-chain", async (req, res) => {

  try {

    const records = await Record.find().sort({ blockIndex: 1 });

    const tamperedBlocks = [];
    let chainBroken = false;
for (let i = 0; i < records.length; i++) {

  const block = records[i];

  // If chain already broken from previous block
  if (chainBroken) {

    tamperedBlocks.push({
      blockIndex: block.blockIndex,
      caseId: block.caseId,
      issue: "Chain invalid due to earlier modification"
    });

    continue;
  }

  // Recalculate current block hash
const recordData =
  block.blockIndex +
  block.previousHash +
  block.caseId +
  block.patientName +
  block.injuryType +
  block.age +
  block.phone +
  block.bloodGroup +
  block.uploadedBy +
  block.date +
  block.description +
  block.filePath;

  const recalculatedHash = crypto
    .createHash("sha256")
    .update(recordData)
    .digest("hex");

  // Check if this block is modified
  if (recalculatedHash !== block.hash) {

    tamperedBlocks.push({
      blockIndex: block.blockIndex,
      caseId: block.caseId,
      issue: "Original block modified"
    });

    chainBroken = true;
    continue;
  }

  // Check previous block link
  if (i > 0) {

    const previousBlock = records[i - 1];

const previousData =
  previousBlock.blockIndex +
  previousBlock.previousHash +
  previousBlock.caseId +
  previousBlock.patientName +
  previousBlock.injuryType +
  previousBlock.age +
  previousBlock.phone +
  previousBlock.bloodGroup +
  previousBlock.uploadedBy +
  previousBlock.date +
  previousBlock.description +
  previousBlock.filePath;
    const recalculatedPreviousHash = crypto
      .createHash("sha256")
      .update(previousData)
      .digest("hex");

    if (block.previousHash !== recalculatedPreviousHash) {

      tamperedBlocks.push({
        blockIndex: block.blockIndex,
        caseId: block.caseId,
        issue: "Chain broken due to previous block modification"
      });

      chainBroken = true;
    }

  }

}

    if (tamperedBlocks.length === 0) {

      return res.json({
        status: "SAFE",
        message: "Blockchain is valid"
      });

    }

    res.json({
      status: "TAMPERED",
      tamperedBlocks
    });

  } catch (error) {

    res.status(500).json({
      message: error.message
    });

  }

});
// GET RECORDS FOR A SPECIFIC PATIENT
router.get("/patient/:patientName", async (req, res) => {

  try {

    const patientName = req.params.patientName;

    const records = await Record.find({ patientName }).sort({ createdAt: -1 });

    res.json(records);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});

router.put("/update-status/:caseId", async (req, res) => {

  try {

    const { status } = req.body;

    const record = await Record.findOneAndUpdate(
      { caseId: req.params.caseId },
      { status: status },
      { new: true }
    );

    res.json(record);

  } catch (error) {

    res.status(500).json({ message: error.message });

  }

});
const path = require("path");

// DOWNLOAD FILE ROUTE
router.get("/download/:filename", (req, res) => {

  const filePath = path.join(__dirname, "..", "uploads", req.params.filename);

  res.download(filePath, req.params.filename, (err) => {
    if (err) {
      res.status(404).send("File not found");
    }
  });

});
router.get("/audit-logs", async (req,res)=>{

 const logs = await AuditLog.find().sort({createdAt:-1});

 res.json(logs);

});
module.exports = router;