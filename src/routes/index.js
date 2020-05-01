const express = require('express');
const router = express.Router();
const mailer = require('../lib/mailer');

router.get('/', (req, res) => {
    res.render('index')
})

router.post('/contacto', async (req, res) => {
    const mail = req.body;
    const resp =  await mailer.contacto(mail);
    res.json({titulo: 'Contacto Enviado', mensaje: 'Mensaje enviado de forma correcta, gracias por contactarse!'})
})

module.exports = router