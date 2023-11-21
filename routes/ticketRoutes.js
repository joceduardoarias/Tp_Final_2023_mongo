const express = require('express');
const router = express.Router();
const Ticket = require('../Models/ticket');

// Endpoint para obtener todos los tickets
router.get('/', async (req, res) => {
  try {
    const tickets = await Ticket.find();
    res.json(tickets);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

// Endpoint para crear un ticket
router.post('/', async (req, res) => {
  const ticket = new Ticket({
    // asignar datos del ticket desde req.body
  });
  
  try {
    const newTicket = await ticket.save();
    res.status(201).json(newTicket);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Agrega endpoints adicionales según sea necesario...

module.exports = router;
