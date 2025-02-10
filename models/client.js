
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const SucursalSchema = new Schema({
  id: {
    type: mongoose.Schema.Types.ObjectId,
    default: mongoose.Types.ObjectId
  },
  nombre: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  telefono: {
    type: String,
    required: false
  },
  estado: {
    type: String,
    required: true
  },
  ciudad: {
    type: String,
    required: true
  }
});

const ClientSchema = new Schema({
  rif: {
    type: String,
    required: true,
    unique: true
  },
  nombreFiscal: {
    type: String,
    required: true
  },
  direccion: {
    type: String,
    required: true
  },
  sucursales: [SucursalSchema],
  telefono: {
    type: String,
    required: false
  },
  email: {
    type: String,
    required: false
  },
  contactoPrincipal: {
    type: String,
    required: false
  }
});

const Client = mongoose.model('Client', ClientSchema);

module.exports = Client;
