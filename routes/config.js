const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const configModel = require('../models/config');
const path = require('path');
const fs = require('fs');

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

router.get('/download', auth, async (req, res) => {
  try {
    const filePath = path.join(__dirname, '../firmware.bin'); // Ruta del archivo que quieres devolver
    const stat = fs.statSync(filePath);

    res.writeHead(200, {
      'Content-Type': 'application/octet-stream', // Tipo de contenido
      'Content-Length': stat.size, // Longitud del contenido
      'Content-Disposition': 'attachment; filename=firmware.bin' // Disposición del archivo
    });

    const readStream = fs.createReadStream(filePath);
    readStream.pipe(res);
  } catch (err) {
    console.error(err.message);
    res.status(500).send({ code: 0, message: 'Server error' });
  }
});

module.exports = router;