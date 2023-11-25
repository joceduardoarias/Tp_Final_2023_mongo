const express = require('express');
const router = express.Router();
const ticketController = require('../Controllers/ticketController');

// Endpoint para consultar todos los tickets
router.get('/todos', ticketController.consultarTodosLosTickets);

// Endpoint para buscar tickets por estado 'abierto'
router.get('/estado/abierto', ticketController.consultarTicketsAbiertos);

// Endpoint para buscar tickets de un cliente específico
router.get('/cliente/:clienteId', ticketController.consultarTicketsDeCliente);

// Endpoint para buscar tickets de un tipo específico

router.get('/tipo/:tipo', ticketController.consultarTicketsPorTipo);

// Endpoint para contar tickets por estado
router.get('/conteo/estado', ticketController.contarTicketsPorEstado);

// Endpoint para buscar tickets con historial actualizado después de una fecha específica
router.get('/historial/desde', ticketController.consultarTicketsPorFechaHistorial);

// Endpoint para buscar tickets dentro de una ubicación geográfica específica
router.get('/ubicacion', ticketController.consultarTicketsPorUbicacion);

// Endpoint para buscar tickets sin soluciones
router.get('/sin-soluciones', ticketController.consultarTicketsSinSoluciones);

// Endpoint para buscar tickets con más de 3 entradas en historial
router.get('/historial/extenso', ticketController.consultarTicketsConHistorialExtenso);

// Endpoint para buscar tickets con historial de un departamento específico
router.get('/departamento/:departamento', ticketController.consultarTicketsPorDepartamento);

// Endpoint para buscar tickets con al menos una solución exitosa
router.get('/soluciones/exitosas', ticketController.consultarTicketsConSolucionExitosa);

// Endpoint para listar todos los tipos únicos de tickets
router.get('/tipos', ticketController.listarTiposDeTickets);

// Endpoint para buscar tickets con historial actualizado por un empleado específico
router.get('/empleado/:empleadoId', ticketController.consultarTicketsPorEmpleado);

// Endpoint para agregar y contar tickets por tipo
router.get('/conteo/tipo', ticketController.contarTicketsPorTipo);

// Endpoint para buscar tickets donde estado es 'abierto' y tipo es 'desperfecto'
router.get('/abierto/desperfecto', ticketController.consultarTicketsAbiertosDesperfecto);

module.exports = router;

