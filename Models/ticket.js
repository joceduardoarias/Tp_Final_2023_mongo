const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const ticketSchema = new Schema({
    ticketId: { type: String, required: true, unique: true },
    clienteId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cliente', required: true },
    tipo: { type: String, required: true, enum: ['desperfecto', 'cambio de plan', 'dar de baja', 'dar de alta'] },
    estado: { type: String, required: true, enum: ['abierto', 'cerrado', 'en espera'] },
    historial: [
        {
            fecha: { type: Date, default: Date.now },
            detalle: String,
            departamento: String,
            empleadoId: { type: mongoose.Schema.Types.ObjectId, ref: 'Empleado' }
        }
    ],
    soluciones: [
        {
            fecha: { type: Date, default: Date.now },
            descripcion: String,
            exitosa: Boolean
        }
    ],
    ubicacion: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: {
            type: [Number], // formato [longitud, latitud]
            index: '2dsphere'
        }
    }
});

// Crear índice geoespacial para la ubicación
ticketSchema.index({ ubicacion: '2dsphere' });

module.exports = mongoose.model('Ticket', ticketSchema);
