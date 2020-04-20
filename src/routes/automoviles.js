const express = require('express');
const router = express.Router();
const Automovil = require('../model/automovil');

router.get('/', (req, res) => {
    res.render('automoviles/automoviles');
});

router.post('/insertar', async (req, res) => {
    console.log(req.body);
    res.json({message: 'Llego bien', css: 'success', redirect: 'remove'});
})

module.exports = router;