const express = require('express');
const router = express.Router();
const passport = require('passport');
const User = require('../model/user');

router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

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
    // passport.authenticate('local-signin', {
    //     successRedirect: '/profile',
    //     failureRedirect: '/signin',
    //     failureFlash: true
    // })(req, res, next);
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
        await newUser.save();
        return res.json({estado: true, message: 'Usuario Registrado'})
    }
});
// router.post('/signup', (req, res, next) => {
//     passport.authenticate('local-signup', (err, user, info) => { 
//         let mens = req.flash();
//         if (err) { 
//             return next(err); 
//         }
//         if (!user) { 
//             return res.json({ estado: false, message: mens.message }); 
//         }
//         req.logIn(user, (err) => {
//             if (err) { 
//               return next(err); 
//             }
//             return res.json({ estado: true, message: 'Usuario registrado correctamente' });
//         });
//     })(req, res, next);
// });

router.get('/profile', (req,res) => {
    res.render('profile');
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
})

module.exports = router;