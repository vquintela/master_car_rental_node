const express = require('express');
const router = express.Router();
const Automovil = require('../model/automovil');
const path = require('path');
const fs = require('fs-extra');

router.get('/', (req, res) => {
    res.render('automoviles/automoviles');
});

router.post('/insertar', async (req, res) => {
    const { patente, pasajeros, puertas, precio, marca, transmicion, descripcion, modelo } = req.body;
    const automovil = new Automovil({ patente, pasajeros, puertas, precio, marca, transmicion, descripcion, modelo });
    const resp = await automovil.save();
    if(req.file) {
        const imagePath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();
        const targetPath = path.resolve(`src/public/img/${resp._id}${ext}`);

        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
            await fs.rename(imagePath, targetPath);
            nombArch = resp._id + ext;
            await automovil.updateOne({imagen: nombArch});
            res.json({message: 'Automovil ingresado de forma correcta', css: 'success', redirect: '/automoviles'});
        } else {
            await fs.unlink(imagePath);
            res.json({message: 'Automovil guardado, imagen no soportada', css: 'danger', redirect: 'remove'});
        }
    }
})

module.exports = router;