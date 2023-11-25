const mongoose = require('mongoose');
const Ticket = require('../Models/ticket'); // Asegúrate de que la ruta al modelo 'ticket' sea correcta

const ticketController = {
    // 1. Consulta todos los tickets
    consultarTodosLosTickets: async (req, res) => {
        try {
            const tickets = await Ticket.find();
            res.json(tickets);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // 2. Busca tickets por estado 'abierto'
    consultarTicketsAbiertos: async (req, res) => {
        try {
            const tickets = await Ticket.find({ estado: 'abierto' });
            res.json(tickets);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // 3. Busca tickets de un cliente específico
    consultarTicketsDeCliente: async (req, res) => {
        try {
            const clienteId = req.params.clienteId;
            const tickets = await Ticket.find({ clienteId: mongoose.Types.ObjectId(clienteId) });
            res.json(tickets);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // 4. Busca tickets de un tipo específico
    consultarTicketsPorTipo: async (req, res) => {
        try {
            const tipo = req.params.tipo;
            const tickets = await Ticket.find({ tipo });
            res.json(tickets);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // 5. Cuenta tickets por estado
    contarTicketsPorEstado: async (req, res) => {
        try {
            const conteo = await Ticket.aggregate([{ $group: { _id: '$estado', count: { $sum: 1 } } }]);
            res.json(conteo);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // 6. Busca tickets con historial actualizado después de una fecha específica
    consultarTicketsPorFechaHistorial: async (req, res) => {
        try {
            const fecha = new Date(req.query.fecha);
            const tickets = await Ticket.find({ 'historial.fecha': { $gt: fecha } });
            res.json(tickets);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // 7. Busca tickets dentro de una ubicación geográfica específica
    consultarTicketsPorUbicacion: async (req, res) => {
        try {
            const { longitud, latitud, maxDistance } = req.query;
            const tickets = await Ticket.find({
                ubicacion: {
                    $nearSphere: {
                        $geometry: { type: 'Point', coordinates: [parseFloat(longitud), parseFloat(latitud)] },
                        $maxDistance: parseInt(maxDistance)
                    }
                }
            });
            res.json(tickets);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // 8. Busca tickets sin soluciones
    consultarTicketsSinSoluciones: async (req, res) => {
        try {
            const tickets = await Ticket.find({ soluciones: { $size: 0 } });
            res.json(tickets);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // 9. Busca tickets con más de 3 entradas en historial
    consultarTicketsConHistorialExtenso: async (req, res) => {
        try {
            const tickets = await Ticket.find({ 'historial.3': { $exists: true } });
            res.json(tickets);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // 10. Busca tickets con historial de un departamento específico
    consultarTicketsPorDepartamento: async (req, res) => {
        try {
            const departamento = req.params.departamento;
            const tickets = await Ticket.find({ 'historial.departamento': departamento });
            res.json(tickets);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // 11. Busca tickets con al menos una solución exitosa
    consultarTicketsConSolucionExitosa: async (req, res) => {
        try {
            const tickets = await Ticket.find({ 'soluciones.exitosa': true });
            res.json(tickets);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // 12. Lista todos los tipos únicos de tickets
    listarTiposDeTickets: async (req, res) => {
        try {
            const tipos = await Ticket.distinct('tipo');
            res.json(tipos);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // 13. Busca tickets con historial actualizado por un empleado específico
    consultarTicketsPorEmpleado: async (req, res) => {
        try {
            const empleadoId = req.params.empleadoId;
            const tickets = await Ticket.find({ 'historial.empleadoId': mongoose.Types.ObjectId(empleadoId) });
            res.json(tickets);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // 14. Agrega y cuenta tickets por tipo
    contarTicketsPorTipo: async (req, res) => {
        try {
            const conteo = await Ticket.aggregate([{ $group: { _id: '$tipo', count: { $sum: 1 } } }]);
            res.json(conteo);
        } catch (error) {
            res.status(500).send(error.message);
        }
    },

    // 15. Busca tickets donde estado es 'abierto' y tipo es 'desperfecto'
    consultarTicketsAbiertosDesperfecto: async (req, res) => {
        try {
            const tickets = await Ticket.find({ estado: 'abierto', tipo: 'desperfecto' });
            res.json(tickets);
        } catch (error) {
            res.status(500).send(error.message);
        }
    }
};

module.exports = ticketController;
