const express = require('express');
const morgan = require('morgan');
const path = require('path');
const session = require('express-session');
const exphbs = require('express-handlebars');
const passport = require('passport');
const flash = require('connect-flash');

//Inicialar Servidor
const app = express();
require('./lib/database');
require('./lib/passport');

//Settings
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('.hbs', exphbs({
    defaultLayout: 'main',
    layoutsDir: path.join(app.get('views'), 'layouts'),
    partialsDir: path.join(app.get('views'), 'partials'),
    extname: '.hbs',
    helpers: require('./lib/handlebars')
}));
app.set('view engine', '.hbs');

//midlewares
app.use(session({
    secret: 'master_car_rental',
    resave: false,
    saveUninitialized: false,
}));
app.use(flash());
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(passport.initialize());
app.use(passport.session());

//variables globales
app.use((req, res, next) => {
    app.locals.user = req.user;
    app.locals.message = req.flash('message');
    next();
});

//routes
app.use(require('./routes/autenticacion'));
app.use('/users', require('./routes/users'));
app.use('/automoviles', require('./routes/automoviles'));

//archivos publicos
app.use(express.static(path.join(__dirname, 'public')));

//Iniciar Servidor
app.listen(app.get('port'), () => {
    console.log('Servidor en puerto', app.get('port'))
});