const express = require('express');
const router = express.Router();
const User = require('../model/user');

router.get('/', (req, res) => {
    res.render('users/users');
});

router.get('/obtener', async (req, res) => {
    const users = await User.find();
    res.json(users);
});

router.delete('/delete/:id', async (req, res) => {
    const { id } = req.params;
    await User.findByIdAndDelete(id);
    res.json({message: 'Usuario eliminado de forma correcta'});
});

router.get('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
});

router.post('/editar/:id', async (req, res) => {
    const { nombre, apellido, email, rol } = req.body;
    await User.findByIdAndUpdate({_id: req.params.id}, { nombre, apellido, email, rol });
    res.json({message: 'Usuario actualizado de forma correcta'});
});

module.exports = router;