const mongoose = require('mongoose');

const configSchema = new mongoose.Schema({
  version: { type: String, required: true },
});

module.exports = mongoose.model('Config', configSchema);