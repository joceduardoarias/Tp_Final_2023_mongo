const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const empleadoSchema = new Schema({
    empleadoId: { type: String, required: true, unique: true },
    nombre: { type: String, required: true },
    departamento: String,
    ticketsAtendidos: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Ticket' }],
    localidad: {
        codigoPostal: String,
        descripcion: String
    }
});

module.exports = mongoose.model('Empleado', empleadoSchema);
