const { Schema, model } = require('mongoose');

const automovilSchema = new Schema({
    patente: {
        type: String,
        required: true
    },
    pasajeros: {
        type: String,
        required: true
    },
    puertas: {
        type: String,
        required: true
    },
    precio: {
        type: Number,
        required: true
    },
    transmicion: {
        type: String,
        enum: ['manual', 'automatica'],
        default: 'manual'
    },
    descripcion: {
        type: String,
        required: true
    },
    modelo: {
        type: String,
        required: true
    },
    marca: {
        type: String,
        enum: ['ford', 'fiat', 'volkswagen', 'chevrolet'],
        required: true
    },
    imagen: {
        type: String,
        default: 'sinimagen'
    },
    tecnico: {
        type: Boolean,
        default: false
    }
});

module.exports = model('automovil', automovilSchema);