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
    res.json({message: 'Usuario eliminado de forma correcta', css: 'success', redirect: 'remove'});
});

router.get('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const user = await User.findById(id);
    res.json(user);
});

router.post('/editar/:id', async (req, res) => {
    const { nombre, apellido, email, rol } = req.body;
    await User.findByIdAndUpdate({_id: req.params.id}, { nombre, apellido, email, rol });
    res.json({message: 'Usuario actualizado de forma correcta', css: 'success', redirect: 'remove'});
});

router.put('/estado/:id', async (req, res) => {
    const { id } = req.params;
    const { state } = req.body;
    await User.findByIdAndUpdate({_id: id}, { state });
    res.json({message: 'Estado modificado', css: 'success', redirect: 'remove'});
})

router.get('/newpass', async (req, res) => {
    res.render('users/newpass');
})

router.post('/newpass/:id', async (req, res) => {
    const { id } = req.params;
    const { passwordActual, nuevaPass, repNuevaPass} = req.body;
    if(nuevaPass === repNuevaPass){
        const user = await User.findById(id);
        const pass = await user.comparePassword(passwordActual, user.password)
        if(pass) {
            const password = await user.encryptPassword(nuevaPass);
            await user.updateOne({password: password})
            res.json({message: 'Password cambiada', css: 'success', redirect: '/profile'})
        } else {
            res.json({message: 'La password ingresada no es correcta', css: 'danger', redirect: 'remove'})
        }
    } else{
        res.json({message: 'Las password no coinciden',css: 'danger', redirect: 'remove'})
    }
})

module.exports = router;