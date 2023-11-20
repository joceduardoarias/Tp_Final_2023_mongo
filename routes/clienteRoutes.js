const express = require('express');
const router = express.Router();
const Cliente = require('../models/cliente');

// Obtener todos los clientes
router.get('/', async (req, res) => {
    try {
        const clientes = await Cliente.find();
        res.json(clientes);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener un cliente específico por ID
router.get('/:id', getCliente, (req, res) => {
    res.json(res.cliente);
});

router.post('/', async (req, res) => {
    const cliente = new Cliente({
        clienteId: req.body.clienteId,
        nombre: req.body.nombre,
        planActual: req.body.planActual,
        historialPlanes: req.body.historialPlanes,
        tickets: req.body.tickets,
        ubicacion: req.body.ubicacion,
        esEmpleado: req.body.esEmpleado,
        localidad: req.body.localidad
    });

    try {
        const nuevoCliente = await cliente.save();
        res.status(201).json(nuevoCliente);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Actualizar un cliente
router.patch('/:id', getCliente, async (req, res) => {
    // Actualizar campos del cliente
    if (req.body.nombre != null) {
        res.cliente.nombre = req.body.nombre;
    }
    if (req.body.planActual != null) {
        res.cliente.planActual = req.body.planActual;
    }
    if (req.body.historialPlanes != null) {
        res.cliente.historialPlanes = req.body.historialPlanes;
    }
    if (req.body.ubicacion != null) {
        res.cliente.ubicacion = req.body.ubicacion;
    }
    if (req.body.esEmpleado != null) {
        res.cliente.esEmpleado = req.body.esEmpleado;
    }
    if (req.body.localidad != null) {
        res.cliente.localidad = req.body.localidad;
    }
    // Nota: los tickets no se suelen actualizar de esta manera

    try {
        const clienteActualizado = await res.cliente.save();
        res.json(clienteActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});


// Eliminar un cliente
router.delete('/:id', getCliente, async (req, res) => {
    try {
        await res.cliente.remove();
        res.json({ message: 'Cliente Eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware para obtener un cliente por ID
async function getCliente(req, res, next) {
    let cliente;
    try {
        cliente = await Cliente.findById(req.params.id);
        if (cliente == null) {
            return res.status(404).json({ message: 'No se puede encontrar el cliente' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.cliente = cliente;
    next();
}

module.exports = router;
