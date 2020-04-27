const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const generate = require('generate-password');

const { Schema } = mongoose;

const userSchema = new Schema({
    nombre: String,
    apellido: String,
    email: { 
        type: String,
        unique: true
    },
    password: String,
    rol: {
        type: String,
        enum: ['cliente', 'operador', 'administrador'],
        default: 'cliente'
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

module.exports = mongoose.model('user', userSchema);