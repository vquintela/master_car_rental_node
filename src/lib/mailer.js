const nodemailer = require('nodemailer');

const direccion = 'mastercarrentalMCR@gmail.com';
const pass = 'M4st3rc4r';

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 587,
    secure: false, 
    auth: {
        user: direccion,
        pass: pass
    }
})

const mailer = {}

mailer.signup = async (email, nombre, apellido, numberId) => {
    const link = `http://localhost:3000/verifica?email=${email}&id=${numberId}`;
    
    const ret = await transporter.sendMail({
        from: direccion,
        to: email,
        subject: 'MCR Validacion de Email',
        html: `
                <h3><b>Bienvenido a Master Car Rental</b></h3><br><br>
                <h3><b>¡Gracias por elegirnos:</b>${nombre} ${apellido}</h3><br><br>
                <p>Para terminar con el proceso de registro ingrese al siguiente vinculo</p><br><br><br>
                <br><a href="${link}">Haga click AQUI para verificar</a>"
            `
    });
}

mailer.renew = async (email, nombre, apellido, password) => {
    const ret = await transporter.sendMail({
        from: direccion,
        to: email,
        subject: 'Blanqueo de password',
        html: `
                <h3><b>Blanqueo de password</b></h3><br><br>
                <h3><b>Se cambio el password para:</b>${nombre} ${apellido}</h3><br><br>
                <p>¡Recuerde modificar dicha password!</p><br><br><br>
                <p>Su nueva password es: ${password}</p>
            `
    });
}

module.exports = mailer;