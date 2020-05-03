const { Schema, model } = require('mongoose');
const validate = require('mongoose-validator');

const patenteValidator = [
    validate({
        validator: 'matches',
        arguments: /^[a-z]{2}\d{3}[a-z]{2}$/gi,
        message: 'Patente con formato no valido'
    }),
    validate({
        validator: 'isAlphanumeric',
        passIfEmpty: false,
        message: 'Solo caracteres alfanumericos',
    })
]

const automovilSchema = new Schema({
    patente: {
        type: String,
        required: [true, 'Campo Obligatorio'],
        validate: patenteValidator
    },
    pasajeros: {
        type: Number,
        required: [true, 'Campo Obligatorio'],
        min: [2, 'Pocos pasajeros'],
        max: [7, 'Demasiados pasajeros']
    },
    puertas: {
        type: Number,
        required: [true, 'Campo Obligatorio'],
        min: [2, 'Pocas puertas'],
        max: [5, 'Demasiados puertas']
    },
    precio: {
        type: Number,
        required: [true, 'Campo requerido'],
        min: [0, 'Solo Valor positivo'],
        max: [1000000, 'Valor Exagerado']
    },
    transmicion: {
        type: String,
        enum: {
            values: ['manual', 'automatica'],
            message: 'Valor invalido'
        },
        required: [true, 'Campo requerido']
    },
    descripcion: {
        type: String,
        required: [true, 'Campo requerido'],
        maxlength:[50,"Descripcion muy larga, maximo 50 caracteres"]
    },
    modelo: {
        type: String,
        required: [true, 'Campo requerido'],
        maxlength:[15,"Modelo muy largo maximo 15 caracteres"]
    },
    marca: {
        type: String,
        enum: {
            values: ['ford', 'fiat', 'volkswagen', 'chevrolet'],
            message: 'Valor no valido'
        },
        required: [true, 'Campo requerido']
    },
    imagen: {
        type: String,
        default: 'sinimagen.png'
    },
    tecnico: {
        type: Boolean,
        default: false
    }
});

module.exports = model('automovil', automovilSchema);