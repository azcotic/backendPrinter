const mongoose = require('mongoose');

const fiscalPrinterSchema = new mongoose.Schema({
  model: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  firmwareVersion: { type: String, required: true },
});

module.exports = mongoose.model('FiscalPrinter', fiscalPrinterSchema);