const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Client = require('../models/client');

// Create a new client
router.post('/', auth, async (req, res) => {
  try {
    const { rif, nombreFiscal, direccion, sucursales, telefono, email, contactoPrincipal } = req.body;
    const client = new Client({ 
      rif, 
      nombreFiscal, 
      direccion, 
      sucursales, 
      telefono, 
      email, 
      contactoPrincipal 
    });
    await client.save();
    res.status(201).json({code:1, message: 'Client created', data:client });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({code:0, message: 'Server error' });
  }
});

// Get all clients
router.get('/', auth, async (req, res) => {
  try {
    const clients = await Client.find();
    res.json({code:1, data:clients });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({code:0, message: 'Server error' });
  }
});

// Get a specific client
router.get('/:id', auth, async (req, res) => {
  try {
    let idClient = req.params.id;
    let client = {};
    if (idClient.match(/^[0-9a-fA-F]{24}$/)) {
      client = await Client.findById(req.params.id);
    } else {
      client = await Client.findOne({rif: req.params.id});
    }
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    res.json({code:1, data:client });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({code:0, message: 'Server error' });
  }
});

// Update a client
router.put('/:id', auth, async (req, res) => {
  try {
    const { rif, nombreFiscal, direccion, sucursales, telefono, email, contactoPrincipal } = req.body;
    let client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    
    client.rif = rif;
    client.nombreFiscal = nombreFiscal;
    client.direccion = direccion;
    client.sucursales = sucursales;
    client.telefono = telefono;
    client.email = email;
    client.contactoPrincipal = contactoPrincipal;

    await client.save();
    res.json({code:1, data:client });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({code:0, message: 'Server error' });
  }
});

// Delete a client
router.delete('/:id', auth, async (req, res) => {
  try {
    const client = await Client.findById(req.params.id);
    if (!client) {
      return res.status(404).json({ message: 'Client not found' });
    }
    await Client.deleteOne({ _id: req.params.id });
    res.json({ code:1, message: 'Client removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send({code:0, message: 'Server error' });
  }
});

module.exports = router;