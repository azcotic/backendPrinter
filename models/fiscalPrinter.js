const mongoose = require('mongoose');

const fiscalPrinterSchema = new mongoose.Schema({
  model: { type: String, required: true },
  serialNumber: { type: String, required: true, unique: true },
  modelo: {
    type: String,
    required: true
  },
  clientId: { type: mongoose.Schema.Types.ObjectId, ref: 'Client' },
  firmwareVersion: { type: String, required: true },
  sucursal: { type: mongoose.Schema.Types.ObjectId, ref: 'Sucursal' },
  dateInstallation: {
    type: Date,
    required: true
  },
  lastRevision: {
    type: Date,
    required: false
  },
  status: {
    type: String,
    required: true,
    enum: ['activo', 'inactivo', 'mantenimiento']
  },
  modifiedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: false
  },
  dateModified: {
    type: Date,
    default: Date.now
  },
  dateCreated: {
    type: Date,
    default: Date.now
  }
});



module.exports = mongoose.model('FiscalPrinter', fiscalPrinterSchema);