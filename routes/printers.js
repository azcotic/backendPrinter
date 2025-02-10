const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const FiscalPrinter = require('../models/FiscalPrinter');
const configModel = require('../models/config');
// Create a new fiscal printer
router.post('/', auth, async (req, res) => {
  try {
    const { model, serialNumber, firmwareVersion } = req.body;
    const printer = new FiscalPrinter({ model, serialNumber, firmwareVersion });
    await printer.save();
    res.status(201).json({code:1, message: 'Printer created', data:printer });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({code:0, message: 'Server error' });
  }
});

// Get all fiscal printers
router.get('/', auth, async (req, res) => {
  try {
    const printers = await FiscalPrinter.find();
    res.json({code:1, data:printers });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({code:0, message: 'Server error' });
  }
});

// Get a specific fiscal printer
router.get('/:id', auth, async (req, res) => {
  try {
    let idPrinter = req.params.id;
    let printer = {};
    if (idPrinter.match(/^[0-9a-fA-F]{24}$/)) {
      printer = await FiscalPrinter.findById(req.params.id);
    }else{
      printer = await FiscalPrinter.findOne({serialNumber:req.params.id})
    }
    if (!printer) {
      return res.status(404).json({ message: 'Printer not found' });
    }
    res.json({code:1, data:printer });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({code:0, message: 'Server error' });
  }
});

// Update a fiscal printer
router.put('/:id', auth, async (req, res) => {
  try {
    const { model, serialNumber, firmwareVersion } = req.body;
    let printer = await FiscalPrinter.findById(req.params.id);
    if (!printer) {
      return res.status(404).json({ message: 'Printer not found' });
    }
    printer.model = model;
    printer.serialNumber = serialNumber;
    printer.firmwareVersion = firmwareVersion;
    await printer.save();
    res.json({code:1, data:printer });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({code:0, message: 'Server error' });
  }
});

// Delete a fiscal printer
router.delete('/:id', auth, async (req, res) => {
  try {
    const printer = await FiscalPrinter.findById(req.params.id);
    console.log(printer)
    if (!printer) {
      return res.status(404).json({ message: 'Printer not found' });
    }
    await FiscalPrinter.deleteOne({ _id: req.params.id });
    res.json({ code:1, message: 'Printer removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({code:0,message: 'Server error' });
  }
});

//GET Return the version of the firmware /firmwareVersion
router.get('/firmwareVersion', auth, async (req, res) => {
  //Get the config version from the configModel
  try {
    const resConfig = await configModel.findOne().sort({ _id: -1 });
    if (!resConfig) {
      return res.status(404).json({ message: 'Config not found' });
    }
    res.json({code:1, data:resConfig.version });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({code:0, message: 'Server error' });
  }
})

module.exports = router;