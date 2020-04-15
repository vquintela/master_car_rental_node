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
        return res.json({ estado: false, message: 'Usuario no registrado'});
    } else {
        if(emailUser.numAut === id) {
            newNum = emailUser.genNum();
            await emailUser.updateOne({state: true, numAut: newNum});
        } else {
            return res.json({ estado: false, message: 'Codigo Invalido'});
        }
    }
    res.send('Hola marolas' + email + id);
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
        newUser.numAut = newUser.genNum();
        await newUser.save();
        mailer(newUser.email ,newUser.nombre, newUser.apellido, newUser.numAut);
        return res.json({estado: true, message: 'Usuario Registrado, verifique su email para terminar'});
    }
});

router.get('/profile', (req,res) => {
    res.render('profile');
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
})

module.exports = router;