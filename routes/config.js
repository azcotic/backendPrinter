const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const FiscalPrinter = require('../models/FiscalPrinter');
const configModel = require('../models/config');

//GET Return the version of the firmware /firmwareVersion
router.get('/firmwareVersion', auth, async (req, res) => {
  //Get the config version from the configModel
  try {
    const resConfig = await configModel.findOne();
    console.log(resConfig)
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