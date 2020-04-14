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
        failureFlash: false
    })(req, res, next);
});

router.post('/signup',
    passport.authenticate('local-signup'),
    (req, res) => {
        if (req.user) {
            res.json({ estado: true, message: 'Usuario registrado correctamente' })
        } else {
            res.json({ estado: false, message: 'Usuario no registrado' })
        }
    });

router.get('/profile', (req,res) => {
    console.log(req.user)
    res.render('profile');
})

router.get('/logout', (req, res) => {
    req.logOut();
    res.redirect('/signin');
})

module.exports = router;