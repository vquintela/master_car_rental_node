const express = require('express');
const router = express.Router();
const passport = require('passport');

router.get('/signin', (req, res) => {
    res.render('auth/signin');
});

router.get('/signup', (req, res) => {
    res.render('auth/signup');
});

router.post('/signin', (req, res, next) => {
    passport.authenticate('local-signin', {
        successRedirect: '/profile',
        failureRedirect: '/signin',
        failureFlash: true
    })(req, res, next);
});

router.post('/signup', (req, res, next) => {
    passport.authenticate('local-signup', (err, user, info) => { 
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
            return res.json({ estado: true, message: 'Usuario registrado correctamente' });
        });
    })(req, res, next);
});

router.get('/profile', (req,res) => {
    res.render('profile');
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
})

module.exports = router;