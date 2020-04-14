const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const User = require('../model/user');

passport.use('local-signup', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ 'email': email })
    if (user) {
        return done(null, false, req.flash('message', 'Usuario ya registrado'));
    } else if (req.body.password !== req.body.verificarPassword) {
        return done(null, false, req.flash('message', 'Las password no coinciden'));
    } else {
        const { nombre, apellido } = req.body;
        const newUser = new User();
        newUser.nombre = nombre;
        newUser.apellido = apellido;
        newUser.email = email;
        newUser.password = await newUser.encryptPassword(password);
        await newUser.save();
        done(null, newUser);
    }
}));

passport.use('local-signin', new LocalStrategy({
    usernameField: 'email',
    passwordField: 'password',
    passReqToCallback: true
}, async (req, email, password, done) => {
    const user = await User.findOne({ email: email });
    if (!user) {
        return done(null, false);
    } else {
        const match = await user.comparePassword(password, user.password)
        if (!match) {
            return done(null, false);
        }
        return done(null, user);
    }
}));

passport.serializeUser((user, done) => {
    done(null, user.id);
});

passport.deserializeUser(async (id, done) => {
    const user = await User.findById(id);
    done(null, user.toJSON());
});