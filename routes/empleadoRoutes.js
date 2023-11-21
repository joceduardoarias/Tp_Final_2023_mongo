const express = require('express');
const router = express.Router();
const Empleado = require('../Models/empleado');

// Obtener todos los empleados
router.get('/', async (req, res) => {
    try {
        const empleados = await Empleado.find();
        res.json(empleados);
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Obtener un empleado específico por ID
router.get('/:id', getEmpleado, (req, res) => {
    res.json(res.empleado);
});

// Crear un nuevo empleado
router.post('/', async (req, res) => {
    const empleado = new Empleado({
        empleadoId: req.body.empleadoId,
        nombre: req.body.nombre,
        departamento: req.body.departamento,
        // otros campos...
    });

    try {
        const nuevoEmpleado = await empleado.save();
        res.status(201).json(nuevoEmpleado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Actualizar un empleado
router.patch('/:id', getEmpleado, async (req, res) => {
    if (req.body.nombre != null) {
        res.empleado.nombre = req.body.nombre;
    }
    // Actualizar otros campos según sea necesario...

    try {
        const empleadoActualizado = await res.empleado.save();
        res.json(empleadoActualizado);
    } catch (err) {
        res.status(400).json({ message: err.message });
    }
});

// Eliminar un empleado
router.delete('/:id', getEmpleado, async (req, res) => {
    try {
        await res.empleado.remove();
        res.json({ message: 'Empleado Eliminado' });
    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

// Middleware para obtener un empleado por ID
async function getEmpleado(req, res, next) {
    let empleado;
    try {
        empleado = await Empleado.findById(req.params.id);
        if (empleado == null) {
            return res.status(404).json({ message: 'No se puede encontrar el empleado' });
        }
    } catch (err) {
        return res.status(500).json({ message: err.message });
    }

    res.empleado = empleado;
    next();
}

module.exports = router;
