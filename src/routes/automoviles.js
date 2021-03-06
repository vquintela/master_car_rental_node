const express = require('express');
const router = express.Router();
const Automovil = require('../model/automovil');
const path = require('path');
const fs = require('fs-extra');
const errorMessage = require('../lib/errorMessageValidation');

router.get('/', (req, res) => {
    res.render('automoviles/automoviles');
});

router.post('/insertar', async (req, res) => {
    const { patente, pasajeros, puertas, precio, marca, transmicion, descripcion, modelo } = req.body;
    const automovil = new Automovil({ patente, pasajeros, puertas, precio, marca, transmicion, descripcion, modelo });
    let resp = null;
    try {
        resp = await automovil.save();
    } catch (error) {
        const mensaje = errorMessage.crearMensaje(error);
        res.json({message: mensaje, redirect: 'error'})
        return;
    }
    if(req.file) {
        const imagePath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();
        const targetPath = path.resolve(`src/public/img/${resp._id}${ext}`);

        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
            await fs.rename(imagePath, targetPath);
            const nombArch = resp._id + ext;
            await automovil.updateOne({imagen: nombArch});
            res.json({message: 'Automovil ingresado de forma correcta', css: 'success', redirect: '/automoviles'});
        } else {
            await fs.unlink(imagePath);
            res.json({message: 'Automovil guardado, imagen no soportada', css: 'danger', redirect: 'remove'});
        }
    } else {
        res.json({message: 'Automovil ingresado sin imagen', css: 'success', redirect: '/automoviles'});
    }
})

router.get('/obtener', async (req, res) => {
    const automoviles = await Automovil.find();
    res.json(automoviles);
})

router.get('/editar/:id', async (req, res) => {
    const { id } = req.params;
    const automovil = await Automovil.findById(id);
    res.json(automovil);
})

router.post('/editar/:id', async (req, res) => {
    const { patente, pasajeros, puertas, precio, marca, transmicion, descripcion, modelo, imagen } = req.body;
    if(req.file){
        await fs.unlink(path.resolve('./src/public/img/' + imagen));
        const imagePath = req.file.path;
        const ext = path.extname(req.file.originalname).toLowerCase();
        const targetPath = path.resolve(`src/public/img/${req.params.id}${ext}`);
        if (ext === '.png' || ext === '.jpg' || ext === '.jpeg' || ext === '.gif') {
            await fs.rename(imagePath, targetPath);
            const imagen = req.params.id + ext;
            try {
                await Automovil.findByIdAndUpdate({_id: req.params.id}, { patente, pasajeros, puertas, precio, marca, transmicion, descripcion, modelo, imagen }, { runValidators: true });
                res.json({message: 'Automovil actualizado de forma correcta', css: 'success', redirect: 'remove'});
            } catch (error) {
                const mensaje = errorMessage.crearMensaje(error);
                res.json({message: mensaje, redirect: 'error'})
                return;
            }
        } else {
            await fs.unlink(imagePath);
            try {
                await Automovil.findByIdAndUpdate({_id: req.params.id}, { patente, pasajeros, puertas, precio, marca, transmicion, descripcion, modelo}, { runValidators: true });
                res.json({message: 'Automovil actualizado, imagen no soportada', css: 'danger', redirect: 'remove'});
            } catch (error) {
                const mensaje = errorMessage.crearMensaje(error);
                res.json({message: mensaje, redirect: 'error'})
                return
            }
        }
    } else {
        try {
            await Automovil.findByIdAndUpdate({_id: req.params.id}, { patente, pasajeros, puertas, precio, marca, transmicion, descripcion, modelo }, { runValidators: true });
            res.json({message: 'Automovil actualizado de forma correcta', css: 'success', redirect: 'remove'});
        } catch (error) {
            const mensaje = errorMessage.crearMensaje(error);
            res.json({message: mensaje, redirect: 'error'})
            return
        }
    }  
})

router.post('/delete/:id', async (req, res) => {
    const { id } = req.params;
    const { imagen } = req.body;
    if(imagen !== 'sinimagen.png') {
        await fs.unlink(path.resolve('./src/public/img/' + imagen));
    }
    await Automovil.findByIdAndDelete(id);
    res.json({message: 'Vehiculo eliminado de forma correcta', css: 'success', redirect: 'remove'});
})

router.put('/estado/:id', async (req, res) => {
    const { id } = req.params;
    const { tecnico } = req.body;
    await Automovil.findByIdAndUpdate({_id: id}, { tecnico });
    res.json({message: 'Estado modificado', css: 'success', redirect: 'remove'});
})

module.exports = router;