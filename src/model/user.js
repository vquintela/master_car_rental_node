const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

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

module.exports = mongoose.model('user', userSchema);