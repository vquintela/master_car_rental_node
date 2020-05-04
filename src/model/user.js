const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const generate = require('generate-password');
const validate = require('mongoose-validator');

const { Schema } = mongoose;

const emailValidator = [
    validate({
        validator: 'matches',
        arguments: /\w+@\w+\.+[a-z]/gi,
        message: 'Email con formato no valido o en uso'
    })
]

const userSchema = new Schema({
    nombre: {
        type: String,
        required: [true, 'Campo obligatorio'],
        maxlength: [15,"Nombre muy largo maximo 15 caracteres"]
    },
    apellido: {
        type: String,
        required: [true, 'Campo obligatorio'],
        maxlength: [15,"Apellido muy largo maximo 15 caracteres"]
    },
    email: { 
        type: String,
        unique: [true, 'Email en uso elija otro'],
        required: [true, 'Campo Obligatorio'],
        validate: emailValidator
    },
    password: {
        type: String,
        required: [true, 'Campo Obligatorio']
    },
    rol: {
        type: String,
        enum: ['cliente', 'operador', 'administrador'],
        default: 'cliente',
        required: [true, 'Campo Obligatorio'],
    },
    numAut: String,
    state: {
        type: Boolean,
        default: false,
        required: true
    },
    img: {
        type: String,
        default: 'avatar.jpg',
        required: true
    }
});

userSchema.methods.encryptPassword = async (password) => {
    const salt = await bcrypt.genSalt(10);
    const hash = await bcrypt.hash(password, salt);
    return hash;
};

userSchema.methods.comparePassword = async (password, userPassword) => {
    return await bcrypt.compare(password, userPassword);
};

userSchema.methods.genPass = () => {
    return generate.generate({
        length: 10,
        numbers: true
    })
}

userSchema.methods.validatePass = (password) => {
    const expReg = /^(?=\w*\d)(?=\w*[A-Z])(?=\w*[a-z])\S{8,16}$/g;
    return expReg.test(password)
    
}

module.exports = mongoose.model('user', userSchema);