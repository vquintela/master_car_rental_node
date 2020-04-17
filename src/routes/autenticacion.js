const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../model/user');
const mailer = require('../lib/mailer');

router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.get('/verifica', async (req, res) => {
    const {email, id } = req.query;
    const emailUser = await User.findOne({email: email});
    if(!emailUser) {
        res.render('auth/verificacion', {valor: false, mensaje: 'Email no registrado'});
    } else {
        if(emailUser.numAut === id) {
            newNum = emailUser.genPass();
            await emailUser.updateOne({state: true, numAut: newNum});
            res.render('auth/verificacion', {valor: true, mensaje: `${emailUser.nombre}, ${emailUser.apellido}`});
        } else {
            res.render('auth/verificacion', {valor: false, mensaje: 'Autenticación no valida'});;
        }
    }
})

router.post('/signin', (req, res, next) => {
    passport.authenticate('local-signin', (err, user, info) => { 
        let mens = req.flash();
        if (err) { 
            return next(err); 
        }
        if (!user) { 
            return res.json({ estado: false, message: mens.message }); 
        }
        req.logIn(user, (err) => {
            if (err) { 
              return next(err); 
            }
            return res.json({ estado: true, message: mens.message });
        });
    })(req, res, next);
});

router.post('/signup', async (req, res) => {
    const {nombre, apellido, email, password, verificarPassword} = req.body;
    if(password !== verificarPassword) {
        return res.json({ estado: false, message: 'Las contraseñas no coinciden'});
    }
    const emailUser = await User.findOne({email: email});
    if(emailUser) {
        return res.json({ estado: false, message: 'Email en uso, ingrese otro'});
    } else {
        const newUser = new User({nombre, apellido, email, password});
        newUser.password = await newUser.encryptPassword(password);
        newUser.numAut = await newUser.genPass();
        await newUser.save();
        mailer.signup(newUser.email ,newUser.nombre, newUser.apellido, newUser.numAut);
        return res.json({estado: true, message: 'Usuario Registrado, verifique su email para terminar'});
    }
});

router.post('/renew', async (req, res) => {
    const { email } = req.body;
    const user = await User.findOne({email: email});
    if(user) {
        const pass = user.genPass();
        mailer.renew(user.email, user.nombre, user.apellido, pass);
        const password = await user.encryptPassword(pass);
        await user.updateOne({ password: password });
        res.json({estado: true, message: 'Se le a enviado a su email la nueva password'});
    } else {
        res.json({estado: false, message: 'Usuario no Registrado, registrese por favor'});
    }
})

router.get('/profile', (req,res) => {
    res.render('profile');
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
})

module.exports = router;