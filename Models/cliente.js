const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const clienteSchema = new Schema({
    clienteId: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    planActual: {
        tipoPlan: String,
        canales: [String],
        fechaCompra: Date
    },
    historialPlanes: [{
        tipoPlan: String,
        canales: [String],
        fechaCompra: Date
    }],
    tickets: [{ type: String, required: true, unique: true }],
    ubicacion: {
        type: { type: String, enum: ['Point'], default: 'Point' },
        coordinates: {
            type: [Number], // [longitud, latitud]
            index: '2dsphere'
        }
    },
    esEmpleado: Boolean,
    localidad: {
        codigoPostal: String,
        descripcion: String
    }
});

// Para buscar por geolocalización
clienteSchema.index({ ubicacion: '2dsphere' });

module.exports = mongoose.model('Cliente', clienteSchema);
