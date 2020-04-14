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

userSchema.methods.comparePassword = async (password) => {
    try {
        return await bcrypt.compare(password, this.password);
    } catch (e) {
        console.log(e);
    }
};

module.exports = mongoose.model('user', userSchema);